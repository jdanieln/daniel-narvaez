# Documento de Especificación de Requerimientos de Software (SRS)

**Proyecto:** Website Personal y Académico — Dr. José Daniel Narváez Flores  
**Versión:** 1.0.0 (Versión Inicial de Análisis y Diseño)  
**Fecha:** Octubre 2026  
**Autor:** Equipo de Desarrollo / Dr. José Daniel Narváez Flores  
**Estado:** En revisión inicial  

---

## 1. Introducción

### 1.1 Propósito
El propósito del presente documento es formalizar la especificación completa de requerimientos funcionales, requerimientos no funcionales y reglas de negocio para el desarrollo, evolución y mantenimiento del sitio web personal y académico del **Dr. José Daniel Narváez Flores**. Este documento sirve como línea base contractual y técnica para el equipo de análisis, arquitectura, frontend y backend.

### 1.2 Alcance del Sistema
El sistema comprende una plataforma web interactiva full-stack compuesta por:
1. **Frontend cliente:** Aplicación web moderna construida con React, Vite y Vanilla CSS (arquitectura de componentes y diseño cyber-académico con soporte multilenguaje y modo oscuro).
2. **Backend de servicios:** API RESTful modular desarrollada en Python con Flask, implementando principios de **Clean Architecture** (desacoplamiento estricto de dominio, casos de uso, infraestructura y presentación).
3. **Capa de persistencia:** Base de datos relacional ligera en SQLite para el almacenamiento de información curricular, publicaciones científicas, enlaces oficiales de verificación electrónica y registro de mensajes de contacto.

El sistema exhibe la trayectoria doctoral, perfil de investigación en Ciencias de la Computación e Inteligencia Artificial (con énfasis en **AI4SE**, sistemas neuro-simbólicos y matemática computacional), producción científica indexada, historial docente y profesional, y ofrece canales directos y validados de contacto.

### 1.3 Definiciones, Acrónimos y Abreviaturas
- **AI4SE:** Artificial Intelligence for Software Engineering.
- **CSV:** Código Seguro de Verificación (mecanismo criptográfico oficial para verificación de títulos universitarios).
- **Clean Architecture:** Paradigma arquitectónico formulado por Robert C. Martin que separa la lógica de negocio de los detalles tecnológicos e interfaces de entrada/salida.
- **DTO:** Data Transfer Object.
- **DOI:** Digital Object Identifier (identificador persistente de publicaciones académicas).
- **RVOE:** Reconocimiento de Validez Oficial de Estudios (México).
- **UAI:** Universidad Abierta Interamericana (Argentina).
- **UNIR:** Universidad Internacional de La Rioja (México / España).
- **MAPE-KV:** Monitor-Analyze-Plan-Execute with Knowledge-Validation loop.
- **ArchiGenMS:** Architecture Generation for Microservices (sistema generativo neuro-simbólico).

---

## 2. Descripción General del Sistema

### 2.1 Perspectiva del Producto
El sistema opera de forma autónoma con una arquitectura desacoplada cliente-servidor:
```text
[ Cliente Web / Navegador ] 
            │
            ▼ (HTTP / JSON REST)
┌────────────────────────────────────────────────────────┐
│               Backend Flask (Clean Arch)               │
│  [Presentación] ➔ [Casos de Uso] ➔ [Dominio]          │
│                          │                             │
│                          ▼                             │
│             [Infraestructura SQLite]                   │
└────────────────────────────────────────────────────────┘
```
El cliente cuenta además con una estrategia de **tolerancia a fallos y carga offline (Fallback Strategy)** que le permite visualizar datos cacheados consistentes con el CV en caso de desconexión o latencia en el backend.

### 2.2 Perfiles de Usuario y Stakeholders
| Perfil | Descripción | Necesidad Principal |
| :--- | :--- | :--- |
| **Propietario / Investigador (Dr. Narváez)** | Administrador de la información personal, docente y científica. | Disponer de un portal de vanguardia para proyectar su investigación, publicaciones y servicios de consultoría técnica. |
| **Pares Académicos y Comités Científicos** | Investigadores, editores de revistas y conferencias internacionales. | Explorar artículos indexados, descargar citas en BibTeX/texto, validar tesis doctoral y revisar líneas de investigación. |
| **Instituciones Educativas y Universidades** | Comités de acreditación y autoridades académicas. | Verificar títulos de posgrado mediante hipervínculos oficiales CSV y constatar experiencia docente. |
| **Empresas y Clientes de Consultoría** | Empresas tecnológicas, sector financiero y organizaciones que requieren consultoría en IA. | Evaluar antecedentes en arquitectura de software, IA generativa y enviar propuestas de consultoría por formulario. |
| **Estudiantes y Tesistas** | Alumnos de grado y posgrado. | Acceder a material, temáticas de investigación y solicitar tutorías o consultas académicas. |

