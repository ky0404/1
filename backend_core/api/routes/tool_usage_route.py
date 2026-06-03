"""心理工具使用记录 路由 v1.0

接口：
  GET  /tool-usage          获取用户工具使用记录
  POST /tool-usage          记录工具使用
  GET  /tool-usage/stats    获取统计数据
"""
import logging
from typing import Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

from models.database import get_db
from models.user import User
from models.user_settings import UserToolUsage
from utils.auth import get_current_user
from utils.response import success_response, error_response

logger = logging.getLogger(__name__)
router = APIRouter()


class ToolUsageCreateRequest(BaseModel):
    tool_name: str
    duration_seconds: int = 0
    extra_data: str = "{}"


@router.get("/tool-usage", summary="获取用户工具使用记录")
async def get_tool_usage(
    tool_name: Optional[str] = Query(None, description="工具名称筛选"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户使用心理工具的记录"""
    query = db.query(UserToolUsage).filter(UserToolUsage.user_id == current_user.id)
    
    if tool_name:
        query = query.filter(UserToolUsage.tool_name == tool_name)
    
    total = query.count()
    records = (
        query
        .order_by(UserToolUsage.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    
    data = [
        {
            "id": r.id,
            "tool_name": r.tool_name,
            "duration_seconds": r.duration_seconds,
            "extra_data": r.extra_data,
            "created_at": r.created_at.isoformat() if r.created_at else "",
        }
        for r in records
    ]
    
    return success_response(data={
        "records": data,
        "total": total,
        "page": page,
        "page_size": page_size,
    })


@router.post("/tool-usage", summary="记录工具使用")
async def create_tool_usage(
    req: ToolUsageCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """记录用户使用心理工具"""
    if not req.tool_name:
        return error_response(code=400, msg="工具名称不能为空")
    
    usage = UserToolUsage(
        user_id=current_user.id,
        tool_name=req.tool_name[:50],
        duration_seconds=max(0, req.duration_seconds),
        extra_data=req.extra_data[:1000] if req.extra_data else "{}",
    )
    
    db.add(usage)
    db.commit()
    db.refresh(usage)
    
    logger.info("[tool-usage] 记录工具使用 | user_id=%d tool=%s duration=%ds", 
                current_user.id, req.tool_name, req.duration_seconds)
    
    return success_response(data={
        "id": usage.id,
        "tool_name": usage.tool_name,
        "duration_seconds": usage.duration_seconds,
        "created_at": usage.created_at.isoformat() if usage.created_at else "",
    })


@router.get("/tool-usage/stats", summary="获取工具使用统计")
async def get_tool_stats(
    days: int = Query(30, ge=1, le=365),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户使用心理工具的统计数据"""
    from datetime import datetime, timedelta
    
    start_date = datetime.utcnow() - timedelta(days=days)
    
    results = (
        db.query(
            UserToolUsage.tool_name,
            func.count(UserToolUsage.id).label("count"),
            func.sum(UserToolUsage.duration_seconds).label("total_duration")
        )
        .filter(
            UserToolUsage.user_id == current_user.id,
            UserToolUsage.created_at >= start_date
        )
        .group_by(UserToolUsage.tool_name)
        .all()
    )
    
    total_usage = sum(r.count for r in results)
    total_duration = sum(r.total_duration or 0 for r in results)
    
    data = {
        "total_usage": total_usage,
        "total_duration_seconds": total_duration,
        "by_tool": [
            {
                "tool_name": r.tool_name,
                "usage_count": r.count,
                "total_duration_seconds": r.total_duration or 0,
            }
            for r in results
        ]
    }
    
    return success_response(data=data)