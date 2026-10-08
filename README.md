# <img src="https://raw.githubusercontent.com/Lumina-Web-Solutions/IEDC-GPC_PALA/664f881c932e5b75a054d11081b5861dc78ff2c4/public/LogoN.png" alt="IEDC GPC Pala Logo" height="45" style="vertical-align: middle;" /> IEDC GPC Pala - Official Web Portal

A dynamic, full-stack web application built for the Innovation and Entrepreneurship Development Centre at Government Polytechnic College, Pala. This platform features a modern, animated public landing page and a bespoke, secure Admin Dashboard for real-time content management.

**Designed & Developed by**<br>
<a href="https://www.luminaweb.online" target="_blank">
  <img src="https://www.luminaweb.online/assets/NLogo.png" alt="Lumina Web Solutions" width="250" />
</a>

## 🚀 Live Demo
[![Live Demo](https://img.shields.io/badge/View_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://iedc-gpc-pala.vercel.app/)

## 🛠 Tech Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Animations:** Framer Motion
* **Database:** PostgreSQL (hosted on NeonDB)
* **Authentication:** Firebase Auth
* **Image Hosting:** GitHub REST API (Custom Serverless Solution)
* **Deployment:** Vercel

## ✨ Key Features

### Public Portal
* **Fully Responsive Design:** Optimized for desktop, tablet, and mobile devices.
* **Dynamic Sections:** Real-time fetching of Events, Team members, Announcements, Achievements, and Gallery.
* **Premium Animations:** Staggered fade-ins and scroll-triggered animations using Framer Motion.
* **Interactive Contact Form:** Submissions are saved directly to the database and viewable in the admin inbox.
* **Custom Routing:** Branded 404 error page with animated entry.

### Secure Admin Dashboard
* **Protected Routes:** Enterprise-grade security via Firebase Auth. Unauthenticated users are redirected to `/admin/login`.
* **Complete CMS:** Full CRUD (Create, Read, Update, Delete) capabilities for all website sections.
* **Serverless Image Uploads:** Custom API routes push images directly to a GitHub repository using the GitHub API, serving them instantly via raw links to bypass Vercel's read-only file system constraints.
* **Admin Inbox:** Integrated messaging dashboard to read and manage public contact submissions.

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
