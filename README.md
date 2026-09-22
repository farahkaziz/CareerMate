# CareerMate — Career & Skill Assistant

CareerMate is a personal Full-Stack project designed to help students and young graduates explore career paths, understand the skills required for different jobs, and discover relevant opportunities.

The project was created as a hands-on learning experience to understand how a complete web application works, from the frontend and backend to databases and external APIs.

---

## 🎯 Project Goal

Choosing a career path can be difficult for students, especially when they do not know:

* What skills are required for a specific career
* Which skills they already have
* Which skills they need to improve
* What job opportunities are available
* How their current profile matches a career

CareerMate aims to provide a simple platform that connects **careers, skills, and job opportunities** in one place.

---

## 💡 Main Idea

The application follows this general process:

```text
User
 ↓
Career / Skill Exploration
 ↓
Required Skills
 ↓
User Skills
 ↓
Skill Gap
 ↓
Job Opportunities
```

For example, a student can search:

> "What skills are required for a Software Developer?"

CareerMate can provide the relevant skills associated with that career.

---

# 🏗️ Current Project Architecture

CareerMate is developed progressively.

The current architecture is based on:

```text
React Frontend
       ↓
REST API
       ↓
Node.js + Express
       ↓
PostgreSQL
       ↓
External APIs
   ├── ESCO
   └── Adzuna
```

---

# 🛠️ Technologies

## Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

## Backend

* Node.js
* Express.js
* REST API

## Database

* PostgreSQL

## External APIs

* ESCO API — career and skills information
* Adzuna API — job opportunities

## Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* PostgreSQL / pgAdmin

---

# 📂 Project Structure

## Backend

```text
careermate-backend/
│
├── src/
│   ├── server.js
│   ├── db.js
│   │
│   └── routes/
│       ├── careers.js
│       └── skills.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── .env
├── .env.example
├── package.json
└── README.md
```

The frontend is developed separately using React and Vite.

---

# 🗄️ Database

CareerMate currently uses PostgreSQL.

The main database structure contains three core tables:

```text
careers
   │
   │
   ▼
career_skills
   ▲
   │
   │
skills
```

### Careers

Stores information about professional careers.

### Skills

Stores technical and professional skills.

### Career Skills

Associates careers with their required skills.

This creates a many-to-many relationship:

```text
Career  ←→  Skills
```

For example:

```text
Software Developer
       │
       ├── JavaScript
       ├── Git
       ├── SQL
       ├── REST APIs
       └── Problem Solving
```

---

# 🔌 REST API

The backend exposes REST API endpoints used by the frontend.

### Careers

```http
GET /api/careers
```

Returns available careers.

Example:

```http
GET /api/careers/1
```

Returns information about a specific career.

---

### Skills

```http
GET /api/skills
```

Returns available skills.

---

# 🌍 External API Integration

CareerMate also explores the integration of external data sources.

## ESCO

ESCO is used to retrieve information related to:

* Occupations
* Skills
* Career-related information

This allows CareerMate to work with a larger and more realistic source of career information.

---

## Adzuna

Adzuna is used to retrieve real job opportunities.

The integration allows the application to search for jobs based on information such as:

* Job title
* Location
* Keywords

General flow:

```text
CareerMate
    ↓
Adzuna API
    ↓
Job Search
    ↓
Job Results
```

The API credentials are stored in environment variables and are not included in the repository.

---

# 🤖 CareerMate Chatbot

One of the goals of CareerMate is to provide a career-oriented assistant.

Example questions:

```text
What skills are required for a Software Developer?

What skills do I need to become a Data Analyst?

What jobs are available for a Java Developer?

Which skills should I improve for this career?
```

The chatbot is designed around the application's career and skills data rather than being only a general-purpose chatbot.

---

# 📊 Skill Gap Analysis

A major feature planned for CareerMate is Skill Gap Analysis.

The idea is to compare:

```text
User Skills
      ↓
Required Career Skills
      ↓
Comparison
      ↓
Skill Gap
```

For example:

```text
Career: Software Developer

Required:
✓ JavaScript
✓ SQL
✓ Git
✗ Docker
✗ Testing
```

