<p align="center">
  <picture>
    <img src="https://capsule-render.vercel.app/api?type=waving&color=05893E&height=220&section=header&text=BazarDor%20(%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0%20%E0%A6%A6%E0%A6%B0)&fontSize=48&fontColor=ffffff&fontAlignY=38&desc=Real-Time%20Daily%20Commodity%20Market%20Price%20Tracker&descFontSize=18&descAlignY=62&descAlign=50" alt="BazarDor Banner" />
  </picture>
</p>

<p align="center">
  <a href="https://readme-typing-svg.demolab.com">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1200&color=05893E&center=true&vCenter=true&multiline=false&width=650&height=50&lines=Track+Essential+Commodity+Prices+Accurately;Live+Market+Updates+%26+Daily+Fluctuations;Resilient+Dual-API+Failover+Architecture;Powered+by+Next.js+16%2C+React+19+%26+Better+Auth" alt="Typing Header" />
  </a>
</p>

<p align="center">
  <!-- Framework & Runtime -->
  <img src="https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <br/>
  <!-- Auth, DB, Status -->
  <img src="https://img.shields.io/badge/Better_Auth-0F172A?style=for-the-badge&logo=auth0&logoColor=FF4F00" alt="Better Auth" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Dual_API-Fault_Tolerant-05893E?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Dual-API Resilient" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
</p>

---