---

## 3. Requerimientos Funcionales (RF)

### 3.1 Módulo de Identidad y Perfil (RF-01 a RF-03)

#### RF-01: Visualización del Perfil Principal (Hero & About)
- **Descripción:** El sistema debe presentar de manera prominente la identidad del Dr. José Daniel Narváez Flores, incluyendo fotografía/avatar oficial, título académico principal, resumen biográfico ejecutivo, métricas destacadas (años de experiencia, maestrías, publicaciones, proyectos) y canales de comunicación rápida (correo, teléfono con formato internacional, enlaces a GitHub y LinkedIn).
- **Entradas:** Selección de idioma activa (`lang=es` o `lang=en`).
- **Salida:** Sección visual con microinteracciones y botones de llamada a la acción (Contactar, Descargar CV, Explorar Publicaciones).

#### RF-02: Internacionalización y Cambio Dinámico de Idioma (ES / EN)
- **Descripción:** El sistema debe soportar conmutación bilingüe instantánea e integral entre Español e Inglés sin recargar la página.
- **Entradas:** Evento de cambio en el selector de idioma de la barra de navegación.
- **Reglas:**
  1. El idioma seleccionado debe persistir en el almacenamiento local del navegador (`localStorage`).
  2. Todos los textos fijos de la interfaz y los contenidos dinámicos provenientes del backend deben actualizarse de inmediato acorde al código de idioma (`es` o `en`).
  3. Si no existe preferencia previa en `localStorage`, se debe tomar el idioma por defecto (`es`).

#### RF-03: Pilares y Líneas de Investigación
- **Descripción:** El sistema debe exponer los cuatro pilares fundamentales de investigación del Dr. Narváez:
  1. AI4SE (Inteligencia Artificial para Ingeniería de Software, ArchiGenMS, MAPE-KV).
  2. Verificación Formal & Lenguajes Formales (Lean 4, especificación matemática, contratos).
  3. Arquitectura de Software y Sistemas Neuro-Simbólicos (Microservicios, evaluación de métricas de acoplamiento y cohesión).
  4. Matemática Computacional y Computación Cuántica (Optimización continua, álgebra y algoritmos cuánticos).

---

### 3.2 Módulo Curricular y Trayectoria (RF-04 a RF-06)

#### RF-04: Línea de Tiempo de Experiencia Profesional y Docente
- **Descripción:** El sistema debe presentar cronológicamente los cargos docentes y profesionales (Keiser University, RETECSA, UNHSJM, UNM-RMA, Grupo LAFISE).
- **Criterios de Aceptación:**
  1. Cada experiencia debe incluir cargo, institución, período de tiempo, resumen de responsabilidades, lista de logros destacados y etiquetas tecnológicas.
  2. Las experiencias deben ordenarse de forma cronológica descendente mediante un índice predefinido (`order_index`).

#### RF-05: Formación Académica y Verificación de Credenciales (CSV)
- **Descripción:** El sistema debe listar las titulaciones de posgrado y grado obtenidas (Doctorado en Informática, Maestrías en UNIR México, Ingeniería de Sistemas en UNI).
- **Criterios de Aceptación:**
  1. Cada registro debe reflejar el grado conferido, universidad otorgante, fecha de graduación y menciones/promedios de honor.
  2. Para cada maestría y doctorado, el sistema **debe proporcionar un enlace externo directo y funcional** a la plataforma de verificación oficial:
     - Repositorio UAI para el Doctorado.
     - Plataforma Verifirma con Código Seguro de Verificación (CSV) para UNIR México.

