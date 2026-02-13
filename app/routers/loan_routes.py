from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..auth import get_current_user, require_admin
from ..services.loan_service import apply_for_loan, approve_loan, disburse_loan, make_repayment, mark_default

router = APIRouter(prefix="/loans")


@router.post("/apply", response_model=schemas.LoanOut)
def apply_loan(payload: schemas.LoanCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    loan = apply_for_loan(db, current_user, payload.amount, payload.duration_months, payload.purpose or "")
    return loan


@router.get("/my", response_model=list[schemas.LoanOut])
def my_loans(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    loans = db.query(models.Loan).filter(models.Loan.user_id == current_user.id).all()
    return loans


@router.patch("/{loan_id}/approve")
def approve(loan_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    loan = db.query(models.Loan).filter(models.Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    loan = approve_loan(db, loan)
    return {"ok": True, "loan_id": loan.id, "status": loan.status}


@router.post("/{loan_id}/disburse")
def disburse(loan_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    loan = db.query(models.Loan).filter(models.Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    if loan.status != "approved":
        raise HTTPException(status_code=400, detail="Loan must be approved before disbursement")
    loan = disburse_loan(db, loan)
    return {"ok": True, "loan_id": loan.id, "status": loan.status}


@router.post("/{loan_id}/repay")
def repay(loan_id: int, payload: schemas.RepaymentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    loan = db.query(models.Loan).filter(models.Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    if loan.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your loan")
    if loan.status not in ("active", "approved"):
        raise HTTPException(status_code=400, detail="Loan not active")
    repayment = make_repayment(db, loan, payload.amount)
    return {"ok": True, "repayment_id": repayment.id}


@router.patch("/{loan_id}/default")
def default_loan(loan_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    loan = db.query(models.Loan).filter(models.Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    loan = mark_default(db, loan)
    return {"ok": True, "loan_id": loan.id, "status": loan.status}
