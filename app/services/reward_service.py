from sqlalchemy.orm import Session

from .. import models


def create_reward(db: Session, user: models.User, loan: models.Loan | None, points: int, reason: str):
    reward = models.Reward(user_id=user.id, loan_id=(loan.id if loan else None), reward_points=points, reason=reason)
    db.add(reward)
    db.commit()
    db.refresh(reward)
    return reward


def reward_on_repayment(db: Session, user: models.User, loan: models.Loan, amount: float):
    # Simple reward: 1 point per 10 units repaid
    points = int(amount // 10)
    if points > 0:
        return create_reward(db, user, loan, points, "repayment")
    return None


def reward_on_loan_completion(db: Session, user: models.User, loan: models.Loan):
    # Fixed bonus for full repayment
    points = 100
    return create_reward(db, user, loan, points, "loan_completed")
