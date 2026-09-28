import json
from .database import Database

def seed_database(db: Database, overwrite: bool = False):
    conn = db.get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM profile")
    count = cursor.fetchone()[0]

    if count > 0 and not overwrite:
        conn.close()
        return

    if overwrite:
        cursor.execute("DELETE FROM profile")
        cursor.execute("DELETE FROM experiences")
        cursor.execute("DELETE FROM educations")
        cursor.execute("DELETE FROM publications")
        cursor.execute("DELETE FROM skills")

    # Seed Profile
    cursor.execute("""
    INSERT INTO profile (
        full_name, academic_title_es, academic_title_en,
        summary_es, summary_en,
        email, phone, location,
        github_url, linkedin_url, avatar_url, cv_download_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        "Dr. José Daniel Narváez Flores",
        "Doctor en Informática | Investigador en CS e IA | Ingeniero de Sistemas",
        "Ph.D. in Computer Science | CS & AI Researcher | Systems Engineer",
        "Doctor en Informática por la Universidad Abierta Interamericana (UAI) e Ingeniero de Sistemas. Mi trayectoria académica incluye tres maestrías finalizadas: Ingeniería de Software y Sistemas Informáticos, Inteligencia Artificial, y Ciencias Computacionales y Matemáticas Aplicadas. Mi investigación doctoral se ha centrado en la aplicación de técnicas de inteligencia artificial al ámbito de la ingeniería de software (AI4SE). Asimismo, mis intereses abarcan la matemática aplicada y la computación cuántica, abordando la resolución de problemas complejos desde una sólida perspectiva interdisciplinaria.",
        "Ph.D. in Computer Science from Universidad Abierta Interamericana (UAI) and Systems Engineer. My academic trajectory includes three completed Master's degrees: Software Engineering & Computer Systems, Artificial Intelligence, and Computational Sciences & Applied Mathematics. My doctoral research focuses on applying artificial intelligence techniques to software engineering (AI4SE). Furthermore, my interests span applied mathematics and quantum computing, addressing complex problem solving from a rigorous interdisciplinary perspective.",
        "jdnarvaezf@gmail.com",
        "+505 5774 1987",
        "Rivas, Nicaragua",
        "https://github.com/jdanieln",
        "https://linkedin.com/in/jdanielnf",
        "https://avatars.githubusercontent.com/u/53232152?v=4",
        "#"
    ))

    # Seed Experiences
    experiences_data = [
        (
            "Profesor Adjunto e Investigador en CS e IA",
            "Adjunct Professor & Researcher in CS & AI",
            "Keiser University",
            "Ene 2026 - Presente",
            "Jan 2026 - Present",
            "Docencia e investigación de frontera en Ciencias de la Computación e Inteligencia Artificial.",
            "Higher education teaching and cutting-edge research in Computer Science and Artificial Intelligence.",
            json.dumps([
                "Impartición de lecciones avanzadas y mentoría de estudiantes en desafíos técnicos complejos.",
                "Investigación activa en AI4SE (Artificial Intelligence for Software Engineering), orientada a la generación de conocimiento y su difusión en la comunidad científica internacional."
            ]),
            json.dumps([
                "Delivery of advanced lectures and mentorship of undergraduate/graduate students in complex technical challenges.",
                "Active research in AI4SE (AI for Software Engineering), driving knowledge generation and peer-reviewed international publications."
            ]),
            json.dumps(["AI4SE", "Machine Learning", "Research", "Higher Education", "Mentorship"]),
            1
        ),
        (
            "Consultor Interno de IA y Tecnología",
            "Internal AI & Technology Consultant",
            "RETECSA",
            "Sep 2025 - Presente",
            "Sep 2025 - Present",
            "Liderazgo tecnológico y adopción estratégica de soluciones basadas en inteligencia artificial generativa.",
            "Technology leadership and strategic adoption of generative artificial intelligence solutions.",
            json.dumps([
                "Liderazgo en la adopción estratégica de herramientas de IA generativa y automatización de procesos corporativos.",
                "Desarrollo de soluciones tecnológicas personalizadas y capacitación ejecutiva en el ecosistema de Google Workspace y AI Gems."
            ]),
            json.dumps([
                "Strategic leadership in enterprise adoption of generative AI tools and corporate process automation.",
                "Development of custom technological solutions and executive training within Google Workspace and AI Gems ecosystems."
            ]),
            json.dumps(["Generative AI", "Google Workspace", "AI Gems", "Process Automation", "Consulting"]),
            2
        ),
        (
            "Profesor de Ingeniería en Sistemas de Información",
            "Professor of Information Systems Engineering",
            "Universidad Nacional Hermano Juan Salvador Morales (UNHSJM)",
            "Oct 2022 - Presente",
            "Oct 2022 - Present",
            "Docencia universitaria de asignaturas clave en ingeniería de sistemas de información.",
            "University teaching of core subjects in Information Systems Engineering.",
            json.dumps([
                "Formación de futuras generaciones de ingenieros en arquitectura de software y bases de datos.",
                "Diseño curricular y coordinación de laboratorios prácticos."
            ]),
            json.dumps([
                "Training future generations of engineers in software architecture and database design.",
                "Curriculum design and laboratory instruction."
            ]),
            json.dumps(["Higher Education", "Software Architecture", "Database Systems", "Teaching"]),
            3
        ),
        (
            "Profesor de Ingeniería en Sistemas Computacionales",
            "Professor of Computer Systems Engineering",
            "Universidad Nacional Multidisciplinaria Ricardo Morales Avilés (UNM-RMA)",
            "Sep 2022 - Presente",
            "Sep 2022 - Present",
            "Docencia universitaria en el departamento de tecnología e ingeniería computacional.",
            "University teaching within the department of technology and computer engineering.",
            json.dumps([
                "Cátedras especializadas en programación, estructuras de datos y métodos computacionales.",
                "Tutoría de proyectos de graduación e investigación aplicada."
            ]),
            json.dumps([
                "Specialized courses in programming, data structures, and computational methods.",
                "Advising graduation thesis projects and applied student research."
            ]),
            json.dumps(["Programming", "Algorithms", "Computer Science", "Higher Education"]),
            4
        ),
        (
            "Analista Programador S.I.",
            "Information Systems Analyst & Programmer",
            "Grupo LAFISE",
            "Ene 2022 - Mar 2024",
            "Jan 2022 - Mar 2024",
            "Análisis, diseño y mantenimiento de sistemas críticos para el sector bancario y financiero.",
            "Analysis, design, and maintenance of mission-critical systems for the banking and financial sector.",
            json.dumps([
                "Desarrollo e integración de servicios bancarios transaccionales de alta disponibilidad.",
                "Implementación de buenas prácticas de ingeniería de software, Clean Architecture y optimización SQL Server."
            ]),
            json.dumps([
                "Development and integration of high-availability transactional banking services.",
                "Implementation of software engineering best practices, Clean Architecture, and SQL Server performance tuning."
            ]),
            json.dumps(["Fintech", "C#", "SQL Server", "Clean Architecture", "Critical Systems"]),
            5
        )
    ]

    for exp in experiences_data:
        cursor.execute("""
        INSERT INTO experiences (
            role_es, role_en, institution, period_es, period_en,
            description_es, description_en, highlights_es, highlights_en, tags, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, exp)

    # Seed Educations
    educations_data = [
        (
            "Doctorado en Informática",
            "Ph.D. in Computer Science",
            "Universidad Abierta Interamericana (UAI)",
            "Feb 2026",
            "Feb 2026",
            "Tesis: 'Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales'",
            "Dissertation: 'AI-assisted microservice discovery and design from textual requirements'",
            "https://repositorio.uai.edu.ar/collections/bec3d705-1345-44cd-84a8-c11067e04fec",
            1
        ),
        (
            "Maestría en Ciencias Computacionales y Matemáticas Aplicadas",
            "Master in Computational Sciences and Applied Mathematics",
            "Universidad Internacional de La Rioja (UNIR México)",
            "Abr 2025",
            "Apr 2025",
            "Promedio General: 8.67 / 10 | 81 Créditos superados",
            "Grade Average: 8.67 / 10 | 81 Academic Credits completed",
            "https://verifirma.unir.net/MX/CSV/4506798f-6e29-4daa-acf1-9e0acbbaa379",
            2
        ),
        (
            "Maestría en Inteligencia Artificial",
            "Master in Artificial Intelligence",
            "Universidad Internacional de La Rioja (UNIR México)",
            "Oct 2023",
            "Oct 2023",
            "Seminario de Investigación aprobado conforme a RVOE Federal",
            "Research seminar approved under official Federal RVOE standards",
            "https://verifirma.unir.net/MX/CSV/d31e1f2d-05c8-42e2-bf5b-a13ec26010f8",
            3
        ),
        (
            "Maestría en Ingeniería de Software y Sistemas Informáticos",
            "Master in Software Engineering and Computer Systems",
            "Universidad Internacional de La Rioja (UNIR México)",
            "Ago 2022",
            "Aug 2022",
            "Con Mención Honorífica por Alto Desempeño",
            "Graduated with Honors (Mención Honorífica) for Outstanding Academic Performance",
            "https://verifirma.unir.net/MX/CSV/e02f0e2e-f447-41e3-b9a9-16a1470629f4",
            4
        ),
        (
            "Ingeniería de Sistemas",
            "B.S. in Systems Engineering",
            "Universidad Hispanoamericana (UHISPAM)",
            "Nov 2019",
            "Nov 2019",
            "Grado Profesional de Ingeniero de Sistemas",
            "Professional Degree in Systems Engineering",
            None,
            5
        ),
        (
            "Grado en Matemática Computacional",
            "B.S. in Computational Mathematics",
            "Universidad Internacional de La Rioja (UNIR)",
            "En curso",
            "In progress",
            "Estudios universitarios avanzados en matemática aplicada y computación",
            "Advanced university studies in applied mathematics and computing",
            None,
            6
        )
    ]

    for edu in educations_data:
        cursor.execute("""
        INSERT INTO educations (
            degree_es, degree_en, institution, date_text_es, date_text_en,
            honors_es, honors_en, verification_url, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, edu)

    # Seed Publications
    publications_data = [
        (
            "ArchiGenMS: A Neuro-Symbolic Evolutionary Framework for Greenfield Microservice Design",
            "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi",
            "Congresso Ibero-Americano em Engenharia de Software (CIbSE). SBC, pp. 365–372",
            2026,
            "conference",
            None,
            None,
            "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi (2026). “ArchiGenMS: A Neuro-Symbolic Evolutionary Framework for Greenfield Microservice Design”. In: CIbSE 2026, SBC, pp. 365–372.",
            1
        ),
        (
            "MAPE-KV: Una Arquitectura Neuro-Simbólica Verificada para la Orquestación de Enjambres Robóticos",
            "Narváez, Daniel et al.",
            "Congresso Ibero-Americano em Engenharia de Software (CIbSE). SBC, pp. 428–429",
            2026,
            "conference",
            None,
            None,
            "Narváez, Daniel et al. (2026). “MAPE-KV: Una Arquitectura Neuro-Simbólica Verificada para la Orquestación de Enjambres Robóticos”. In: CIbSE 2026, SBC, pp. 428–429.",
            2
        ),
        (
            "Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales",
            "Narváez Flores, José Daniel",
            "Tesis Doctoral. Universidad Abierta Interamericana (UAI)",
            2026,
            "thesis",
            None,
            "https://repositorio.uai.edu.ar/collections/bec3d705-1345-44cd-84a8-c11067e04fec",
            "Narváez Flores, José Daniel (Feb. 2026). “Descubrimiento y diseño de microservicios asistido por IA a partir de requisitos textuales”. Tesis Doctoral, UAI.",
            3
        ),
        (
            "Descubrimiento y diseño de microservicios asistido por IA: Resumen de Línea de Investigación",
            "Narváez Flores, José Daniel",
            "XXVIII Workshop de Investigadores en Ciencias de la Computación (WICC 2026). Repositorio SEDICI",
            2026,
            "workshop",
            None,
            None,
            "Narváez Flores, José Daniel (2026). “Descubrimiento y diseño de microservicios asistido por IA: Resumen de Línea de Investigación”. In: XXVIII WICC 2026, Repositorio SEDICI.",
            4
        ),
        (
            "Designing Microservices Using AI: A Systematic Literature Review",
            "Narváez, Daniel, Nicolas Battaglia, et al.",
            "Software 4.1. ISSN: 2674-113X, MDPI",
            2025,
            "journal",
            "10.3390/software4010006",
            "https://www.mdpi.com/2674-113X/4/1/6",
            "Narváez, Daniel, Nicolas Battaglia, et al. (2025). “Designing Microservices Using AI: A Systematic Literature Review”. In: Software 4.1. DOI: 10.3390/software4010006.",
            5
        ),
        (
            "Explorando el Uso de Inteligencia Artificial en el Descubrimiento y Diseño de Microservicios",
            "Narváez, Daniel",
            "Congresso Ibero-Americano em Engenharia de Software (CIbSE 2025). SBC, pp. 224–231",
            2025,
            "conference",
            None,
            None,
            "Narváez, Daniel (2025). “Explorando el Uso de Inteligencia Artificial en el Descubrimiento y Diseño de Microservicios”. In: CIbSE 2025, SBC, pp. 224–231.",
            6
        ),
        (
            "Aplicación de Inteligencia Artificial Generativa y Verificación Formal en el Descubrimiento de Microservicios",
            "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi",
            "Revista Abierta de Informática Aplicada 9.1, pp. 2–24",
            2025,
            "journal",
            None,
            None,
            "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Rossi (2025). “Aplicación de Inteligencia Artificial Generativa y Verificación Formal en el Descubrimiento de Microservicios”. In: RAIA 9.1, pp. 2–24.",
            7
        ),
        (
            "Descubrimiento automático de microservicios mediante modelos generativos y verificación formal",
            "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Héctor Rossi",
            "XXXI Congreso Argentino de Ciencias de la Computación (CACIC 2025). Viedma, Río Negro",
            2025,
            "conference",
            None,
            None,
            "Narváez, Daniel, Nicolás Battaglia, Alejandro Fernández, and Gustavo Héctor Rossi (2025). “Descubrimiento automático de microservicios mediante modelos generativos y verificación formal”. In: CACIC 2025.",
            8
        ),
        (
            "Aplicación de Inteligencia Artificial en el Diseño de Microservicios",
            "Narváez, Daniel et al.",
            "XXX Congreso Argentino de Ciencias de la Computación (CACIC 2024). La Plata, Argentina",
            2024,
            "conference",
            None,
            None,
            "Narváez, Daniel et al. (2024). “Aplicación de Inteligencia Artificial en el Diseño de Microservicios”. In: CACIC 2024.",
            9
        )
    ]

    for pub in publications_data:
        cursor.execute("""
        INSERT INTO publications (
            title, authors, venue, year, pub_type, doi, url, citation, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, pub)

    # Seed Skills
    skills_data = [
        (
            "Investigación Científica",
            "Scientific Research",
            json.dumps([
                "Verificación Formal (Lean 4)",
                "IA Generativa (LLMs, Diffusion)",
                "Arquitectura de Microservicios",
                "Computación Cuántica",
                "Neuro-Symbolic Frameworks",
                "AI4SE (AI for Software Engineering)"
            ]),
            1
        ),
        (
            "Tecnologías & Lenguajes",
            "Technologies & Languages",
            json.dumps([
                "Python",
                "C# / .NET",
                "MATLAB",
                "Lean 4",
                "SQL Server & SQLite",
                "Clean Architecture / DDD",
                "RESTful APIs & Microservices",
                "JavaScript / React"
            ]),
            2
        ),
        (
            "Ecosistemas Cloud & DevOps",
            "Cloud & DevOps Ecosystems",
            json.dumps([
                "Amazon Web Services (AWS)",
                "Google Cloud Platform (GCP)",
                "Microsoft Azure",
                "Docker & Contenedores",
                "Git & GitHub Workflows"
            ]),
            3
        ),
        (
            "Idiomas",
            "Languages",
            json.dumps([
                "Español (Nativo)",
                "Inglés (Profesional / Técnico)"
            ]),
            4
        )
    ]

    for sk in skills_data:
        cursor.execute("""
        INSERT INTO skills (
            category_es, category_en, skills, order_index
        ) VALUES (?, ?, ?, ?)
        """, sk)

    conn.commit()
    conn.close()
