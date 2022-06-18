from typing import List
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException

from backend.hotelreview import models, schemas, services
from backend.settings.database import SessionLocal, engine


models.Base.metadata.create_all(bind = engine)
app = FastAPI()


# Dependency
def get_database():
    database = SessionLocal()
    try:
        yield database
    finally:
        database.close()


# API routes
@app.get("/hotels/", response_model = List[schemas.Hotel])
def read_hotels(skip: int = 0, limit: int = 10, db: Session = Depends(get_database)):
    hotels = services.get_hotels(db, skip = skip, limit = limit)
    return hotels


@app.get("/hotels/{hotel_id}", response_model = schemas.Hotel)
def read_hotel(hotel_id: int, db: Session = Depends(get_database)):
    hotel = services.get_hotel(db, hotel_id = hotel_id)
    if hotel is None:
        raise HTTPException(status_code = 404, detail = "Hotel not found")
    return hotel
    

@app.post("/hotels/", response_model = schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_database)):
    return services.create_hotel(db, hotel = hotel)


@app.post("/hotels/{hotel_id}", response_model = schemas.Review)
def create_review_for_hotel(hotel_id: int, review: schemas.ReviewCreate, db: Session = Depends(get_database)):
    return services.create_hotel_review(db, review = review, hotel_id = hotel_id)