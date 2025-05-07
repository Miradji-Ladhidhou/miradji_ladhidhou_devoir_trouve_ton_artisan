# Trouve Ton Artisan

# Contexte du projet #

La région Auvergne Rhône Alpes souhaite promouvoir l’artisanat local en facilitant la mise en relation entre particuliers et artisans via une plateforme web simple, accessible et moderne. Ce projet vise à répondre à ce besoin en mettant à disposition un site avec une navigation fluide, un design responsive (mobile first) et conforme à la norme WCAG 2.1.

---

# Prérequis #

# Maquette
- Figma

# Frontend
- ReactJS,
- Bootstrap,
- Sass.

# Api 
- Node.js
- MySQL (ou MariaDB)
- Express (avec sequelize pour l’accès à la base de données)

# Versionning
- Git 
- Github

---

# Installation #

# 1. Cloner le dépôt

```bash
git clone https://github.com/Miradji-Ladhidhou/miradji_ladhidhou_devoir_trouve_ton_artisan.git
cd trouve-ton-artisan
```

## 2. Installer les dépendances

```bash
cd api => installer les dépendances 
    "body-parser"
    "cors":
    "dotenv":
    "express":
    "express-rate-limit":
    "helmet":
    "mysql2": 
    "sequelize":

cd frontend => installer les dépendances 
     "axios":
    "bootstrap":
    "react":
    "react-bootstrap":
    "react-dom":
    "react-helmet-async": 
    "react-icons":
    "react-router-dom":
    "react-scripts":
    "saas":
    "sass":
    "web-vitals":
```

# 3. Lancer le serveur frontend (React)

```bash
cd frontend 
npm start 
```

# 4. Lancer le backend (API Node.js + Express)

```bash
cd api
npm install
npm start
```
