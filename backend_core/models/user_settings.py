"""
用户设置/个性化配置模型
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from models.database import Base


class UserSettings(Base):
    """用户个性化设置"""
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    ai_name = Column(String(50), default="小语", nullable=False)
    response_style = Column(String(20), default="gentle", nullable=False)  # gentle, direct, humor
    notifications_enabled = Column(Boolean, default=True, nullable=False)
    theme = Column(String(20), default="dark", nullable=False)  # dark, light
    language = Column(String(10), default="zh-CN", nullable=False)
    
    crisis_alert_enabled = Column(Boolean, default=True, nullable=False)
    daily_reminder_enabled = Column(Boolean, default=False, nullable=False)
    reminder_time = Column(String(10), default="20:00", nullable=False)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="settings")


class MemoryCapsule(Base):
    """记忆胶囊/治愈时刻"""
    __tablename__ = "memory_capsules"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    mood = Column(String(20), default="happy")  # happy, calm, grateful, hopeful, etc.
    tags = Column(String(200), default="")  # JSON string of tags
    
    is_public = Column(Boolean, default=False, nullable=False)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="memory_capsules")


class UserToolUsage(Base):
    """用户心理工具使用记录"""
    __tablename__ = "user_tool_usage"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    tool_name = Column(String(50), nullable=False)  # asmr, whitenoise, meditation, etc.
    duration_seconds = Column(Integer, default=0)
    extra_data = Column(Text, default="{}")  # JSON string for extra data
    
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="tool_usage")


class KnowledgeArticle(Base):
    """知识库文章"""
    __tablename__ = "knowledge_articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(50), default="general")  # 情绪管理, 生活习惯, 社交心理, etc.
    read_time = Column(Integer, default=5)  # minutes
    tags = Column(String(200), default="")
    
    is_published = Column(Boolean, default=True, nullable=False)
    view_count = Column(Integer, default=0)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())