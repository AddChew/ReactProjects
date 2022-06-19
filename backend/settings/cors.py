from fastapi.middleware.cors import CORSMiddleware

from backend.hotelreview.apis import app


CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = CORS_ORIGIN_WHITELIST,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)