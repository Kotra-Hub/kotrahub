# Kotra Hub - Unified Digital Ecosystem Platform

## Overview
Kotra Hub is a comprehensive enterprise intranet portal designed for Kotra Pharma (M) Sdn Bhd. It serves as a unified digital ecosystem providing employees with access to various services, tools, and resources in a single, modern interface.

## Features

### 🏠 Dashboard
- **Announcement Slider**: Featured announcements with detailed views
- **Quick Access**: Customizable shortcuts with drag-and-drop reordering (9 items, 8 on mobile)
- **Pending Actions**: Task management with priority indicators (Urgent, Normal, Low)
- **Recent Activities**: Real-time activity feed
- **Calendar Agenda**: Upcoming events with category filtering
- **Phone Directory**: Searchable company directory with department/team filters

### 📋 Core Services

#### Human Resources
- HR Requisition Management
- Employee Handbook
- Leave Application (Hours) / Gate Pass

#### Plant Operations
- Production & Monitoring (Line Monitoring, PPMS, Material Management)
- Quality & Regulatory (Quality Assurance, British Pharmacopoeia, Stability)
- Technical Services (Work Order, TSR, Calibration)
- Project Management (PMS, Task Management)

#### Sales
- Sales Automation Solutions (SAS)
- Agreement Management
- Product Information
- AP Management
- E-Invoice System

#### Procurement
- Purchase Order Management
- Quotations Management
- Vendor/Supplier Management
- Asset & Equipment Management

#### Inventory
- Inventory Management System (IMS)
- Consumables Management
- Asset & Location Management

#### EBMR
- Material Management
- Production Planning
- Quality Assurance
- Super Administrator Controls

#### Staff Services
- Staff Dashboard
- Employee Management
- Training Record System (TRS)
- Staff Purchase
- Claims Management
- e-Library
- NDMS Access

### 🔐 Security Features
- Two-Factor Authentication (2FA) support
- Secure login with account lockout protection
- Session management
- Role-based access control

### 🎨 User Experience
- **Dark/Light Mode** toggle
- **Custom Theme Colors** (Purple, Blue, Teal, Green, Orange, Rose)
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Keyboard Shortcuts** (Ctrl+K for search, Escape for closing modals)
- **Drag-and-Drop** Quick Access reordering
- **AI Assistant** (KPAI) for help and navigation

### 📱 Mobile Optimization
- Responsive grid layouts
- Touch-friendly interfaces
- Bottom navigation (apps button)
- Compact announcement cards
- Optimized table views

## Technologies Used

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome 6** - Icon library
- **Google Fonts (Inter)** - Typography

### Styling
- Custom CSS with CSS variables for theming
- Dark mode support with `class="dark"` toggle
- Responsive design with Tailwind breakpoints
- Smooth animations and transitions

### External APIs
- **Malaysia Holidays API** - Public holiday data
- **Custom Fonts** - Inter font family
- **CDN Resources** - Vue.js, Tailwind, Font Awesome

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection for CDN resources

### Quick Start
1. Clone or download the HTML file
2. Open `index.html` in your browser
3. Login with demo credentials:
   - **Username**: `kp.digital`
   - **Password**: `kp@123`

### Development
The application is built as a single HTML file with embedded CSS and JavaScript. No build tools or compilation required.

```bash
# Simply open the file in your browser
open index.html
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Key Components

### Authentication Flow
1. User enters credentials
2. Optional 2FA verification (6-digit code)
3. Dashboard access upon successful login

### Navigation Structure
- **Left Sidebar**: Primary navigation (Home, Plant, Sales, Staff, Procurement, Requisition, Inventory)
- **Top Header**: Search, Notifications, Profile
- **Bottom Navigation**: Mobile app launcher
- **Flyout Menus**: Hover-triggered sub-navigation

### Data Management
- Local storage for user preferences (theme color, dark mode)
- Reactive state management with Vue.js
- Mock data for demonstration (contacts, tasks, announcements)

## Customization

### Theme Colors
Users can customize accent colors via:
1. Settings > Appearance > Theme
2. Quick theme selection buttons
3. Custom color picker

### Quick Access
- Add/remove services
- Drag to reorder (first 5 appear in sidebar)
- 10-second undo for removals

## Responsive Breakpoints
- **Mobile**: < 768px (collapsed sidebar, compact layouts)
- **Tablet**: 768px - 1024px (partial sidebar, adjusted grids)
- **Desktop**: > 1024px (full sidebar, expanded layouts)

## Performance
- **Lazy Loading**: Content loads progressively
- **Optimized Assets**: CDN-hosted resources
- **Minimal Dependencies**: Single-file architecture

## Security Notes
- All login attempts are client-side (demo mode)
- 2FA uses simulated code generation
- Account lockout after 3 failed attempts (simulated)
- CORS policies apply to external API calls

## Known Limitations
- Demo data only (no backend integration)
- 2FA code is displayed in console (for demo purposes)
- Some features marked as "Coming Soon"
- External API may have rate limits

## Future Enhancements
- Backend API integration
- Real-time notifications
- Advanced reporting dashboards
- Mobile application
- Biometric authentication

---

© 2026 Kotra Pharma (M) Sdn Bhd (90082-V). All Rights Reserved.

---

*This documentation is for internal use and reference purposes only.*
