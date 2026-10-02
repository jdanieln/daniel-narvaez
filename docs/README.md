# Artefactos de Análisis y Diseño de Software

Este directorio consolida los documentos rectores de ingeniería de software para el desarrollo, evolución y auditoría técnica del sitio web personal y académico del **Dr. José Daniel Narváez Flores**.

---

## 📁 Estructura de Documentación

| Documento | Descripción | Estado |
| :--- | :--- | :--- |
| 📄 [`requirements.md`](./requirements.md) | **Especificación de Requerimientos de Software (SRS):** Alcance, perfiles de usuario, requerimientos funcionales (RF-01 a RF-11), requerimientos no funcionales (rendimiento, seguridad, usabilidad WCAG AA, Clean Architecture), reglas de negocio y matriz de trazabilidad. | Versión 1.0 (Inicial) |
| 📄 [`data-dictionary.md`](./data-dictionary.md) | **Diccionario de Datos del Sistema:** Diagrama Entidad-Relación en Mermaid, especificación exhaustiva de tablas SQLite (`profile`, `experiences`, `educations`, `publications`, `skills`, `contact_messages`), columnas, tipos lógicos/físicos, esquemas JSON serializados y contratos de API (DTOs). | Versión 1.0 (Inicial) |

---

## 🏛️ Alineación Arquitectónica

Los artefactos contenidos en este directorio gobiernan directamente las implementaciones en el código fuente:

```text
               ┌──────────────────────────────┐
               │ docs/requirements.md (SRS)   │
               └──────────────┬───────────────┘
                              │ Define reglas y casos de uso
                              ▼
               ┌──────────────────────────────┐
               │  backend/app/application/    │
               │         use_cases.py         │
               └──────────────┬───────────────┘
                              │
               ┌──────────────┴───────────────┐
               ▼                              ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│  docs/data-dictionary.md     │ │   frontend/src/services/     │
│  Tablas SQLite & Entidades   │ │   api.js & DTOs              │
└──────────────┬───────────────┘ └──────────────────────────────┘
               ▼
┌──────────────────────────────┐
│  backend/app/domain/         │
│  models.py & repositories.py │
└──────────────────────────────┘
```

---

## 🔄 Flujo de Revisión y Control de Cambios

1. **Revisión del Investigador / Propietario:** Validación de alcance curricular, publicaciones indexadas y exactitud de credenciales institucionales.
2. **Ajustes y Refinamiento:** Cualquier modificación a los modelos de dominio, validaciones de contacto o endpoints de la API debe reflejarse en estos documentos de forma previa o sincrónica al cambio en código.
