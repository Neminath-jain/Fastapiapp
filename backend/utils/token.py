from jose import jwt
from datetime import datetime, timedelta

from tomlkit import key
from schemas.token import Token

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire}) 
    encoded_jwt = jwt.encode(to_encode,key= "your_secret_key", algorithm="HS256")
    return encoded_jwt