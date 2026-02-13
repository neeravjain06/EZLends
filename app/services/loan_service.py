from sqlalchemy.orm import Session
from datetime import datetime

from .. import models
from .reward_service import reward_on_repayment, reward_on_loan_completion
from .trust_service import adjust_trust_after_repayment, adjust_trust_after_loan_completion


def apply_for_loan(db: Session, user: models.User, amount: float, duration_months: int, purpose: str):
    loan = models.Loan(
        user_id=user.id,
        amount=amount,
        duration_months=duration_months,
        purpose=purpose,
        status="requested",
        remaining_balance=amount,
    )
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan


def approve_loan(db: Session, loan: models.Loan):
    loan.status = "approved"
    loan.approved_at = datetime.utcnow()
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan


def disburse_loan(db: Session, loan: models.Loan):
    loan.status = "active"
    loan.disbursed_at = datetime.utcnow()
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan


def make_repayment(db: Session, loan: models.Loan, amount: float):
    # record repayment
    repayment = models.Repayment(loan_id=loan.id, amount=amount)
    db.add(repayment)

    loan.total_repaid = (loan.total_repaid or 0) + amount
    loan.remaining_balance = (loan.remaining_balance or 0) - amount

    # if fully repaid or overpaid
    if loan.remaining_balance <= 0:
        loan.status = "repaid"

    db.add(loan)
    db.commit()
    db.refresh(loan)
    db.refresh(repayment)

    user = db.query(models.User).filter(models.User.id == loan.user_id).first()

    # rewards and trust
    reward_on_repayment(db, user, loan, amount)
    adjust_trust_after_repayment(db, user, amount)

    if loan.status == "repaid":
        # finalize
        reward_on_loan_completion(db, user, loan)
        adjust_trust_after_loan_completion(db, user, loan)

    return repayment


def mark_default(db: Session, loan: models.Loan):
    loan.status = "defaulted"
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan
