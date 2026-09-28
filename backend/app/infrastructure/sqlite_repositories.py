import json
from typing import List, Optional
from .database import Database
from ..domain.models import Profile, Experience, Education, Publication, SkillCategory, ContactMessage
from ..domain.repositories import (
    ProfileRepository,
    ExperienceRepository,
    EducationRepository,
    PublicationRepository,
    SkillRepository,
    ContactRepository
)

class SQLiteProfileRepository(ProfileRepository):
    def __init__(self, db: Database):
        self.db = db

    def get_profile(self) -> Optional[Profile]:
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profile ORDER BY id ASC LIMIT 1")
        row = cursor.fetchone()
        conn.close()
        if not row:
            return None
        return Profile(
            id=row["id"],
            full_name=row["full_name"],
            academic_title_es=row["academic_title_es"],
            academic_title_en=row["academic_title_en"],
            summary_es=row["summary_es"],
            summary_en=row["summary_en"],
            email=row["email"],
            phone=row["phone"],
            location=row["location"],
            github_url=row["github_url"],
            linkedin_url=row["linkedin_url"],
            avatar_url=row["avatar_url"],
            cv_download_url=row["cv_download_url"]
        )

class SQLiteExperienceRepository(ExperienceRepository):
    def __init__(self, db: Database):
        self.db = db

    def get_all(self) -> List[Experience]:
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM experiences ORDER BY order_index ASC, id ASC")
        rows = cursor.fetchall()
        conn.close()
        
        experiences = []
        for row in rows:
            experiences.append(Experience(
                id=row["id"],
                role_es=row["role_es"],
                role_en=row["role_en"],
                institution=row["institution"],
                period_es=row["period_es"],
                period_en=row["period_en"],
                description_es=row["description_es"],
                description_en=row["description_en"],
                highlights_es=json.loads(row["highlights_es"] or "[]"),
                highlights_en=json.loads(row["highlights_en"] or "[]"),
                tags=json.loads(row["tags"] or "[]"),
                order_index=row["order_index"]
            ))
        return experiences

class SQLiteEducationRepository(EducationRepository):
    def __init__(self, db: Database):
        self.db = db

    def get_all(self) -> List[Education]:
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM educations ORDER BY order_index ASC, id ASC")
        rows = cursor.fetchall()
        conn.close()

        educations = []
        for row in rows:
            educations.append(Education(
                id=row["id"],
                degree_es=row["degree_es"],
                degree_en=row["degree_en"],
                institution=row["institution"],
                date_text_es=row["date_text_es"],
                date_text_en=row["date_text_en"],
                honors_es=row["honors_es"],
                honors_en=row["honors_en"],
                verification_url=row["verification_url"],
                order_index=row["order_index"]
            ))
        return educations

class SQLitePublicationRepository(PublicationRepository):
    def __init__(self, db: Database):
        self.db = db

    def get_all(self, pub_type: Optional[str] = None) -> List[Publication]:
        conn = self.db.get_connection()
        cursor = conn.cursor()
        if pub_type and pub_type.lower() != "all":
            cursor.execute(
                "SELECT * FROM publications WHERE LOWER(pub_type) = LOWER(?) ORDER BY order_index ASC, year DESC",
                (pub_type,)
            )
        else:
            cursor.execute("SELECT * FROM publications ORDER BY order_index ASC, year DESC")
        rows = cursor.fetchall()
        conn.close()

        publications = []
        for row in rows:
            publications.append(Publication(
                id=row["id"],
                title=row["title"],
                authors=row["authors"],
                venue=row["venue"],
                year=row["year"],
                pub_type=row["pub_type"],
                doi=row["doi"],
                url=row["url"],
                citation=row["citation"],
                order_index=row["order_index"]
            ))
        return publications

class SQLiteSkillRepository(SkillRepository):
    def __init__(self, db: Database):
        self.db = db

    def get_all(self) -> List[SkillCategory]:
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM skills ORDER BY order_index ASC, id ASC")
        rows = cursor.fetchall()
        conn.close()

        categories = []
        for row in rows:
            categories.append(SkillCategory(
                id=row["id"],
                category_es=row["category_es"],
                category_en=row["category_en"],
                skills=json.loads(row["skills"] or "[]"),
                order_index=row["order_index"]
            ))
        return categories

class SQLiteContactRepository(ContactRepository):
    def __init__(self, db: Database):
        self.db = db

    def save_message(self, message: ContactMessage) -> ContactMessage:
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES (?, ?, ?, ?)
            """,
            (message.name, message.email, message.subject, message.message)
        )
        conn.commit()
        message.id = cursor.lastrowid
        conn.close()
        return message

    def get_all_messages(self) -> List[ContactMessage]:
        conn = self.db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM contact_messages ORDER BY id DESC")
        rows = cursor.fetchall()
        conn.close()

        messages = []
        for row in rows:
            messages.append(ContactMessage(
                id=row["id"],
                name=row["name"],
                email=row["email"],
                subject=row["subject"],
                message=row["message"],
                created_at=row["created_at"]
            ))
        return messages
