from fastapi import APIRouter
from schemas.chat import ChatRequest, ChatResponse
from services.langchain_service import chat_with_memory

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    session_id, reply = chat_with_memory(request.message, request.session_id)
    return ChatResponse(session_id=session_id, reply=reply)