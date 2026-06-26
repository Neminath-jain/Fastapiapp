from pydantic import BaseModel
from typing import Optional

class JobCreate(BaseModel):
    title:str
    salary:int

class JobUpdate(BaseModel):
    title:Optional[str] = None
    salary: Optional[str] = None

class JobDelete(BaseModel):
    job_id:Optional[int]=None
    

                  




