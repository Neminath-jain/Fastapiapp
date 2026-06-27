from fastapi import APIRouter,HTTPException,Depends,status
from models import job
from schemas.job import JobCreate,JobUpdate,JobResponse
from models.job import Job
from sqlalchemy.orm import Session
from database import get_db

router=APIRouter(prefix="/job",tags=["job"])
jobs=[]

@router.post("/",status_code=status.HTTP_201_CREATED)
def create_job(job:JobCreate):
    jobs.append(job)
    return job


@router.get("/",status_code=status.HTTP_200_OK)
def gel_all_job():
    return jobs

# @router.get("/")
# def read_job():
#     return {"job:" "Job root"}


@router.get("/{job_id}")
def get_job(job_id:int):
    return jobs[job_id]



@router.put("/{job_id}")
def update_job(job_id:int,job:JobUpdate):
    jobs[job_id]=job
    return jobs

@router.delete("/{job_id}")
def delete_job(job_id:int):
    jobs.pop(job_id)
    return jobs