#### RF-06: Catálogo de Habilidades y Competencias Técnicas
- **Descripción:** El sistema debe categorizar las habilidades del investigador en clústeres semánticos:
  1. Investigación & Métodos Formales.
  2. Tecnologías, Lenguajes y Frameworks (Python, JavaScript/TypeScript, Java, C++, SQL, Lean 4, React, Flask).
  3. Cloud, DevOps & Arquitectura de Software.
  4. Idiomas y Competencias Interpersonales.

---

### 3.3 Módulo de Producción Científica (RF-07 a RF-08)

#### RF-07: Catálogo y Filtrado de Publicaciones Científicas
- **Descripción:** El sistema debe mostrar el listado completo de publicaciones académicas (artículos en revistas indexadas, conferencias, tesis doctorales y workshops).
- **Funcionalidades requeridas:**
  1. **Filtrado por categoría:** Permitir al usuario filtrar por tipo de publicación (`all`, `journal`, `conference`, `thesis`, `workshop`).
  2. **Búsqueda en tiempo real:** Campo de texto interactivo que filtre por coincidencia insensible a mayúsculas/minúsculas sobre el título, autores o congreso/revista.
  3. **Visualización de metadatos:** Título del paper, nómina de coautores, nombre de la revista/conferencia, año de publicación, enlace externo oficial o identificador DOI.

#### RF-08: Copia de Cita Bibliográfica al Portapapeles
- **Descripción:** Cada tarjeta de publicación debe incluir un botón interactivo que copie la referencia en formato bibliográfico estándar directamente al portapapeles del usuario con retroalimentación visual inmediata (cambio de icono y mensaje de confirmación por 2 segundos).

---

### 3.4 Módulo de Interacción y Contacto (RF-09 a RF-11)

#### RF-09: Formulario de Contacto Académico/Profesional
- **Descripción:** El sistema debe proveer un formulario para que visitantes, colegas o empresas envíen mensajes directamente al investigador.
- **Campos requeridos:**
  - Nombre completo (`name`): Cadena no vacía, mínimo 2 caracteres.
  - Correo electrónico (`email`): Cadena con formato válido de email según RFC 5322.
  - Asunto (`subject`): Cadena no vacía, mínimo 3 caracteres.
  - Mensaje (`message`): Cadena no vacía, mínimo 10 caracteres.
- **Comportamiento:**
  1. Validación en cliente y en servidor.
  2. Bloqueo de reenvío simultáneo (estado de carga / *submitting*).
  3. Persistencia en la tabla `contact_messages` de la base de datos.
  4. Notificación visual de éxito o error descriptivo en la interfaz.

#### RF-10: Exposición de API RESTful
- **Descripción:** El backend debe suministrar endpoints estandarizados en formato JSON con soporte para el parámetro de consulta `?lang=es|en`:
  - `GET /api/health`
  - `GET /api/portfolio`
  - `GET /api/profile`
  - `GET /api/experiences`
  - `GET /api/educations`
  - `GET /api/publications`
  - `GET /api/skills`
  - `POST /api/contact`

#### RF-11: Fallback y Tolerancia a Fallos en el Cliente
- **Descripción:** El cliente debe implementar un servicio de acceso a datos con recuperación ante fallos (`api.js`). Si el backend no está disponible o la conexión de red experimenta cortes, la interfaz debe cargar fluidamente la información pre-almacenada asegurando que el sitio sea 100% navegable en todo momento.

---

## 4. Requerimientos No Funcionales (RNF)

### 4.1 Rendimiento (RNF-01)
- El tiempo de respuesta de los endpoints del backend en condiciones normales no debe exceder los **200 milisegundos**.
- El First Contentful Paint (FCP) del frontend en conexiones de banda ancha estándar debe ser inferior a **1.0 segundo**.

### 4.2 Usabilidad y Diseño Visual (RNF-02)
- La interfaz de usuario debe proyectar una identidad visual moderna y distinguida denominada **"Cyber-Académica"**, caracterizada por:
  - Paleta oscura de alto contraste basada en tonos pizarra (`#090d16`), azul índigo (`#6366f1`) y toques de cian/esmeralda (`#06b6d4`, `#10b981`).
  - Efectos sutiles de desenfoque y capas de vidrio (*glassmorphism*).
  - Tipografías modernas sans-serif (`Inter`, `system-ui`) complementadas con tipografías monoespaciadas (`JetBrains Mono`, `Fira Code`) para identificadores técnicos y badges.
- Cumplimiento de estándares de contraste visual según **WCAG 2.1 nivel AA**.