The system can then identify the skills that the user may need to develop.

---

# 💼 Job Opportunities

CareerMate can connect career exploration with real job opportunities.

Example:

```text
Selected Career
      ↓
Related Keywords
      ↓
Adzuna API
      ↓
Available Jobs
```

This allows users to move from:

**"What career should I explore?"**

to:

**"What skills do I need?"**

and finally:

**"What opportunities are available?"**

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/careermate.git
```

---

## 2. Backend setup

Navigate to the backend:

```bash
cd careermate-backend
```

Install dependencies:

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5433
DB_NAME=careermate
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD

ADZUNA_APP_ID=YOUR_APP_ID
ADZUNA_APP_KEY=YOUR_APP_KEY
```

Do not commit the `.env` file to GitHub.

---

# 🗃️ Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE careermate;
```

Then execute:

```text
database/schema.sql
```

followed by:

```text
database/seed.sql
```

The schema creates the required tables and the seed file inserts the initial career and skills data.

---

# ▶️ Run the Backend

Start the development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

You can test the API with:

```text
http://localhost:5000/api/careers
```

and:

```text
http://localhost:5000/api/skills
```

---

# ▶️ Run the Frontend

Navigate to the React frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL.

---

# 🔄 Development Roadmap

CareerMate is developed progressively rather than as a single large application.

## Level 1 — Foundation

* Project setup
* React basics
* Node.js basics
* Express
* REST APIs
* PostgreSQL
* Database relationships

## Level 2 — Full-Stack Application

* Career database
* Skills database
* Career/skill relationships
* React frontend
* Backend API
* Career exploration
* Basic chatbot
* External API integration
* Job search with Adzuna

## Level 3 — AI Features

Future AI-oriented features can include:

* CV analysis
* Skill extraction
* Intelligent skill gap analysis
* Career recommendations
* Job matching
* Personalized learning suggestions
* NLP-based career assistant

The goal is to progressively introduce AI without rebuilding the entire application architecture.

---

# 🧠 Learning Objectives

CareerMate is primarily a learning project.

Through this project, I am practicing:

### Frontend

* React component architecture
* API integration
* State management
* Forms
* User interfaces

### Backend

* Node.js
* Express
* REST API design
* Routing
* Environment variables
* Error handling

### Database

* PostgreSQL
* SQL
* Relationships
* Database schema design
* Queries

### APIs

* Consuming external APIs
* API authentication
* Handling API responses
* Connecting external data to a Full-Stack application

### AI / Machine Learning

The project will progressively introduce:

* Natural Language Processing
* Text extraction
* Classification
* Semantic matching
* AI-assisted career analysis

---

# 🔐 Security

Sensitive information should never be stored directly in the source code.

API keys and database credentials are stored in:

```text
.env
```

The `.env` file must be added to `.gitignore`.

Example:

```text
.env
node_modules/
```

---

# 📌 Current Status

CareerMate is currently under active development.

### Implemented / explored

* React frontend
* Node.js + Express backend
* PostgreSQL database
* Careers table
* Skills table
* Career-skill relationships
* REST API
* ESCO integration
* Adzuna integration
* Job search experimentation
* Career-oriented chatbot concept

### In progress

* Complete frontend integration
* Career exploration interface
* Skill Gap Analyzer
* Job search interface
* Better chatbot interaction

### Future

* CV upload and analysis
* Skill extraction
* AI-powered matching
* Personalized career recommendations
* Learning roadmap
* Advanced AI assistant

---

# 📚 Project Philosophy

CareerMate is not only about building an application.

The project is designed as a progressive learning journey:

```text
Learn
  ↓
Build
  ↓
Understand
  ↓
Improve
  ↓
Integrate AI
```

Instead of starting directly with AI, the project first builds a strong understanding of:

**Frontend → Backend → Database → APIs → AI**

This approach makes it possible to understand how AI features can be integrated into a real software application.

---

# 👩‍💻 Author

**Farah Kaziz**

Third-Year Software Engineering Student

Tunisia

---

# 📄 License

This project is developed for educational and personal learning purposes.
