import sqlite3
import os
from typing import Optional

DEFAULT_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "portfolio.db")

class Database:
    def __init__(self, db_path: Optional[str] = None):
        self.db_path = db_path or os.getenv("PORTFOLIO_DB_PATH", DEFAULT_DB_PATH)

    def get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        conn = self.get_connection()
        cursor = conn.cursor()

        cursor.executescript("""
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            academic_title_es TEXT NOT NULL,
            academic_title_en TEXT NOT NULL,
            summary_es TEXT NOT NULL,
            summary_en TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            location TEXT NOT NULL,
            github_url TEXT NOT NULL,
            linkedin_url TEXT NOT NULL,
            avatar_url TEXT,
            cv_download_url TEXT
        );

        CREATE TABLE IF NOT EXISTS experiences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role_es TEXT NOT NULL,
            role_en TEXT NOT NULL,
            institution TEXT NOT NULL,
            period_es TEXT NOT NULL,
            period_en TEXT NOT NULL,
            description_es TEXT NOT NULL,
            description_en TEXT NOT NULL,
            highlights_es TEXT, -- JSON array string
            highlights_en TEXT, -- JSON array string
            tags TEXT, -- JSON array string
            order_index INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS educations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            degree_es TEXT NOT NULL,
            degree_en TEXT NOT NULL,
            institution TEXT NOT NULL,
            date_text_es TEXT NOT NULL,
            date_text_en TEXT NOT NULL,
            honors_es TEXT,
            honors_en TEXT,
            verification_url TEXT,
            order_index INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS publications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            authors TEXT NOT NULL,
            venue TEXT NOT NULL,
            year INTEGER NOT NULL,
            pub_type TEXT NOT NULL,
            doi TEXT,
            url TEXT,
            citation TEXT,
            order_index INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_es TEXT NOT NULL,
            category_en TEXT NOT NULL,
            skills TEXT NOT NULL, -- JSON array string
            order_index INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)

        conn.commit()
        conn.close()
