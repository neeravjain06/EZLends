from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional, List


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    trust_score: int
    loans_repaid: int
    user_level: str
    created_at: datetime

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class LoanCreate(BaseModel):
    amount: float
    duration_months: int
    purpose: Optional[str] = None


class LoanOut(BaseModel):
    id: int
    user_id: int
    amount: float
    duration_months: int
    purpose: Optional[str]
    status: str
    total_repaid: float
    remaining_balance: float
    created_at: datetime
    approved_at: Optional[datetime]
    disbursed_at: Optional[datetime]

    class Config:
        orm_mode = True


class RepaymentCreate(BaseModel):
    amount: float


class RewardOut(BaseModel):
    id: int
    user_id: int
    loan_id: Optional[int]
    reward_points: int
    reason: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True


class TrustOut(BaseModel):
    trust_score: int
    loans_repaid: int
    user_level: str


class DashboardOut(BaseModel):
    total_users: int
    total_loans: int
    active_loans: int
    total_repayments: float
