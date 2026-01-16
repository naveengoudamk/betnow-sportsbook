# BetNow - Premium Sports Betting & Casino Platform

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

**BetNow** is a state-of-the-art web application designed for the modern sports bettor. Featuring a sleek **Dark Glassmorphism** aesthetic, real-time odds displays, and an immersive casino experience, it sets a new standard for online betting interfaces.

## 🚀 Key Features

*   **🏆 Live Sports Dashboard**: dynamically updated match cards with "Live" pulsation effects.
*   **🎰 Premium Casino**: A dedicated section for high-stakes games like Roulette, Poker, and Slots.
*   **🎨 Glassmorphism UI**: Beautiful, translucent surfaces with neon accents (`#00ff88`, `#00d2ff`) for a futuristic feel.
*   **⚡ High Performance**: Built on Next.js 14 for server-side rendering and lightning-fast page loads.
*   **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop viewing.

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

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
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

*   [ ] **Backend Integration**: Connect to Node.js/Express for user management.
*   [ ] **Live Data Feed**: Integrate SportRadar or OddsAPI for real-time match data.
*   [ ] **Bet Slip**: Create a shopping-cart style ticket for placing bets.
*   [ ] **Wallet**: Implement crypto (USDT/BTC) and fiat payment gateways.

---
*Built with ❤️ by the BetNow Development Team*
