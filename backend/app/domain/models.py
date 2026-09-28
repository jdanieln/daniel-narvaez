from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class Profile:
    id: int
    full_name: str
    academic_title_es: str
    academic_title_en: str
    summary_es: str
    summary_en: str
    email: str
    phone: str
    location: str
    github_url: str
    linkedin_url: str
    avatar_url: Optional[str] = None
    cv_download_url: Optional[str] = None

@dataclass
class Experience:
    id: int
    role_es: str
    role_en: str
    institution: str
    period_es: str
    period_en: str
    description_es: str
    description_en: str
    highlights_es: List[str] = field(default_factory=list)
    highlights_en: List[str] = field(default_factory=list)
    tags: List[str] = field(default_factory=list)
    order_index: int = 0

@dataclass
class Education:
    id: int
    degree_es: str
    degree_en: str
    institution: str
    date_text_es: str
    date_text_en: str
    honors_es: Optional[str] = None
    honors_en: Optional[str] = None
    verification_url: Optional[str] = None
    order_index: int = 0

@dataclass
class Publication:
    id: int
    title: str
    authors: str
    venue: str
    year: int
    pub_type: str  # 'conference', 'journal', 'thesis', 'workshop'
    doi: Optional[str] = None
    url: Optional[str] = None
    citation: Optional[str] = None
    order_index: int = 0

@dataclass
class SkillCategory:
    id: int
    category_es: str
    category_en: str
    skills: List[str]
    order_index: int = 0

@dataclass
class ContactMessage:
    id: Optional[int]
    name: str
    email: str
    subject: str
    message: str
    created_at: Optional[str] = None
