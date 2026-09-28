from typing import List, Optional, Dict, Any
from ..domain.models import Profile, Experience, Education, Publication, SkillCategory, ContactMessage
from ..domain.repositories import (
    ProfileRepository,
    ExperienceRepository,
    EducationRepository,
    PublicationRepository,
    SkillRepository,
    ContactRepository
)

class GetProfileUseCase:
    def __init__(self, repository: ProfileRepository):
        self._repository = repository

    def execute(self, lang: str = "es") -> Optional[Dict[str, Any]]:
        profile = self._repository.get_profile()
        if not profile:
            return None
        
        is_en = (lang.lower() == "en")
        return {
            "id": profile.id,
            "fullName": profile.full_name,
            "academicTitle": profile.academic_title_en if is_en else profile.academic_title_es,
            "summary": profile.summary_en if is_en else profile.summary_es,
            "email": profile.email,
            "phone": profile.phone,
            "location": profile.location,
            "githubUrl": profile.github_url,
            "linkedinUrl": profile.linkedin_url,
            "avatarUrl": profile.avatar_url,
            "cvDownloadUrl": profile.cv_download_url,
            "raw": {
                "academicTitleEs": profile.academic_title_es,
                "academicTitleEn": profile.academic_title_en,
                "summaryEs": profile.summary_es,
                "summaryEn": profile.summary_en
            }
        }

class GetExperiencesUseCase:
    def __init__(self, repository: ExperienceRepository):
        self._repository = repository

    def execute(self, lang: str = "es") -> List[Dict[str, Any]]:
        items = self._repository.get_all()
        is_en = (lang.lower() == "en")
        result = []
        for item in items:
            result.append({
                "id": item.id,
                "role": item.role_en if is_en else item.role_es,
                "institution": item.institution,
                "period": item.period_en if is_en else item.period_es,
                "description": item.description_en if is_en else item.description_es,
                "highlights": item.highlights_en if is_en else item.highlights_es,
                "tags": item.tags,
                "orderIndex": item.order_index
            })
        return result

class GetEducationsUseCase:
    def __init__(self, repository: EducationRepository):
        self._repository = repository

    def execute(self, lang: str = "es") -> List[Dict[str, Any]]:
        items = self._repository.get_all()
        is_en = (lang.lower() == "en")
        result = []
        for item in items:
            result.append({
                "id": item.id,
                "degree": item.degree_en if is_en else item.degree_es,
                "institution": item.institution,
                "dateText": item.date_text_en if is_en else item.date_text_es,
                "honors": item.honors_en if is_en else item.honors_es,
                "verificationUrl": item.verification_url,
                "orderIndex": item.order_index
            })
        return result

class GetPublicationsUseCase:
    def __init__(self, repository: PublicationRepository):
        self._repository = repository

    def execute(self, pub_type: Optional[str] = None, lang: str = "es") -> List[Dict[str, Any]]:
        items = self._repository.get_all(pub_type=pub_type)
        result = []
        for item in items:
            result.append({
                "id": item.id,
                "title": item.title,
                "authors": item.authors,
                "venue": item.venue,
                "year": item.year,
                "pubType": item.pub_type,
                "doi": item.doi,
                "url": item.url,
                "citation": item.citation,
                "orderIndex": item.order_index
            })
        return result

class GetSkillsUseCase:
    def __init__(self, repository: SkillRepository):
        self._repository = repository

    def execute(self, lang: str = "es") -> List[Dict[str, Any]]:
        categories = self._repository.get_all()
        is_en = (lang.lower() == "en")
        result = []
        for cat in categories:
            result.append({
                "id": cat.id,
                "category": cat.category_en if is_en else cat.category_es,
                "skills": cat.skills,
                "orderIndex": cat.order_index
            })
        return result

class SendContactMessageUseCase:
    def __init__(self, repository: ContactRepository):
        self._repository = repository

    def execute(self, name: str, email: str, subject: str, message: str) -> Dict[str, Any]:
        if not name or not name.strip():
            raise ValueError("Name is required")
        if not email or "@" not in email:
            raise ValueError("A valid email is required")
        if not message or not message.strip():
            raise ValueError("Message cannot be empty")

        contact = ContactMessage(
            id=None,
            name=name.strip(),
            email=email.strip(),
            subject=subject.strip() if subject else "General Inquiry",
            message=message.strip()
        )
        saved = self._repository.save_message(contact)
        return {
            "success": True,
            "id": saved.id,
            "message": "Message sent successfully"
        }

class GetPortfolioDataUseCase:
    def __init__(
        self,
        profile_repo: ProfileRepository,
        exp_repo: ExperienceRepository,
        edu_repo: EducationRepository,
        pub_repo: PublicationRepository,
        skill_repo: SkillRepository
    ):
        self.profile_uc = GetProfileUseCase(profile_repo)
        self.exp_uc = GetExperiencesUseCase(exp_repo)
        self.edu_uc = GetEducationsUseCase(edu_repo)
        self.pub_uc = GetPublicationsUseCase(pub_repo)
        self.skill_uc = GetSkillsUseCase(skill_repo)

    def execute(self, lang: str = "es") -> Dict[str, Any]:
        return {
            "profile": self.profile_uc.execute(lang=lang),
            "experiences": self.exp_uc.execute(lang=lang),
            "educations": self.edu_uc.execute(lang=lang),
            "publications": self.pub_uc.execute(lang=lang),
            "skills": self.skill_uc.execute(lang=lang),
            "lang": lang
        }
