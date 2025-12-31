# CHATGPT KING - Multi-Subdomain Web Platform

A mobile-first multi-subdomain web platform built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no dependencies - just clean, efficient code.

## 🎯 Features

- **Mobile-First Design**: Responsive layouts that work seamlessly across all devices
- **Multi-Subdomain Architecture**: Separate subdomains for different platform areas
- **Role-Based Access Control**: Four user roles (Guest, Member, Pro, Admin) with dynamic content visibility
- **Off-Canvas Navigation**: Smooth drawer-style mobile navigation
- **Accordion Components**: Collapsible content sections
- **Shared Design System**: Consistent styling via core.css
- **Pure Vanilla JavaScript**: No frameworks or dependencies
- **Persistent State**: Role preferences saved in localStorage

## 📁 Project Structure

```
CHATGPT KING/
├── core.css           # Shared stylesheet for all subdomains
├── core.js            # Shared JavaScript functionality
├── index.html         # Root domain homepage
└── app/
    └── index.html     # App subdomain
```

## 🎨 Design System

### CSS Variables (core.css)
- Color palette with primary/secondary colors
- Consistent spacing and typography
- Dark theme optimized for modern interfaces
- Mobile-first breakpoints (375px, 768px, 1024px)

### Components
- **Header**: Fixed navigation with logo and menu
- **Off-Canvas Drawer**: Slide-out mobile navigation
- **Accordions**: Expandable content sections
- **Cards**: Content containers with consistent styling
- **Buttons**: Primary and outline button styles
- **Grid System**: Responsive grid layouts

## 🔒 Role-Based Visibility

### User Roles
1. **Guest**: Public access, limited features
2. **Member**: Registered users with dashboard access
3. **Pro**: Premium features and analytics
4. **Admin**: Full platform access and management tools

### Implementation
Use CSS classes to control visibility:
```html
<div class="role-member">Member-only content</div>
<div class="role-pro">Pro-only content</div>
<div class="role-admin">Admin-only content</div>
```

For inline elements:
```html
<span class="role-member-inline">Member link</span>
```

## 🚀 Getting Started

### 1. Local Development
```bash
# Clone the repository
git clone https://github.com/SOJIB-AHMMED/SOJIB-ss.git
cd SOJIB-ss

# Start a local server (Python 3)
python3 -m http.server 8080

# Or use Node.js
npx http-server -p 8080

# Visit http://localhost:8080
```

### 2. File Server
Simply upload all files to your web server, maintaining the directory structure.

### 3. Multi-Subdomain Setup (Production)
For production environments with actual subdomains:
1. Configure DNS to point subdomains to your server
2. Set up virtual hosts for each subdomain
3. Place the core files at the root level
4. Place subdomain-specific files in their respective directories

## 📱 Testing

### Role Switcher
Use the role switcher in the bottom-right corner to test different user roles:
- Click "Guest", "Member", "Pro", or "Admin" to switch roles
- Role preference is saved in localStorage
- Content visibility updates automatically

### Responsive Testing
- **Mobile**: Test at 375px width (iPhone SE)
- **Tablet**: Test at 768px width (iPad)
- **Desktop**: Test at 1280px+ width

### Features to Test
1. ✅ Header navigation (desktop view)
2. ✅ Off-canvas drawer (mobile view)
3. ✅ Accordion expand/collapse
4. ✅ Role-based content visibility
5. ✅ Navigation between subdomains
6. ✅ Persistent role state

## 🛠️ Customization

### Colors
Edit CSS variables in `core.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --dark-bg: #1f2937;
  /* ... */
}
```

### Adding New Subdomains
1. Create a new directory (e.g., `dashboard/`)
2. Add `index.html` with proper core file references
3. Include header, drawer, and main content
4. Update navigation links in all pages

### Adding Role-Specific Content
```html
<!-- Block-level content -->
<div class="role-pro">
  <h3>Pro Feature</h3>
  <p>This is only visible to Pro and Admin users.</p>
</div>

<!-- Inline content -->
<nav>
  <a href="/">Home</a>
  <span class="role-member-inline">
    <a href="/dashboard/">Dashboard</a>
  </span>
</nav>
```

## 📝 Core JavaScript API

### Global Object: `ChatGPTKing`

```javascript
// Set user role
ChatGPTKing.setUserRole('member');

// Get current role
const role = ChatGPTKing.getUserRole(); // 'guest', 'member', 'pro', or 'admin'

// Drawer controls
ChatGPTKing.openDrawer();
ChatGPTKing.closeDrawer();
ChatGPTKing.toggleDrawer();

// Subdomain detection
const subdomain = ChatGPTKing.getSubdomain(); // 'root', 'app', etc.
```

## 🎯 Best Practices

1. **Always include core files**: Link to `core.css` and `core.js` in every page
2. **Maintain structure**: Follow the established HTML structure for consistency
3. **Use role classes**: Implement role-based visibility with provided CSS classes
4. **Mobile-first**: Design for mobile first, then enhance for larger screens
5. **Semantic HTML**: Use appropriate HTML5 semantic elements
6. **Accessibility**: Include proper ARIA labels and keyboard navigation

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is part of the SOJIB-ss repository.

## 🤝 Contributing

Contributions are welcome! Please maintain the existing code style and structure.

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

Built with ❤️ using pure HTML, CSS, and JavaScript - no frameworks needed!
