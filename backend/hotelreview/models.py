from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey, Integer, SmallInteger, String

from backend.settings.database import Base


class Hotel(Base):
    __tablename__ = 'hotels'

    id = Column(Integer, primary_key = True, index = True)
    title = Column(String(50), index = True, nullable = False)
    thumbnail = Column(String(100), nullable = True)
    rating = Column(SmallInteger, index = True, nullable = False)

    reviews = relationship("Review", back_populates = "hotel")


class Review(Base):
    __tablename__ = 'reviews'

    id = Column(Integer, primary_key = True, index = True)
    title = Column(String(50), index = True, nullable = False)
    description = Column(String(250), index = True, nullable = False)
    rating = Column(SmallInteger, index = True, nullable = False)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))

    hotel = relationship("Hotel", back_populates = "reviews")