## 📌 Table of Contents
- [📖 Project Overview](#-project-overview)
- [🌟 5 Key Features](#-5-key-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🏗️ System Architecture & Data Flow](#️-system-architecture--data-flow)
- [🔐 Environment Configuration (.env.example)](#-environment-configuration-envexample)
- [🚀 Getting Started & Local Setup](#-getting-started--local-setup)
- [📁 Project Directory Structure](#-project-directory-structure)
- [📄 License](#-license)

---

## 📖 Project Overview

> **বাজার দর (BazarDor)** is a modern, high-performance, and resilient daily commodity price monitoring platform. It is engineered to provide citizens with accurate, real-time prices for essential groceries and commodities across various local markets.

The application adheres to a strict **zero-hardcoding principle**—all commodity rates, category definitions, and market statistics are fetched dynamically from live Cloudflare Workers microservices. If the primary API encounters network failures or rate limits, the system seamlessly and instantaneously fails over to an alternative secondary backup API with zero user disruption. The user interface features native Bengali localization, localized typography, and standard Bengali numerical formatting.

---

## 🌟 5 Key Features

### 1. 🔄 Resilient Dual-API Automatic Failover Architecture
- **Zero-Downtime Data Pipeline:** The client communicates through a unified API client wrapper. If the primary service (`BASE_URL_1`) fails or returns a non-200 status code, the request automatically falls back to the secondary mirror (`BASE_URL_2`).
- **Zero Hardcoding:** No prices, product listings, or categories are hardcoded. Every single data point is served live from the cloud APIs.

### 2. 📈 Infinite Live Price Ticker Marquee
- Positioned immediately beneath the navigation header, an infinite animated marquee ticker continuously streams current market rates.
- Displays the commodity emoji, name, live rate per unit, and percentage change indicator badges (`▲ Increase`, `▼ Decrease`, or `— Unchanged`).

### 3. 🗂️ Smart Category Filtering with Numeric Sorting
- Seamless categorization covering staple commodities: Rice, Lentils, Oil, Vegetables, Fish, Meat, Eggs & Milk, and Spices.
- **Accurate Mathematical Sorting:** Features sort modes (`Default`, `Price: Low to High`, and `Price: High to Low`) that parse Bengali numerical strings into numerical floats to guarantee accurate ascending and descending sorting orders.

### 4. 🛡️ Protected Product Analytics & Market Price Comparison Table
- **Guarded Route (`/product/[slug]`):** Requires active user session. Unauthenticated visitors are notified via interactive toast alerts and redirected to the login page with return-path retention.
- **Multi-Market Comparison:** Shows today's price, yesterday's price, minimum, maximum, and average benchmark rates alongside a comparative breakdown of key metropolitan markets (Karwan Bazar, Mirpur Green Market, Mohammadpur Krishi Market, etc.).

### 5. 🔐 Next-Gen Authentication with Live Profile Management
- **Better Auth Integration:** Offers robust email/password credentials and instant OAuth sign-in with Google and GitHub, backed by MongoDB Atlas.
- **Dynamic Profile Updates:** Users can inspect their account credentials on `/profile` and update their display name in real time on `/profile/edit` through the native Better Auth `updateUser` API.

---

## 🛠️ Technologies Used

| Category | Technology | Badge & Logo | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16** (App Router) | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) | Server-side rendering, routing, and Turbopack bundler |
| **UI Library** | **React 19** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | Declarative UI state management and component hooks |
| **Language** | **TypeScript** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Strict compile-time safety and interface contracts |
| **Styling** | **Tailwind CSS v4** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Custom design system tokens and responsive layouts |
| **Authentication** | **Better Auth** | ![Better Auth](https://img.shields.io/badge/Better_Auth-0F172A?style=flat-square&logo=auth0&logoColor=white) | Modern session engine, credential auth & OAuth providers |
| **Database** | **MongoDB Atlas** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Cloud database for user accounts, sessions & verifications |
| **Icons** | **Lucide React** | ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square&logo=feather&logoColor=white) | Crisp, lightweight icons |
| **Notifications** | **React Hot Toast** | ![Toast](https://img.shields.io/badge/Hot_Toast-FFA500?style=flat-square&logo=target&logoColor=white) | Interactive toast alerts for auth states and protected routes |

---

## 🏗️ System Architecture & Data Flow

```mermaid
graph TD
    Client["🌐 Client Browser (Responsive UI)"] --> NextRouter["⚡ Next.js 16 App Router"]
    
    subgraph Resilient_Data_Pipeline ["📡 Resilient Data Layer"]
        NextRouter --> APIService["lib/api.ts (Failover Client)"]
        APIService -->|1. Primary Fetch| API1["🟢 Primary API (Worker 1)"]
        API1 -.->|2. On Error / Timeout| API2["🟠 Secondary Failover API (Worker 2)"]
    end

    subgraph Auth_Security_Pipeline ["🔐 Authentication & Storage"]
        NextRouter --> AuthHandler["api/auth/[...all] (Better Auth)"]
        AuthHandler --> MongoAdapter["🍃 MongoDB Atlas Adapter"]
    end
```

---

## 🔐 Environment Configuration (.env.example)

Create a `.env` file in the root directory of your project based on the template below:

```env
# ==========================================
# 🛒 বাজার দর (BazarDor) - Environment Config
# ==========================================

# 🔐 Better Auth Configuration
# Generate a secure 32+ character key: `openssl rand -base64 32`
BETTER_AUTH_SECRET=your_super_secret_32_character_key_here
BETTER_AUTH_URL=http://localhost:3000

# 🍃 MongoDB Connection URL
# Replace with your MongoDB Atlas connection string
MONGO_DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bazardor?retryWrites=true&w=majority

# 🌐 Commodity API Endpoints (Resilient Dual-API Architecture)
# Primary API endpoint
NEXT_PUBLIC_API_BASE_URL_1=https://api.api-store.workers.dev/api/bazardor
# Secondary failover API endpoint
NEXT_PUBLIC_API_BASE_URL_2=https://api.abcz.workers.dev/api/bazardor

# 🔑 OAuth Social Providers (Google & GitHub)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> [!TIP]
> A ready-to-use template file [`.env.example`](file:///.env.example) is already included in the repository root. You can create your environment file by running `cp .env.example .env`.

---

## 🚀 Getting Started & Local Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/mdsiam2007/bazardor.git
cd bazardor
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
```bash
cp .env.example .env
# Open .env and fill in your MongoDB and Better Auth secrets
```

### Step 4: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application.

---

## 📁 Project Directory Structure

```plaintext
bazardor/
├── .env.example                    # Sample environment variables configuration
├── package.json                    # Project dependencies and npm scripts
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/      # Better Auth route handlers
│   │   ├── category/[slug]/        # Category browse page & numeric sorting
│   │   ├── product/[slug]/         # Protected product details & market price table
│   │   ├── profile/                # User profile overview
│   │   │   └── edit/               # Live profile update page (updateUser API)
│   │   ├── signin/                 # Sign-in page with social providers
│   │   ├── signup/                 # Registration page
│   │   ├── not-found.tsx           # Custom 404 error page with Home link
│   │   ├── globals.css             # Theme design tokens & Hind Siliguri typography
│   │   ├── layout.tsx              # Root application layout & Toaster provider
│   │   └── page.tsx                # Home page (Top Risers, Fallers & All Products)
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar with Bangla date & auth status
│   │   ├── PriceTicker.tsx         # Infinite scrolling live marquee ticker
│   │   ├── HeroBanner.tsx          # Hero banner with smooth scroll CTA
│   │   ├── ProductCard.tsx         # Product card with price trend badge
│   │   ├── ProductCardSkeleton.tsx # Loading skeleton placeholders
│   │   └── Footer.tsx              # Application footer
│   └── lib/
│       ├── api.ts                  # Resilient Dual-API failover service
│       ├── auth.ts                 # Better Auth server configuration
│       ├── auth-client.ts          # Better Auth client React hooks
│       ├── bengali.ts              # Bengali numeral & date formatting utilities
│       └── mongodb.ts              # MongoDB Atlas singleton client connection
└── README.md                       # Main project documentation
```

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=05893E&height=100&section=footer" alt="Footer Wave" width="100%" />
</p>

## 📄 License

This project is licensed under the [MIT License](LICENSE). All rights reserved © **বাজার দর (BazarDor)**.
