import unittest
import os
import tempfile
from app import create_app
from app.infrastructure.database import Database

class PortfolioApiTestCase(unittest.TestCase):
    def setUp(self):
        self.db_fd, self.db_path = tempfile.mkstemp()
        self.app = create_app(db_path=self.db_path)
        self.client = self.app.test_client()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(self.db_path)

    def test_health(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json.get("status"), "healthy")

    def test_profile_spanish_and_english(self):
        res_es = self.client.get("/api/profile?lang=es")
        self.assertEqual(res_es.status_code, 200)
        self.assertIn("Doctor en Informática", res_es.json["academicTitle"])

        res_en = self.client.get("/api/profile?lang=en")
        self.assertEqual(res_en.status_code, 200)
        self.assertIn("Ph.D. in Computer Science", res_en.json["academicTitle"])

    def test_publications(self):
        res = self.client.get("/api/publications")
        self.assertEqual(res.status_code, 200)
        self.assertGreaterEqual(len(res.json), 9)

    def test_contact_submission(self):
        res = self.client.post("/api/contact", json={
            "name": "Prof. Test",
            "email": "test@university.edu",
            "subject": "Research Collaboration",
            "message": "Interested in AI4SE collaboration."
        })
        self.assertEqual(res.status_code, 201)
        self.assertTrue(res.json["success"])

if __name__ == "__main__":
    unittest.main()
