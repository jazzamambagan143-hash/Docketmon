# RTC Sipalay DocketPro 🏛️📌

Professional Court Case Management & Staff Monitoring System developed exclusively for **Regional Trial Court (RTC) Branch 77, Sipalay City**. 

## 📖 Overview
RTC Sipalay DocketPro is a comprehensive, responsive system designed to digitize court dockets, monitor staff activities, and automate court document proformas. Built with modern web technologies, it runs seamlessly on desktop web browsers, as a standalone native Desktop app (Electron), and natively on Android devices.

## ✨ Key Features
- **📅 Dynamic Court Calendar & Scheduling:** Manage case hearings with a responsive, synchronized 7x6 calendar grid interface.
- **📑 Proforma Document Generator:** Automatically generate legally formatted court documents (like PSIR Orders). Features precise typography (Bookman Old Style) and handles dynamic data fields, allowing seamless export to Microsoft Word.
- **👥 Staff Monitoring Dashboard:** A synchronized panel to monitor branch personnel, tracking daily staff assignments and court duties in real-time.
- **📱 Cross-Platform Support:** Fully responsive UI featuring synchronized light/dark mode systems, ensuring legibility across Web, Windows Desktop, and Android.
- **🔒 Secure Data Storage:** Leverages Firebase to handle case logs reliably, ensuring data integrity across the branch's local and cloud network.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ESModules)
- **Build Tool:** Vite
- **Backend/Database:** Firebase (v10)
- **Mobile Capabilities:** Capacitor.js (Android)
- **Desktop Framework:** Electron

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository (or copy the files):
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   ```
2. Navigate to the project directory:
   ```bash
   cd "RTC Project"
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Web Version
To start testing the web app locally with live-reloading:
```bash
npm run dev
```
Then open `http://localhost:5173/` in your browser!

### Building for Desktop 🖥️
To run the Windows Desktop Electron version:
```bash
npm run desktop
```

### Building for Android 📱
To compile the Capacitor Android project:
```bash
npx cap sync android
npx cap open android
```

## 💡 About
This system is an integral modernization initiative aimed at solving physical file redundancies, tracking inefficiencies, and communication latency through centralized digital court dockets. System architecture and defense models are documented within project's HTML reference guides.
