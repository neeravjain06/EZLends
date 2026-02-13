from sqlalchemy.orm import Session

from .. import models


def adjust_trust_after_repayment(db: Session, user: models.User, amount: float):
    # Simple trust increment: 1 point per unit repaid rounded down
    points = int(amount)
    user.trust_score = (user.trust_score or 0) + points
    db.add(user)
    db.commit()
    db.refresh(user)
    _maybe_upgrade_user(db, user)


def adjust_trust_after_loan_completion(db: Session, user: models.User, loan: models.Loan):
    # Bonus points for completing loan
    bonus = 50
    user.trust_score = (user.trust_score or 0) + bonus
    user.loans_repaid = (user.loans_repaid or 0) + 1
    db.add(user)
    db.commit()
    db.refresh(user)
    _maybe_upgrade_user(db, user)


def _maybe_upgrade_user(db: Session, user: models.User):
    # Graduation rules
    if user.trust_score >= 300 and user.loans_repaid >= 10:
        user.user_level = "owner"
    elif user.trust_score >= 100 and user.loans_repaid >= 3:
        user.user_level = "trusted"
    else:
        user.user_level = user.user_level or "borrower"
    db.add(user)
    db.commit()
    db.refresh(user)
