"""知识库文章 路由 v1.0

接口：
  GET /knowledge/articles          获取文章列表（支持分类筛选）
  GET /knowledge/articles/{id}     获取单篇文章
  POST /knowledge/articles         创建文章（管理员）
  PUT /knowledge/articles/{id}     更新文章（管理员）
  DELETE /knowledge/articles/{id}  删除文章（管理员）
"""
import logging
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from models.database import get_db
from models.user import User
from models.user_settings import KnowledgeArticle
from utils.auth import get_current_user, get_optional_user
from utils.response import success_response, error_response

logger = logging.getLogger(__name__)
router = APIRouter()


class ArticleCreateRequest(BaseModel):
    title: str
    content: str
    category: str = "general"
    read_time: int = 5
    tags: str = ""
    is_published: bool = True


class ArticleUpdateRequest(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    read_time: Optional[int] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None


@router.get("/knowledge/articles", summary="获取知识库文章列表")
async def get_articles(
    category: Optional[str] = Query(None, description="分类筛选"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db),
):
    """获取知识库文章列表，支持分类筛选和分页"""
    query = db.query(KnowledgeArticle).filter(KnowledgeArticle.is_published == True)
    
    if category:
        query = query.filter(KnowledgeArticle.category == category)
    
    total = query.count()
    articles = (
        query
        .order_by(KnowledgeArticle.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    
    data = [
        {
            "id": a.id,
            "title": a.title,
            "content": a.content[:200] + "..." if len(a.content) > 200 else a.content,
            "category": a.category,
            "read_time": a.read_time,
            "tags": a.tags,
            "view_count": a.view_count,
            "created_at": a.created_at.isoformat() if a.created_at else "",
        }
        for a in articles
    ]
    
    return success_response(data={
        "articles": data,
        "total": total,
        "page": page,
        "page_size": page_size,
    })


@router.get("/knowledge/articles/{article_id}", summary="获取单篇文章")
async def get_article(
    article_id: int,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db),
):
    """获取单篇文章详情，同时增加阅读计数"""
    article = (
        db.query(KnowledgeArticle)
        .filter(
            KnowledgeArticle.id == article_id,
            KnowledgeArticle.is_published == True
        )
        .first()
    )
    
    if not article:
        return error_response(code=404, msg="文章不存在")
    
    article.view_count += 1
    db.commit()
    
    return success_response(data={
        "id": article.id,
        "title": article.title,
        "content": article.content,
        "category": article.category,
        "read_time": article.read_time,
        "tags": article.tags,
        "view_count": article.view_count,
        "created_at": article.created_at.isoformat() if article.created_at else "",
        "updated_at": article.updated_at.isoformat() if article.updated_at else "",
    })


@router.get("/knowledge/categories", summary="获取文章分类列表")
async def get_categories(
    db: Session = Depends(get_db),
):
    """获取所有文章分类及数量"""
    from sqlalchemy import func
    
    results = (
        db.query(
            KnowledgeArticle.category,
            func.count(KnowledgeArticle.id).label("count")
        )
        .filter(KnowledgeArticle.is_published == True)
        .group_by(KnowledgeArticle.category)
        .all()
    )
    
    categories = [
        {"name": r.category, "count": r.count}
        for r in results
    ]
    
    return success_response(data={"categories": categories})