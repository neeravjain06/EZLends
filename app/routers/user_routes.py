from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..auth import get_current_user

router = APIRouter()


@router.get("/rewards/my", response_model=list[schemas.RewardOut])
def my_rewards(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    rewards = db.query(models.Reward).filter(models.Reward.user_id == current_user.id).all()
    return rewards


@router.get("/trust/me", response_model=schemas.TrustOut)
def my_trust(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return schemas.TrustOut(trust_score=current_user.trust_score or 0, loans_repaid=current_user.loans_repaid or 0, user_level=current_user.user_level)


@router.get("/dashboard", response_model=schemas.DashboardOut)
def dashboard(db: Session = Depends(get_db)):
    from sqlalchemy.sql import func

    total_users = db.query(models.User).count()
    total_loans = db.query(models.Loan).count()
    active_loans = db.query(models.Loan).filter(models.Loan.status == "active").count()
    total_repayments = db.query(func.coalesce(func.sum(models.Repayment.amount), 0.0)).scalar() or 0.0
    return schemas.DashboardOut(total_users=total_users, total_loans=total_loans, active_loans=active_loans, total_repayments=total_repayments)
