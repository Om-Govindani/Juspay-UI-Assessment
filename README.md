# Juspay-UI-Assessment

# 📊 React Admin Dashboard

A fully responsive Admin Dashboard built using **React** and **Tailwind CSS**, featuring dark/light mode, interactive charts, a custom-built data table with sorting and pagination, and responsive overlay sidebars.

---

## 🚀 Live Demo

DashBoard : 🔗 https://react-assignment-two-sable.vercel.app/
OrderList : 🔗 https://react-assignment-two-sable.vercel.app/orders

---

## 🛠 Tech Stack

- **React** – UI Library
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first CSS framework
- **Highcharts** – Data visualization (Bar, Line, Donut, Map charts)
- **Lucide React** – Icon library
- **React Icons** – Additional icons
- **Context API** – Global theme management

---

## ✨ Features

- 🌗 Dark / Light Mode (Token-based theme system)
- 📱 Fully Responsive Layout
- 📂 Sidebar & Rightbar Overlay on Small Screens
- 📊 Interactive Charts (Highcharts)
- 📋 Custom Orders Table
  - Search functionality
  - Column sorting
  - Pagination
  - Row selection
- 🎨 Dynamic avatar background colors
- ⚡ Smooth transitions and animations
- 🧩 Modular component structure

---

## 📦 Orders Table Implementation

TanStack Table was initially explored for building the Orders table.

However, it did not provide the required design flexibility for the custom UI layout.  
Therefore, the table logic — including **sorting, filtering, pagination, and row selection** — was implemented manually to maintain complete control over styling and behavior.

---

## 📁 Project Structure

src /
|
|----------------/ components
| |----------Header.jsx
| |----------Sidebar.jsx
| |----------Rightbar.jsx
| |---------/Dashboard
| | |---Barchart.jsx
| | |---Dashboard.jsx
| | |---Donut.jsx
| | |---LineChart.jsx
| | |---MapChart.jsx
| | |---StatsChart.jsx
| | |---TopProductsTable.jsx
| |--------/OrderList
| | |---OrderPage.jsx
| | |---OrdersTable.jsx
|----------------/contexts
| |----------ThemeContext.jsx
---------------App.jsx


---

## 🎯 Key Highlights

- No UI layout libraries used
- No table libraries used in final implementation
- Custom token-based theming system
- Fully responsive grid architecture
- Clean separation of UI and logic

---

## 📦 Installation

```bash
npm install
npm run dev

