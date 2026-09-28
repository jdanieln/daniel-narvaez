import os
from flask import Flask
from flask_cors import CORS
from .infrastructure.database import Database
from .infrastructure.sqlite_repositories import (
    SQLiteProfileRepository,
    SQLiteExperienceRepository,
    SQLiteEducationRepository,
    SQLitePublicationRepository,
    SQLiteSkillRepository,
    SQLiteContactRepository
)
from .infrastructure.seed_data import seed_database
from .presentation.api_routes import create_api_blueprint

def create_app(db_path: str = None) -> Flask:
    app = Flask(__name__)
    
    # Configure CORS for development & production
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize Database & Infrastructure
    db = Database(db_path=db_path)
    db.init_db()
    seed_database(db)

    # Instantiate Repositories
    profile_repo = SQLiteProfileRepository(db)
    exp_repo = SQLiteExperienceRepository(db)
    edu_repo = SQLiteEducationRepository(db)
    pub_repo = SQLitePublicationRepository(db)
    skill_repo = SQLiteSkillRepository(db)
    contact_repo = SQLiteContactRepository(db)

    # Register Presentation Layer (API Blueprint)
    api_bp = create_api_blueprint(
        profile_repo=profile_repo,
        exp_repo=exp_repo,
        edu_repo=edu_repo,
        pub_repo=pub_repo,
        skill_repo=skill_repo,
        contact_repo=contact_repo
    )
    app.register_blueprint(api_bp)

    return app
