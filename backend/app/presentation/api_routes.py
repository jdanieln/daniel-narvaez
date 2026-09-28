from flask import Blueprint, request, jsonify
from ..application.use_cases import (
    GetProfileUseCase,
    GetExperiencesUseCase,
    GetEducationsUseCase,
    GetPublicationsUseCase,
    GetSkillsUseCase,
    SendContactMessageUseCase,
    GetPortfolioDataUseCase
)
from ..domain.repositories import (
    ProfileRepository,
    ExperienceRepository,
    EducationRepository,
    PublicationRepository,
    SkillRepository,
    ContactRepository
)

def create_api_blueprint(
    profile_repo: ProfileRepository,
    exp_repo: ExperienceRepository,
    edu_repo: EducationRepository,
    pub_repo: PublicationRepository,
    skill_repo: SkillRepository,
    contact_repo: ContactRepository
) -> Blueprint:
    api = Blueprint("api", __name__, url_prefix="/api")

    profile_uc = GetProfileUseCase(profile_repo)
    exp_uc = GetExperiencesUseCase(exp_repo)
    edu_uc = GetEducationsUseCase(edu_repo)
    pub_uc = GetPublicationsUseCase(pub_repo)
    skill_uc = GetSkillsUseCase(skill_repo)
    contact_uc = SendContactMessageUseCase(contact_repo)
    portfolio_uc = GetPortfolioDataUseCase(profile_repo, exp_repo, edu_repo, pub_repo, skill_repo)

    @api.route("/health", methods=["GET"])
    def health():
        return jsonify({"status": "healthy", "service": "Daniel Narvaez Portfolio API"}), 200

    @api.route("/profile", methods=["GET"])
    def get_profile():
        lang = request.args.get("lang", "es")
        data = profile_uc.execute(lang=lang)
        if not data:
            return jsonify({"error": "Profile not found"}), 404
        return jsonify(data), 200

    @api.route("/experiences", methods=["GET"])
    def get_experiences():
        lang = request.args.get("lang", "es")
        data = exp_uc.execute(lang=lang)
        return jsonify(data), 200

    @api.route("/educations", methods=["GET"])
    def get_educations():
        lang = request.args.get("lang", "es")
        data = edu_uc.execute(lang=lang)
        return jsonify(data), 200

    @api.route("/publications", methods=["GET"])
    def get_publications():
        pub_type = request.args.get("type")
        lang = request.args.get("lang", "es")
        data = pub_uc.execute(pub_type=pub_type, lang=lang)
        return jsonify(data), 200

    @api.route("/skills", methods=["GET"])
    def get_skills():
        lang = request.args.get("lang", "es")
        data = skill_uc.execute(lang=lang)
        return jsonify(data), 200

    @api.route("/portfolio", methods=["GET"])
    def get_portfolio():
        lang = request.args.get("lang", "es")
        data = portfolio_uc.execute(lang=lang)
        return jsonify(data), 200

    @api.route("/contact", methods=["POST"])
    def post_contact():
        payload = request.get_json(silent=True) or {}
        name = payload.get("name", "")
        email = payload.get("email", "")
        subject = payload.get("subject", "")
        message = payload.get("message", "")

        try:
            result = contact_uc.execute(name=name, email=email, subject=subject, message=message)
            return jsonify(result), 201
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": "An unexpected error occurred while saving the message"}), 500

    return api
