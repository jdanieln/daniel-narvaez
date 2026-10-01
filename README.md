# Website Personal y Académico — Dr. José Daniel Narváez Flores

Sitio web personal y académico interactivo para el **Dr. José Daniel Narváez Flores**, Doctor en Informática e Investigador en Ciencias de la Computación e Inteligencia Artificial (Keiser University, ex-analista bancario en Grupo LAFISE, consultor en IA en RETECSA).

El proyecto está diseñado bajo los principios de **Arquitectura Limpia (Clean Architecture)**, con soporte **multilenguaje completo (Español e Inglés)**, frontend en **React (Vite)** con **Vanilla CSS** moderno (diseño cyber-académico con glassmorphism y microinteracciones), backend desacoplado en **Python con Flask** y persistencia en **SQLite**.

---

## 🏛️ Arquitectura del Sistema (Clean Architecture)

El backend sigue estrictamente la separación de responsabilidades de Clean Architecture en cuatro capas concéntricas:

```text
daniel-narvaez/
├── backend/
│   ├── app/
│   │   ├── domain/               # Capa de Dominio (Entidades de negocio e interfaces abstractas)
│   │   │   ├── models.py         # Entidades: Profile, Experience, Education, Publication, SkillCategory, ContactMessage
│   │   │   └── repositories.py   # Puertos abstractos (ProfileRepository, ContactRepository, etc.)
│   │   ├── application/          # Capa de Aplicación (Casos de Uso)
│   │   │   └── use_cases.py      # GetProfileUseCase, GetPortfolioDataUseCase, SendContactMessageUseCase, etc.
│   │   ├── infrastructure/       # Capa de Infraestructura (Adaptadores externos y persistencia)
│   │   │   ├── database.py       # Conexión y creación de tablas SQLite
│   │   │   ├── seed_data.py      # Datos iniciales extraídos del CV (Español / Inglés)
│   │   │   └── sqlite_repositories.py # Implementación concreta de los repositorios en SQLite
│   │   └── presentation/         # Capa de Presentación (Controladores / API REST)
│   │       └── api_routes.py     # Blueprint Flask (/api/profile, /api/portfolio, /api/contact, etc.)
│   ├── tests/                    # Pruebas unitarias automatizadas
│   │   └── test_api.py
│   ├── config.py
│   ├── run.py                    # Punto de entrada del servidor backend
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Hero, About, Experience, Education, Publications, Skills, Contact, Footer
│   │   ├── context/
│   │   │   └── LanguageContext.jsx # Proveedor global de idioma (ES / EN) con persistencia
│   │   ├── services/
│   │   │   └── api.js            # Cliente API con tolerancia y fallback resiliente
│   │   ├── styles/
│   │   │   ├── variables.css     # Tokens de diseño (paleta nocturna, contrastes, bordes y glows)
│   │   │   ├── global.css        # Resets, tipografía, utilidades y contenedor
│   │   │   └── components.css    # Estilizado específico y responsivo
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🌐 Características Principales

1. **Multilenguaje Dinámico (ES / EN)**:
   - Selector en la barra de navegación con cambio instantáneo entre Español e Inglés.
   - Persistencia de la preferencia de idioma en el navegador (`localStorage`).
   - El backend responde a parámetros de consulta `?lang=es` o `?lang=en`.
2. **Secciones Académicas y Profesionales Basadas en el CV**:
   - **Hero**: Presentación, enlaces a GitHub ([@jdanieln](https://github.com/jdanieln)), LinkedIn ([@jdanielnf](https://linkedin.com/in/jdanielnf)), correo, teléfono y métricas clave.
   - **Sobre Mí (Pillars)**: Pilares de investigación (AI4SE, Verificación Formal con Lean 4, Sistemas Neuro-Simbólicos como ArchiGenMS y MAPE-KV, Matemática Computacional y Cuántica).
   - **Experiencia**: Línea de tiempo cronológica con cargos docentes y de investigación (Keiser University, RETECSA, UNHSJM, UNM-RMA, LAFISE) con logros y etiquetas técnicas.
   - **Formación & Títulos**: Doctorado en Informática (UAI), tres Maestrías oficiales (UNIR México) con menciones de honor, e **hipervínculos directos de verificación oficial electrónica (CSV)**.
   - **Publicaciones Científicas**: Catálogo interactivo con filtrado por tipo (Revistas / Journals, Congresos, Tesis Doctoral, Workshops), buscador en tiempo real y botón de **copiar cita bibliográfica al portapapeles**.
   - **Habilidades & Tecnologías**: Agrupación visual en clusters (Investigación, Tecnologías, Cloud/DevOps, Idiomas).
   - **Formulario de Contacto**: Validación de campos e inserción real en la base de datos SQLite mediante el endpoint `POST /api/contact`.

---

## 🚀 Puesta en Marcha Local

### 1. Backend (Python + Flask + SQLite)

```bash
cd backend

# Crear entorno virtual e instalar dependencias
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Ejecutar pruebas unitarias
python -m unittest discover -s tests -p "test_*.py"

# Iniciar servidor Flask (puerto 5001 por defecto)
python run.py
```

El backend se iniciará en `http://localhost:5001` y creará automáticamente `portfolio.db` con los datos del CV sembrados.

#### Endpoints Disponibles:
- `GET /api/health` — Verificación de estado del servicio.
- `GET /api/portfolio?lang=es|en` — Retorna toda la información localizada del portafolio.
- `GET /api/profile?lang=es|en` — Datos del perfil profesional.
- `GET /api/experiences?lang=es|en` — Historial de experiencia.
- `GET /api/educations?lang=es|en` — Historial académico y enlaces de verificación.
- `GET /api/publications?lang=es|en&type=all|journal|conference|thesis` — Publicaciones científicas.
- `GET /api/skills?lang=es|en` — Habilidades por categoría.
- `POST /api/contact` — Envío y almacenamiento de mensaje de contacto.

---

### 2. Frontend (React + Vite + Vanilla CSS)

En otra terminal:

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Para compilar el bundle de producción
npm run build
```

El frontend estará disponible en `http://localhost:5173`.
