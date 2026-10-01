# zȧm zȧm HOTEL – KALIGANJ

Official modern web application for **zȧm zȧm HOTEL** located in Kaliganj, Katihar, Bihar.

- **Director**: Mohammad Waseem
- **Mobile / WhatsApp**: 
- **Address**: Village – Kaliganj, P.O. – Mahuar, P.S. – Manihari, District – Katihar, Bihar – 854116
- **Tagline**: Hot & Fresh • Delicious • Generous Quantity

---

## 🚀 Quick Start (Local Run)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel (Step-by-Step)

This application is built with Vite + React + Tailwind CSS and already includes `vercel.json` configured for single-page routing. It is 100% compatible with Vercel.

### Method 1: Deploy via GitHub (Recommended)

1. **Create a new Repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `zam-zam-hotel-kaliganj`
   - Keep it **Public** (or Private)
   - Do **NOT** initialize with README or .gitignore (we already have them)
   - Click **Create repository**

2. **Push this code to GitHub:**
   Run these commands in your project terminal:
   ```bash
   git add .
   git commit -m "Initial commit for zȧm zȧm HOTEL website"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/zam-zam-hotel-kaliganj.git
   git push -u origin main
   ```
   *(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username)*

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in (or sign up with your GitHub account).
   - Click **"Add New..."** > **"Project"**.
   - Under **"Import Git Repository"**, select `zam-zam-hotel-kaliganj`.
   - Vercel will automatically detect:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **"Deploy"**.
   - In less than 1 minute, your live website will be available at:
     `https://zam-zam-hotel-kaliganj.vercel.app` (or your custom domain).

---

### Method 2: Deploy directly via Vercel CLI (No GitHub required)

If you don't want to use GitHub right now, you can deploy directly from your computer terminal:

1. Run:
   ```bash
   npx vercel
   ```
2. Log in when prompted.
3. Accept the default settings:
   - *Set up and deploy?* **Y**
   - *Which scope?* (Select your account)
   - *Link to existing project?* **N**
   - *Project name?* `zam-zam-hotel-kaliganj`
   - *In which directory is your code located?* `./`
4. Deploy to production:
   ```bash
   npx vercel --prod
   ```

---

## 🛠 Features

- **Direct WhatsApp Ordering**: Interactive cart and menu buttons send formatted WhatsApp orders to `+91 9631343645`.
- **Instant Call Now Button**: Connects directly with hotel management.
- **Google Maps Navigation**: Live embedded map and 1-tap "Get Directions" button for Kaliganj / Manihari (854116).
- **Admin Panel**: Click **Admin** in the header or footer (Default PIN: `1234`) to edit menu prices, food photos, special offers, gallery, and hotel info in real time.
- **Mobile Sticky Bar**: Always-accessible bottom bar with Call Now & WhatsApp buttons.
- **Fast & Responsive**: Optimized lightweight assets with high-speed performance.
