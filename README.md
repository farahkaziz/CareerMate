# CareerMate — Backend (Niveau 2)

Backend Node.js + Express + PostgreSQL متاع مشروع CareerMate.

## 1) Prérequis

- Node.js (v18+ يفضل)
- PostgreSQL installé ويخدم localement

## 2) Installation

```bash
cd careermate-backend
npm install
```

## 3) Configuration database

Créer الـdatabase في PostgreSQL:

```bash
psql -U postgres
CREATE DATABASE careermate;
\q
```

Puis exécuter le schema et les seed data:

```bash
psql -U postgres -d careermate -f database/schema.sql
psql -U postgres -d careermate -f database/seed.sql
```

## 4) Configuration .env

```bash
cp .env.example .env
```

Puis edit `.env` بالـpassword متاعك متاع PostgreSQL.

## 5) Lancer le serveur

```bash
npm run dev
```

Le serveur يخدم على: `http://localhost:5000`

## 6) Tester les endpoints

### Toutes les carrières
```
GET http://localhost:5000/api/careers
```

### Recherche
```
GET http://localhost:5000/api/careers/search?q=developer
```

### Détails d'une carrière (avec ses skills)
```
GET http://localhost:5000/api/careers/1
```

### Skill gap (comparer skills user vs career)
```
GET http://localhost:5000/api/careers/3/skill-gap?userId=1
```
(userId=1 هو الـ"Test User" اللي تعمل في seed.sql، career id=3 هو "Frontend Developer")

### Liste des skills
```
GET http://localhost:5000/api/skills
```

### Skills d'un user
```
GET http://localhost:5000/api/skills/user/1
```

### Mettre à jour skills d'un user
```
POST http://localhost:5000/api/skills/user/1
Content-Type: application/json

{ "skillIds": [1, 2, 3, 4, 5] }
```

Tu peux tester avec **Postman**, **Insomnia**, ou `curl` directement.

## REST API

Endpoints (base URL: http://localhost:5000)

- GET /api/careers — list all careers
- GET /api/careers/:id — get career details including associated skills
- GET /api/skills — list all skills
- GET /api/skills/:id — get skill details including related careers

Note: PostgreSQL for this project is configured to run on port 5433 in the development environment. Ensure your `.env` uses DB_PORT=5433.

## 7) Structure du projet

```
careermate-backend/
├── database/
│   ├── schema.sql       -> structure des tables
│   └── seed.sql         -> données de test
├── src/
│   ├── controllers/
│   │   └── careerController.js
│   ├── routes/
│   │   ├── careers.js
│   │   └── skills.js
│   ├── db.js            -> connexion PostgreSQL
│   └── server.js        -> point d'entrée Express
├── .env.example
├── .gitignore
└── package.json
```

## Prochaine étape

Une fois que ce backend خدّام و tu as testé les endpoints avec Postman,
on passe à la création du **Frontend React** qui va consommer cette API.
