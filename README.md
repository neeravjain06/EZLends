# Progressive Trust Economy - Hackathon MVP

Simple FastAPI backend simulating a micro-lending lifecycle.

Run:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Admin endpoints require header `X-Admin-Token: admin-secret-token` (MVP simplicity).

Example requests (using `httpie` style):

- Signup
  `http POST :8000/signup name="Alice" email=alice@example.com password=secret`
- Login
  `http :8000/login username=alice@example.com password=secret` -> returns access token
- Apply loan
  `http POST :8000/loans/apply Authorization:"Bearer <token>" amount=100 duration_months=6 purpose="small business"`
- Admin approve
  `http PATCH :8000/loans/1/approve X-Admin-Token:admin-secret-token`
- Admin disburse
  `http POST :8000/loans/1/disburse X-Admin-Token:admin-secret-token`
- Repay
  `http POST :8000/loans/1/repay Authorization:"Bearer <token>" amount=50`
- View rewards
  `http GET :8000/rewards/my Authorization:"Bearer <token>"`
- View trust
  `http GET :8000/trust/me Authorization:"Bearer <token>"`

Notes:
- All money flows are simulated and recorded in SQLite (`progressive_trust.db`).
- Simple reward and trust logic implemented in `app/services`.
