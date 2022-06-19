from fastapi import FastAPI

from backend.hotelreview import apis


app = FastAPI()
app.include_router(apis.router)