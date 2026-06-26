from fastapi import APIRouter
from schemas.company import CompanyCreate,CompanyUpdate,CompanyDelete


router=APIRouter(prefix="/company",tags=["company"])
companies=[]


@router.post("/")
def create_company(company:CompanyCreate):
    companies.append(company)
    return company

@router.get("/")
def gel_all_company():
    return companies


@router.get("/{company_id}")
def get_company(company_id:int):
    return companies[company_id]

@router.put("/{company_id}")
def update_company(company_id:int,company:CompanyUpdate):
    companies[company_id]=company
    return companies

@router.delete("/{company_id}")
def delete_company(company_id:int,company:CompanyDelete):
    companies[company_id]=company
    return companies


# @router.get("/")
# def read_company():
#     return {"company:" "Company root"}


# @router.get("/{company_id}")
# def read_company(company_id:int):
#     return {"company_id": company_id}
