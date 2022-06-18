# Hotel Review Application

## How to set up the backend

### Install the necessary dependencies

1. Navigate into project root directory (i.e. hotel-review-app)

2. Navigate into backend directory
```sh
cd backend
```

3. Create a new conda environment
```sh
conda create -n hotel-review python=3.8
```

4. Activate the newly created conda environment
```sh
conda activate hotel-review
```

5. Install the required libraries
```sh
pip install -r requirements.txt
```

### Database Migration

1. Navigate into project root directory (i.e. hotel-review-app)

2. Navigate into hotelreview directory in backend directory
```sh
cd backend/hotelreview
```

3. Migrate database
```sh
alembic revision --autogenerate -m "create hotels and reviews tables"
```

### Run the backend

1. Navigate into project root directory (i.e. hotel-review-app)

2. Start up the backend server
```sh
uvicorn backend.hotelreview.apis:app --reload
```