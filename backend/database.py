from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.asyncio import AsyncSession,create_async_engine,async_sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv
import os


load_dotenv()

# Use a plain default string as the second arg to getenv
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:admin123@localhost:5432/student_db")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Ensure the asyncpg driver is used for SQLAlchemy async engines
if DATABASE_URL.startswith("postgresql://") and "asyncpg" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

if "supabase.co" in DATABASE_URL:
    DATABASE_URL=DATABASE_URL.split("?")[0]
    engine=create_async_engine(DATABASE_URL, echo=False,connect_args={"ssl": {"sslmode": "require"}})
else:
    engine=create_async_engine(DATABASE_URL, echo=False)
SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine,class_=AsyncSession)
Base = declarative_base()

async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()