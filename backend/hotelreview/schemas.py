from typing import List, Union
from pydantic import BaseModel


class ReviewBase(BaseModel):
    title: str
    description: str


class ReviewCreate(ReviewBase):
    pass


class Review(ReviewBase):
    id: int
    hotel_id: int

    class Config:
        orm_mode = True


class HotelBase(BaseModel):
    title: str
    thumbnail: Union[str, None] = None


class HotelCreate(HotelBase):
    pass


class Hotel(HotelBase):
    id: int
    reviews: List[Review] = []

    class Config:
        orm_mode = True