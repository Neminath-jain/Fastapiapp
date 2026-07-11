from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.asyncio import AsyncSession,create_async_engine,async_sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv
import os


load_dotenv()

# Use a plain default string as the second arg to getenv
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:admin123@localhost:5432/student_db").strip()
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Supabase requires SSL but the asyncpg driver doesn't support the "?sslmode" URL text.
# We split the URL to remove the query parameters, and pass ssl="require" instead.
if "supabase.com" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]
    engine = create_async_engine(
        DATABASE_URL,
        echo=False,
        connect_args={
            "ssl": "require",
            "prepared_statement_cache_size": 0,
            "statement_cache_size": 0
        }
    )
else:
    engine = create_async_engine(
        DATABASE_URL,
        echo=False,
        connect_args={
            "prepared_statement_cache_size": 0,
            "statement_cache_size": 0
        }
    )
SessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
Base = declarative_base()

async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()