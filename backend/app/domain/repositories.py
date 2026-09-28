from abc import ABC, abstractmethod
from typing import List, Optional
from .models import Profile, Experience, Education, Publication, SkillCategory, ContactMessage

class ProfileRepository(ABC):
    @abstractmethod
    def get_profile(self) -> Optional[Profile]:
        """Retrieve main profile information."""
        pass

class ExperienceRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[Experience]:
        """Retrieve all experience items ordered by chronological/priority index."""
        pass

class EducationRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[Education]:
        """Retrieve all education milestones ordered by degree level."""
        pass

class PublicationRepository(ABC):
    @abstractmethod
    def get_all(self, pub_type: Optional[str] = None) -> List[Publication]:
        """Retrieve scientific publications, optionally filtered by type."""
        pass

class SkillRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[SkillCategory]:
        """Retrieve skills grouped by categories."""
        pass

class ContactRepository(ABC):
    @abstractmethod
    def save_message(self, message: ContactMessage) -> ContactMessage:
        """Store a new contact message and return it with assigned ID."""
        pass

    @abstractmethod
    def get_all_messages(self) -> List[ContactMessage]:
        """Retrieve list of received contact inquiries."""
        pass
