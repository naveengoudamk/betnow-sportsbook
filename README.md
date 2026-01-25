# CricketBet - Live Cricket Betting Platform

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

**CricketBet** is a specialized cricket betting platform featuring real-time match scores, live odds, and in-play betting markets. Built with a stunning **Dark Glassmorphism** aesthetic, it delivers an immersive cricket betting experience for fans worldwide.

## 🚀 Key Features

*   **🏏 Live Cricket Scores**: Real-time match updates from CricketData API
*   **📊 Dynamic Odds**: Live betting odds that update every 5 seconds
*   **⚡ In-Play Betting**: Next ball predictions (Six, Four, Wicket, Dot Ball)
*   **� Ball-by-Ball Tracking**: Visual representation of current over with color-coded balls
*   **🎨 Glassmorphism UI**: Beautiful, translucent surfaces with neon accents (`#00ff88`, `#60efff`)
*   **🔄 Auto-Refresh**: Match data refreshes every 30 seconds
*   **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop viewing

## 🛠️ Technology Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: CSS Modules (Vanilla CSS with custom variables)
*   **State Management**: React Hooks
*   **Icons**: Native SVG & Emoji (for performance)

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/betnow.git
    cd betnow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Cricket API (Optional):**
    ```bash
    # Copy the example environment file
    cp .env.example .env.local
    ```
    
    Get a free API key from [CricketData.org](https://www.cricketdata.org/) and add it to `.env.local`:
    ```
    CRICKET_API_KEY=your_api_key_here
    ```
    
    *Note: The app will work with sample data if no API key is provided.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## 📁 Project Structure

```
betnow/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── globe.css        # Global styles & variables
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page (Sports Dashboard)
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx       # Main navigation
│   │   ├── Hero.tsx         # Landing page hero section
│   │   └── MatchCard.tsx    # Live sport match component
│   └── ...
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🔮 Future Roadmap

*   [x] **Live Cricket API**: Integrated CricketData API for real-time match data
*   [x] **In-Play Betting**: Next ball predictions with live odds
*   [ ] **User Authentication**: Complete phone/email authentication system
*   [ ] **Bet Slip**: Cricket-specific bet slip with multiple market support
*   [ ] **Tournament Coverage**: IPL, World Cup, T20 leagues, Test series
*   [ ] **Player Statistics**: Detailed player stats and head-to-head comparisons
*   [ ] **Wallet Integration**: UPI, Paytm, and cryptocurrency payment options
*   [ ] **Live Streaming**: Integrate live match streaming (where available)

---
*Built with ❤️ for Cricket Fans Worldwide*
