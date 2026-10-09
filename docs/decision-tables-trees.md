# System Decision Tables and Decision Trees

**Project:** Personal & Academic Website — Dr. José Daniel Narváez Flores  
**Version:** 1.0.0 (Analysis & Specification Baseline)  
**Date:** October 2026  
**Status:** Approved / In Effect  

---

## 1. Introduction and Objectives

This document establishes the **Decision Tables** and **Decision Trees** for the key functional requirements and business rules of the personal and academic web platform.

In software requirements engineering, decision tables and decision trees disambiguate complex conditional logic, ensure exhaustive test coverage, and prevent boundary edge-case failures across both frontend components and backend services.

### 1.1 Structural Conventions
- **Decision Tables:** Organized into Condition Stubs (inputs/predicates), Condition Entries (`Y` = Yes/True, `N` = No/False, `-` = Don't Care/Irrelevant), Action Stubs (outputs/operations), and Action Entries (`X` = Execute Action).
- **Decision Trees:** Rendered using **Mermaid** flowcharts depicting sequential evaluation nodes, decision branches, and terminating actions.

---

## 2. Decision Logic 1: Contact Form Validation & Submission (RF-09, RN-02, RN-05)

### 2.1 Context and Rules
The contact module receives messages from peers, academic committees, and industry partners. Per **RN-02** and **RN-05**, messages must satisfy strict syntactic and domain constraints before being persisted into SQLite. Double submissions must be prevented while a request is in flight.

### 2.2 Decision Table: Contact Form Processing

| Element | Condition / Action | R1 | R2 | R3 | R4 | R5 | R6 | R7 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Condition Stubs** | Already Submitting (`isSubmitting == true`) | Y | N | N | N | N | N | N |
| | Valid Name (`name.trim().length >= 2`) | - | N | Y | Y | Y | Y | Y |
| | Valid Email (`RFC 5322 regex match`) | - | - | N | Y | Y | Y | Y |
| | Valid Subject (`subject.trim().length >= 3`) | - | - | - | N | Y | Y | Y |
| | Valid Message Body (`message.trim().length >= 10`) | - | - | - | - | N | Y | Y |
| | Backend Server Reachable & HTTP 201 | - | - | - | - | - | N | Y |
| **Action Stubs** | Block Form Submission / Ignore Click | X | - | - | - | - | - | - |
| | Show Client Error: "Name must be at least 2 characters" | - | X | - | - | - | - | - |
| | Show Client Error: "Please enter a valid email address" | - | - | X | - | - | - | - |
| | Show Client Error: "Subject must be at least 3 characters" | - | - | - | X | - | - | - |
| | Show Client Error: "Message must be at least 10 characters" | - | - | - | - | X | - | - |
| | Lock Form (`setSubmitting(true)`) & Dispatch `POST /api/contact` | - | - | - | - | - | X | X |
| | Insert Record into SQLite `contact_messages` | - | - | - | - | - | - | X |
| | Show Server Error Alert & Unlock Form | - | - | - | - | - | X | - |
| | Show Success Feedback Banner, Reset Form Fields & Unlock Form | - | - | - | - | - | - | X |

### 2.3 Decision Tree: Contact Form Lifecycle

```mermaid
flowchart TD
    Start(["User Clicks 'Send Message'"]) --> C1{"Is request already<br/>in flight (isSubmitting)?"}
    
    C1 -- Yes --> A_Ignore["Ignore submission / Keep submit button disabled"]
    C1 -- No --> C2{"Name length >= 2?"}
    
    C2 -- No --> A_ErrName["Display Client Error:<br/>'Name must have at least 2 characters'"]
    C2 -- Yes --> C3{"Email matches<br/>RFC 5322 regex?"}
    
    C3 -- No --> A_ErrEmail["Display Client Error:<br/>'Please provide a valid email address'"]
    C3 -- Yes --> C4{"Subject length >= 3?"}
    
    C4 -- No --> A_ErrSubject["Display Client Error:<br/>'Subject must have at least 3 characters'"]
    C4 -- Yes --> C5{"Message length >= 10?<br/>(RN-02)"}
    
    C5 -- No --> A_ErrMessage["Display Client Error:<br/>'Message must have at least 10 characters'"]
    C5 -- Yes --> A_Lock["Lock Form: setSubmitting(true)<br/>Dispatch POST /api/contact"]
    
    A_Lock --> C6{"Backend validation<br/>& SQLite persistence?"}
    
    C6 -- HTTP 201 Created --> A_Success["1. Insert into contact_messages (RN-05)<br/>2. Return {success: true, id: X}<br/>3. Show green success notification<br/>4. Clear form input fields<br/>5. Unlock submission button"]
    C6 -- HTTP 400 / 500 / Network Error --> A_Failure["1. Return error payload<br/>2. Show red error notification to user<br/>3. Preserve form input fields<br/>4. Unlock submission button"]

    classDef condition fill:#1e293b,stroke:#6366f1,stroke-width:2px,color:#f8fafc;
    classDef actionSuccess fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#dcfce7;
    classDef actionError fill:#7f1d1d,stroke:#ef4444,stroke-width:2px,color:#fee2e2;
    classDef actionNeutral fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#e2e8f0;

    class C1,C2,C3,C4,C5,C6 condition;
    class A_Success actionSuccess;
    class A_ErrName,A_ErrEmail,A_ErrSubject,A_ErrMessage,A_Failure actionError;
    class A_Ignore,A_Lock actionNeutral;
```

---

## 3. Decision Logic 2: Language Resolution & Dynamic Internationalization (RF-02, RN-01)

### 3.1 Context and Rules
The website supports full dynamic internationalization between English (`en`) and Spanish (`es`) without page reloads. Per **RF-02** and **RN-01**, all presented content must be localized, the user preference must persist across browser sessions in `localStorage`, and a fallback default must be selected if no prior choice exists.

### 3.2 Decision Table: Language Initialization and Toggling

| Element | Condition / Action | R1 | R2 | R3 | R4 | R5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Condition Stubs** | Trigger Event | Mount | Mount | Mount | Toggle | Toggle |
| | Valid `localStorage['portfolio_lang']` present (`'es'` \| `'en'`) | Y | N | N | - | - |
| | Browser Locale starts with `'en'` (`navigator.language`) | - | Y | N | - | - |
| | Active Language prior to toggle was `'es'` | - | - | - | Y | N |
| **Action Stubs** | Set Language state to stored preference | X | - | - | - | - |
| | Set Language state to `'en'` | - | X | - | - | X |
| | Set Language state to `'es'` (Default fallback) | - | - | X | X | - |
| | Write updated language to `localStorage['portfolio_lang']` | - | X | X | X | X |
| | Re-fetch localized API data (`/api/portfolio?lang={selected}`) | X | X | X | X | X |
| | Re-render UI components with localized dictionary keys | X | X | X | X | X |

### 3.3 Decision Tree: Language Selection & Resolution

```mermaid
flowchart TD
    Init(["Application Mount / Language Check"]) --> Q1{"Is valid preference stored<br/>in localStorage?"}
    
    Q1 -- Yes ('es' or 'en') --> Act_Stored["Hydrate language state from localStorage"]
    Q1 -- No / Corrupted --> Q2{"Does navigator.language<br/>start with 'en'?"}
    
    Q2 -- Yes --> Act_AutoEN["Set language = 'en'<br/>Persist 'en' to localStorage"]
    Q2 -- No --> Act_DefaultES["Set language = 'es' (Default)<br/>Persist 'es' to localStorage"]
    
    Act_Stored --> Fetch["Fetch localized backend data: ?lang={lang}"]
    Act_AutoEN --> Fetch
    Act_DefaultES --> Fetch
    
    Fetch --> Ready["Render UI in selected language"]
    
    Ready --> UserToggle(["User clicks Language Toggle in Navbar"])
    UserToggle --> Q3{"Current active language?"}
    
    Q3 -- 'es' --> SwitchEN["1. Set state to 'en'<br/>2. Update localStorage to 'en'<br/>3. Re-fetch API / switch dictionary"]
    Q3 -- 'en' --> SwitchES["1. Set state to 'es'<br/>2. Update localStorage to 'es'<br/>3. Re-fetch API / switch dictionary"]
    
    SwitchEN --> Ready
    SwitchES --> Ready

    classDef condition fill:#1e293b,stroke:#6366f1,stroke-width:2px,color:#f8fafc;
    classDef node fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;
    classDef action fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#dcfce7;

    class Q1,Q2,Q3 condition;
    class Act_Stored,Act_AutoEN,Act_DefaultES,Fetch,Ready node;
    class SwitchEN,SwitchES action;
```

---

## 4. Decision Logic 3: Client Data Fetching, Network Status & Offline Fallback (RF-10, RF-11)

### 4.1 Context and Rules
To guarantee 100% uptime and resilience against server down-time or network interruptions, the client implements a **Fallback Strategy** in `frontend/src/services/api.js`. If the backend API cannot be reached or returns an error, the application seamlessly consumes bundled, verified seed data (`FALLBACK_DATA`).

### 4.2 Decision Table: Data Fetching and Fault Tolerance

| Element | Condition / Action | R1 | R2 | R3 | R4 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Condition Stubs** | HTTP Response Code | 200 OK | 4xx / 5xx | Timeout / Error | Network Offline |
| | JSON Payload Valid & Non-Empty | Y | - | - | - |
| | Fallback Seed Data (`FALLBACK_DATA`) available | - | Y | Y | Y |
| **Action Stubs** | Parse and hydrate state with remote API payload | X | - | - | - |
| | Set `isBackendAvailable = true` | X | - | - | - |
| | Log warning to browser console | - | X | X | X |
| | Inject `FALLBACK_DATA` matching active `lang` | - | X | X | X |
| | Set `isBackendAvailable = false` | - | X | X | X |
| | Render portfolio seamlessly without UI break or white screen | X | X | X | X |

### 4.3 Decision Tree: API Request & Fallback Pipeline

```mermaid
flowchart TD
    StartReq(["Trigger Data Load: fetchPortfolioData(lang)"]) --> NetCheck{"Browser online<br/>(navigator.onLine)?"}
    
    NetCheck -- No (Offline) --> FallbackOffline["1. Warn: 'Client offline, engaging fallback'<br/>2. Load FALLBACK_DATA[lang]<br/>3. Return data with isBackend = false"]
    NetCheck -- Yes --> HttpReq["Execute HTTP GET /api/portfolio?lang={lang}<br/>with timeout = 5000ms"]
    
    HttpReq --> StatusCheck{"HTTP Status Code?"}
    
    StatusCheck -- 200 OK --> ValidCheck{"Valid JSON payload<br/>with all entities?"}
    StatusCheck -- 4xx / 5xx Server Error --> FallbackErr["1. Warn: 'Backend error, engaging fallback'<br/>2. Load FALLBACK_DATA[lang]<br/>3. Return data with isBackend = false"]
    StatusCheck -- Timeout / Network Failure --> FallbackTimeout["1. Warn: 'Connection timeout, engaging fallback'<br/>2. Load FALLBACK_DATA[lang]<br/>3. Return data with isBackend = false"]
    
    ValidCheck -- Yes --> HydrateAPI["1. Set isBackend = true<br/>2. Distribute API data to Context Providers"]
    ValidCheck -- No / Malformed --> FallbackErr
    
    FallbackOffline --> RenderUI["Render UI seamlessly for visitor"]
    FallbackErr --> RenderUI
    FallbackTimeout --> RenderUI
    HydrateAPI --> RenderUI

    classDef condition fill:#1e293b,stroke:#6366f1,stroke-width:2px,color:#f8fafc;
    classDef success fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#dcfce7;
    classDef fallback fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fef3c7;
    classDef finish fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;

    class NetCheck,StatusCheck,ValidCheck condition;
    class HydrateAPI success;
    class FallbackOffline,FallbackErr,FallbackTimeout fallback;
    class RenderUI,HttpReq finish;
```

---

## 5. Decision Logic 4: Publication Filtering, Search & Citation Export (RF-07, RF-08)

### 5.1 Context and Rules
The scientific publication explorer allows visitors to filter items by academic genre (`all`, `journal`, `conference`, `thesis`, `workshop`) and apply real-time text matching across title, authors, and venue. Users can also copy formatted citations to the system clipboard with instant UI visual feedback.

### 5.2 Decision Table: Publication Card Filtering & Citation Action

| Element | Condition / Action | R1 | R2 | R3 | R4 | R5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Condition Stubs** | Selected Category Filter | `'all'` | Specific Type | Specific Type | - | - |
| | Publication Type matches Selected Category | - | Y | N | - | - |
| | Search Query Input (`query.trim()`) | Empty | Matches Title/Author/Venue | No Match | - | - |
| | User clicks "Copy Citation" button | N | N | N | Y | Y |
| | Clipboard API supported (`navigator.clipboard`) | - | - | - | Y | N |
| **Action Stubs** | Render Publication Card in List | X | X | - | - | - |
| | Exclude Publication Card from Rendered List | - | - | X | - | - |
| | Copy `publication.citation` via `writeText()` | - | - | - | X | - |
| | Fallback: Copy via legacy `document.execCommand('copy')` | - | - | - | - | X |
| | Trigger 2-second visual confirmation ("Copied!" + Check Icon) | - | - | - | X | X |

### 5.3 Decision Tree: Publication Filtering and Citation Interaction

```mermaid
flowchart TD
    StartPub(["Render Publications List"]) --> FilterCat{"Selected Category Filter?"}
    
    FilterCat -- "'all'" --> SearchCheck{"Search query entered?"}
    FilterCat -- Specific type ('journal', 'conf', etc.) --> MatchType{"Does item.pub_type<br/>match selected filter?"}
    
    MatchType -- No --> ExcludeItem["Hide publication card"]
    MatchType -- Yes --> SearchCheck
    
    SearchCheck -- Empty / Whitespace --> RenderCard["Render publication card"]
    SearchCheck -- Text query provided --> MatchQuery{"Does query match (case-insensitive):<br/>- title OR<br/>- authors OR<br/>- venue?"}
    
    MatchQuery -- Yes --> RenderCard
    MatchQuery -- No --> ExcludeItem
    
    RenderCard --> CopyAction(["User clicks 'Copy Citation' button"])
    CopyAction --> ClipCheck{"navigator.clipboard<br/>available?"}
    
    ClipCheck -- Yes --> ModernCopy["navigator.clipboard.writeText(citation)"]
    ClipCheck -- No --> LegacyCopy["Legacy textarea + document.execCommand('copy')"]
    
    ModernCopy --> ShowToast["Show 'Copied!' badge + checkmark icon for 2000ms"]
    LegacyCopy --> ShowToast

    classDef condition fill:#1e293b,stroke:#6366f1,stroke-width:2px,color:#f8fafc;
    classDef render fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#dcfce7;
    classDef hide fill:#7f1d1d,stroke:#ef4444,stroke-width:2px,color:#fee2e2;
    classDef action fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;

    class FilterCat,MatchType,SearchCheck,MatchQuery,ClipCheck condition;
    class RenderCard,ShowToast render;
    class ExcludeItem hide;
    class ModernCopy,LegacyCopy action;
```

---

## 6. Decision Logic 5: Academic Degree Verification & Credential Dispatch (RF-05, RN-03)

### 6.1 Context and Rules
Per **RF-05** and **RN-03**, academic credentials must be backed by verifiable official electronic links. Depending on whether the credential is a doctoral dissertation or a master's degree from UNIR Mexico, the system routes users to the corresponding official validator (Institutional Repository vs. Mexican government CSV portal).

### 6.2 Decision Table: Degree Verification Dispatch

| Element | Condition / Action | R1 | R2 | R3 |
| :--- | :--- | :---: | :---: | :---: |
| **Condition Stubs** | Degree Category | Doctorate (Ph.D.) | Master's Degree (M.Sc.) | Undergraduate / Engineering |
| | Electronic Verification URL Present (`verification_url != null`) | Y | Y | N |
| | Verification Type | UAI Institutional Repository | Verifirma UNIR (CSV Code) | None |
| **Action Stubs** | Render "Verify Credential" Action Button | X | X | - |
| | Route to Official Repository (`https://repositorio.uai.edu.ar/...`) | X | - | - |
| | Route to Verifirma CSV Platform (`https://verifirma.unir.net/...`) | - | X | - |
| | Apply Security Attributes (`target="_blank" rel="noopener noreferrer"`) | X | X | - |
| | Display Degree Information without external link button | - | - | X |

### 6.3 Decision Tree: Degree Verification Button Routing

```mermaid
flowchart TD
    DegreeCard(["Evaluate Degree Record"]) --> CheckURL{"Does verification_url exist<br/>and is not empty?"}
    
    CheckURL -- No --> NoVerify["Render degree details without external verification button"]
    CheckURL -- Yes --> CheckType{"What is the target platform?"}
    
    CheckType -- UAI Repository --> RouteRepo["1. Display 'Verificar Tesis / Repositorio UAI' button<br/>2. Set href = verification_url<br/>3. Set target='_blank' rel='noopener noreferrer'"]
    CheckType -- Verifirma UNIR CSV --> RouteCSV["1. Display 'Verificar Título Oficial (CSV)' button<br/>2. Set href = verification_url with cryptographic token<br/>3. Set target='_blank' rel='noopener noreferrer'"]
    
    RouteRepo --> UserClick(["User clicks button: Opens in secure isolated tab"])
    RouteCSV --> UserClick

    classDef condition fill:#1e293b,stroke:#6366f1,stroke-width:2px,color:#f8fafc;
    classDef action fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#dcfce7;
    classDef neutral fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#e2e8f0;

    class CheckURL,CheckType condition;
    class RouteRepo,RouteCSV action;
    class NoVerify neutral;
```

---

## 7. Traceability Matrix: Decision Logic vs Architecture Components

| Decision Logic | Covered Requirements | Business Rules | Frontend Implementation | Backend Implementation | Data Store |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DL-1: Contact Form** | RF-09, RNF-05 | RN-02, RN-05 | `Contact.jsx` (Syntactic validation & submit lock) | `api_routes.py`, `SendContactMessageUseCase`, `SQLiteContactRepo` | `D6: contact_messages` |
| **DL-2: Internationalization** | RF-01, RF-02, RF-10 | RN-01 | `LanguageContext.jsx`, `Navbar.jsx` | `api_routes.py` (`?lang=es\|en`), all `Get*UseCase(lang)` | `D7: localStorage`, SQLite `_es`/`_en` columns |
| **DL-3: Fallback Strategy** | RF-10, RF-11, RNF-01 | RN-01 | `services/api.js` (`FALLBACK_DATA`), `usePortfolioData.js` | Flask REST API endpoints | `D8: FALLBACK_DATA` (In-memory seed) |
| **DL-4: Publication Filtering** | RF-07, RF-08 | RN-01 | `Publications.jsx` (Filter tabs, search bar, Clipboard API) | `GetPublicationsUseCase` | `D4: publications` |
| **DL-5: Degree Verification** | RF-05 | RN-03 | `Education.jsx` (Verification action buttons) | `GetEducationsUseCase` | `D3: educations` (`verification_url`) |
