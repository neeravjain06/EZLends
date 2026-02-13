from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from .database import engine, Base, get_db
from .routers import auth_routes, loan_routes, user_routes
from .auth import get_current_user
from . import models

app = FastAPI(title="Progressive Trust Economy (MVP)")


@app.on_event("startup")
def on_startup():
    # create DB tables
    Base.metadata.create_all(bind=engine)


# Include routers
app.include_router(auth_routes.router)
app.include_router(loan_routes.router)
app.include_router(user_routes.router)


# Override the placeholder dependency in auth_routes.me
@app.get("/me")
def me(current_user: models.User = Depends(get_current_user)):
    return current_user