### 4.3 Arquitectura y Mantenibilidad (RNF-03)
- El backend debe conservar estrictamente la estructura concéntrica de **Clean Architecture**:
  - `domain`: Modelos puros y contratos abstractos sin dependencias a librerías externas o frameworks.
  - `application`: Casos de uso orquestadores que operan sobre los repositorios.
  - `infrastructure`: Conexión a SQLite y adaptadores de persistencia.
  - `presentation`: Blueprints y controladores Flask para el protocolo HTTP.
- Cobertura de pruebas unitarias automatizadas sobre los casos de uso y la capa de presentación.

### 4.4 Portabilidad y Responsividad (RNF-04)
- La aplicación debe ser 100% responsiva bajo enfoque *Mobile First*, garantizando adaptación visual y táctil perfecta en resoluciones:
  - Móvil: 360px - 767px.
  - Tablet: 768px - 1023px.
  - Escritorio y Pantallas Anchas: 1024px en adelante.

### 4.5 Seguridad e Integridad de Datos (RNF-05)
- Uso obligatorio de consultas preparadas/parametrizadas en SQLite para prevenir ataques de **Inyección SQL (SQLi)**.
- Validación y saneamiento de entradas en el endpoint de contacto para prevenir **Cross-Site Scripting (XSS)**.
- Habilitación de cabeceras seguras y control de orígenes cruzados (CORS) permitiendo únicamente orígenes autorizados o locales en desarrollo.

---

## 5. Reglas de Negocio (RN)

| Código | Nombre | Declaración de la Regla |
| :--- | :--- | :--- |
| **RN-01** | **Bilingüismo Obligatorio** | Toda entidad con campos de presentación al usuario (títulos, cargos, resúmenes, descripciones) debe poseer versiones traducidas y validadas tanto en español (`_es`) como en inglés (`_en`). |
| **RN-02** | **Validación de Mensajería** | No se aceptará ningún mensaje de contacto que carezca de un correo con estructura sintáctica válida o cuyo cuerpo posea menos de 10 caracteres significativos. |
| **RN-03** | **Verificabilidad Electrónica** | Las titulaciones académicas de posgrado deben contar de forma mandatoria con un hipervínculo de verificación externa válido (URL a repositorio o validador CSV institucional). |
| **RN-04** | **Ordenamiento Cronológico Relativo** | Las experiencias laborales y los títulos académicos deben exhibirse priorizando los puestos vigentes o más recientes mediante la columna `order_index` ascendente. |
| **RN-05** | **Inmutabilidad de Mensajes** | Los mensajes de contacto almacenados son de carácter transaccional de solo inserción; no admiten modificación por parte de clientes externos vía API. |

---

## 6. Matriz de Trazabilidad (Requerimientos vs Componentes)

| Requerimiento | Caso de Uso Backend | Endpoint API | Componente Frontend |
| :--- | :--- | :--- | :--- |
| **RF-01** (Perfil Hero) | `GetProfileUseCase` | `GET /api/profile` | `Hero.jsx` |
| **RF-02** (Bilingüismo) | `Get*UseCase(lang)` | `GET /api/*?lang=` | `LanguageContext.jsx`, `Navbar.jsx` |
| **RF-03** (Pilares) | N/A (Estructura estática/dinámica) | `GET /api/profile` | `About.jsx` |
| **RF-04** (Experiencias) | `GetExperiencesUseCase` | `GET /api/experiences` | `Experience.jsx` |
| **RF-05** (Educación / CSV) | `GetEducationsUseCase` | `GET /api/educations` | `Education.jsx` |
| **RF-06** (Habilidades) | `GetSkillsUseCase` | `GET /api/skills` | `Skills.jsx` |
| **RF-07** (Publicaciones) | `GetPublicationsUseCase` | `GET /api/publications` | `Publications.jsx` |
| **RF-08** (Copia de Citas) | Lógica Cliente | N/A | `Publications.jsx` |
| **RF-09** (Contacto) | `SendContactMessageUseCase` | `POST /api/contact` | `Contact.jsx` |
| **RF-10** (API Completa) | `GetPortfolioDataUseCase` | `GET /api/portfolio` | `api.js` |
| **RF-11** (Resiliencia) | N/A | N/A | `api.js` (FALLBACK_DATA) |
