"""用户设置/个性化配置路由 v1.0

接口：
  GET  /settings          获取当前用户设置
  PUT  /settings          更新用户设置
  POST /settings/reset    重置为默认设置
"""
import logging
from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from models.database import get_db
from models.user import User
from models.user_settings import UserSettings
from utils.auth import get_current_user
from utils.response import success_response, error_response

logger = logging.getLogger(__name__)
router = APIRouter()


class SettingsUpdateRequest(BaseModel):
    ai_name: Optional[str] = None
    response_style: Optional[str] = None
    notifications_enabled: Optional[bool] = None
    theme: Optional[str] = None
    language: Optional[str] = None
    crisis_alert_enabled: Optional[bool] = None
    daily_reminder_enabled: Optional[bool] = None
    reminder_time: Optional[str] = None


class SettingsResponse(BaseModel):
    ai_name: str
    response_style: str
    notifications_enabled: bool
    theme: str
    language: str
    crisis_alert_enabled: bool
    daily_reminder_enabled: bool
    reminder_time: str


def _get_or_create_settings(db: Session, user_id: int) -> UserSettings:
    """获取或创建设置记录"""
    settings = db.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    if settings is None:
        settings = UserSettings(user_id=user_id)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.get("/settings", summary="获取当前用户设置")
async def get_settings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取用户的个性化设置"""
    settings = _get_or_create_settings(db, current_user.id)
    
    return success_response(data={
        "ai_name": settings.ai_name,
        "response_style": settings.response_style,
        "notifications_enabled": settings.notifications_enabled,
        "theme": settings.theme,
        "language": settings.language,
        "crisis_alert_enabled": settings.crisis_alert_enabled,
        "daily_reminder_enabled": settings.daily_reminder_enabled,
        "reminder_time": settings.reminder_time,
    })


@router.put("/settings", summary="更新用户设置")
async def update_settings(
    req: SettingsUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """更新用户的个性化设置"""
    settings = _get_or_create_settings(db, current_user.id)
    
    if req.ai_name is not None:
        settings.ai_name = req.ai_name[:50]
    if req.response_style is not None:
        if req.response_style in ("gentle", "direct", "humor"):
            settings.response_style = req.response_style
    if req.notifications_enabled is not None:
        settings.notifications_enabled = req.notifications_enabled
    if req.theme is not None:
        if req.theme in ("dark", "light"):
            settings.theme = req.theme
    if req.language is not None:
        settings.language = req.language[:10]
    if req.crisis_alert_enabled is not None:
        settings.crisis_alert_enabled = req.crisis_alert_enabled
    if req.daily_reminder_enabled is not None:
        settings.daily_reminder_enabled = req.daily_reminder_enabled
    if req.reminder_time is not None:
        settings.reminder_time = req.reminder_time[:10]
    
    db.commit()
    db.refresh(settings)
    
    logger.info("[settings] 用户设置已更新 | user_id=%d", current_user.id)
    
    return success_response(data={
        "ai_name": settings.ai_name,
        "response_style": settings.response_style,
        "notifications_enabled": settings.notifications_enabled,
        "theme": settings.theme,
        "language": settings.language,
        "crisis_alert_enabled": settings.crisis_alert_enabled,
        "daily_reminder_enabled": settings.daily_reminder_enabled,
        "reminder_time": settings.reminder_time,
    })


@router.post("/settings/reset", summary="重置用户设置")
async def reset_settings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """将用户设置重置为默认值"""
    settings = _get_or_create_settings(db, current_user.id)
    
    settings.ai_name = "小语"
    settings.response_style = "gentle"
    settings.notifications_enabled = True
    settings.theme = "dark"
    settings.language = "zh-CN"
    settings.crisis_alert_enabled = True
    settings.daily_reminder_enabled = False
    settings.reminder_time = "20:00"
    
    db.commit()
    db.refresh(settings)
    
    logger.info("[settings] 用户设置已重置 | user_id=%d", current_user.id)
    
    return success_response(data={
        "ai_name": settings.ai_name,
        "response_style": settings.response_style,
        "notifications_enabled": settings.notifications_enabled,
        "theme": settings.theme,
        "language": settings.language,
        "crisis_alert_enabled": settings.crisis_alert_enabled,
        "daily_reminder_enabled": settings.daily_reminder_enabled,
        "reminder_time": settings.reminder_time,
    })