"""记忆胶囊/治愈时刻 路由 v1.0

接口：
  GET    /memory-capsules          获取用户所有记忆胶囊
  GET    /memory-capsules/{id}     获取单个记忆胶囊
  POST   /memory-capsules          创建新记忆胶囊
  PUT    /memory-capsules/{id}     更新记忆胶囊
  DELETE /memory-capsules/{id}     删除记忆胶囊
  DELETE /memory-capsules          批量删除（可选）
"""
import logging
from typing import List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from models.database import get_db
from models.user import User
from models.user_settings import MemoryCapsule
from utils.auth import get_current_user
from utils.response import success_response, error_response

logger = logging.getLogger(__name__)
router = APIRouter()


class CapsuleCreateRequest(BaseModel):
    title: str
    content: str
    mood: str = "happy"
    tags: Optional[str] = ""
    is_public: bool = False


class CapsuleUpdateRequest(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    mood: Optional[str] = None
    tags: Optional[str] = None
    is_public: Optional[bool] = None


class CapsuleResponse(BaseModel):
    id: int
    title: str
    content: str
    mood: str
    tags: str
    is_public: bool
    created_at: str
    updated_at: str


@router.get("/memory-capsules", summary="获取用户所有记忆胶囊")
async def get_capsules(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取当前用户的所有记忆胶囊"""
    capsules = (
        db.query(MemoryCapsule)
        .filter(MemoryCapsule.user_id == current_user.id)
        .order_by(MemoryCapsule.created_at.desc())
        .all()
    )
    
    data = [
        {
            "id": c.id,
            "title": c.title,
            "content": c.content,
            "mood": c.mood,
            "tags": c.tags,
            "is_public": c.is_public,
            "created_at": c.created_at.isoformat() if c.created_at else "",
            "updated_at": c.updated_at.isoformat() if c.updated_at else "",
        }
        for c in capsules
    ]
    
    return success_response(data={"capsules": data, "total": len(data)})


@router.get("/memory-capsules/{capsule_id}", summary="获取单个记忆胶囊")
async def get_capsule(
    capsule_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取指定记忆胶囊的详情"""
    capsule = (
        db.query(MemoryCapsule)
        .filter(
            MemoryCapsule.id == capsule_id,
            MemoryCapsule.user_id == current_user.id
        )
        .first()
    )
    
    if not capsule:
        return error_response(code=404, msg="记忆胶囊不存在")
    
    return success_response(data={
        "id": capsule.id,
        "title": capsule.title,
        "content": capsule.content,
        "mood": capsule.mood,
        "tags": capsule.tags,
        "is_public": capsule.is_public,
        "created_at": capsule.created_at.isoformat() if capsule.created_at else "",
        "updated_at": capsule.updated_at.isoformat() if capsule.updated_at else "",
    })


@router.post("/memory-capsules", summary="创建新记忆胶囊")
async def create_capsule(
    req: CapsuleCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """创建新的记忆胶囊"""
    if not req.title or not req.title.strip():
        return error_response(code=400, msg="标题不能为空")
    if not req.content or not req.content.strip():
        return error_response(code=400, msg="内容不能为空")
    
    capsule = MemoryCapsule(
        user_id=current_user.id,
        title=req.title[:100],
        content=req.content,
        mood=req.mood[:20] if req.mood else "happy",
        tags=req.tags[:200] if req.tags else "",
        is_public=req.is_public,
    )
    
    db.add(capsule)
    db.commit()
    db.refresh(capsule)
    
    logger.info("[memory-capsule] 创建记忆胶囊 | user_id=%d capsule_id=%d", 
                current_user.id, capsule.id)
    
    return success_response(data={
        "id": capsule.id,
        "title": capsule.title,
        "content": capsule.content,
        "mood": capsule.mood,
        "tags": capsule.tags,
        "is_public": capsule.is_public,
        "created_at": capsule.created_at.isoformat() if capsule.created_at else "",
    })


@router.put("/memory-capsules/{capsule_id}", summary="更新记忆胶囊")
async def update_capsule(
    capsule_id: int,
    req: CapsuleUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """更新记忆胶囊内容"""
    capsule = (
        db.query(MemoryCapsule)
        .filter(
            MemoryCapsule.id == capsule_id,
            MemoryCapsule.user_id == current_user.id
        )
        .first()
    )
    
    if not capsule:
        return error_response(code=404, msg="记忆胶囊不存在")
    
    if req.title is not None:
        capsule.title = req.title[:100]
    if req.content is not None:
        capsule.content = req.content
    if req.mood is not None:
        capsule.mood = req.mood[:20]
    if req.tags is not None:
        capsule.tags = req.tags[:200]
    if req.is_public is not None:
        capsule.is_public = req.is_public
    
    db.commit()
    db.refresh(capsule)
    
    logger.info("[memory-capsule] 更新记忆胶囊 | user_id=%d capsule_id=%d", 
                current_user.id, capsule.id)
    
    return success_response(data={
        "id": capsule.id,
        "title": capsule.title,
        "content": capsule.content,
        "mood": capsule.mood,
        "tags": capsule.tags,
        "is_public": capsule.is_public,
        "updated_at": capsule.updated_at.isoformat() if capsule.updated_at else "",
    })


@router.delete("/memory-capsules/{capsule_id}", summary="删除记忆胶囊")
async def delete_capsule(
    capsule_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """删除指定的记忆胶囊"""
    capsule = (
        db.query(MemoryCapsule)
        .filter(
            MemoryCapsule.id == capsule_id,
            MemoryCapsule.user_id == current_user.id
        )
        .first()
    )
    
    if not capsule:
        return error_response(code=404, msg="记忆胶囊不存在")
    
    db.delete(capsule)
    db.commit()
    
    logger.info("[memory-capsule] 删除记忆胶囊 | user_id=%d capsule_id=%d", 
                current_user.id, capsule_id)
    
    return success_response(data={"deleted": True, "id": capsule_id})