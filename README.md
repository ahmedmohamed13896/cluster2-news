# Cluster2 Airports - News Management System

A modern, responsive news management application built with Angular 19 for Cluster2 Airports. This application provides a comprehensive solution for managing news articles with features like archiving, searching, and dark mode support.

## 🚀 Features

### Core Features

- **News Dashboard**: View and search through all active news articles
- **Add News**: Create new articles with title, content, summary, tags, and publish date
- **Archive System**: Archive articles and restore them from the archive
- **Search Functionality**: Search across title, content, summary, and tags
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes

### Technical Features

- **Angular 19**: Latest Angular framework with modern features
- **Bootstrap 5**: Responsive UI framework
- **Signal-based State Management**: Reactive state management using Angular signals
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Animations**: Smooth transitions and hover effects
- **Loading States**: Visual feedback during data operations

## 🛠️ Technology Stack

- **Frontend**: Angular 19.2.0
- **UI Framework**: Bootstrap 5.3.7
- **Styling**: SCSS with custom variables
- **State Management**: Angular Signals
- **Routing**: Angular Router with lazy loading

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Angular CLI (version 19.2.4 or higher)

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cluster2-news
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── news-data.service.ts      # Data service with in-memory storage
│   ├── features/
│   │   ├── archive/
│   │   │   └── archive.component.ts   # Archive management
│   │   └── news/
│   │       ├── news-dashboard/        # News listing and search
│   │       ├── news-detail/           # Article detail view
│   │       └── news-form/             # Add/edit news form
│   ├── models/
│   │   └── news-article.model.ts      # News article interface
│   ├── shared/                        # Shared components
│   └── state/
│       └── news-state.service.ts      # State management service
├── assets/
│   └── logo.png                       # Cluster2 branding
└── styles/
    ├── _variables.scss                # SCSS variables
    └── styles.scss                    # Global styles
```

## 🎨 Features in Detail

### News Dashboard

- **Search**: Real-time search across title, content, summary, and tags
- **Archive**: One-click archive functionality for each article
- **Responsive**: Optimized layout for all device sizes
- **Loading States**: Visual feedback during data loading

### Add News Form

- **Validation**: Real-time form validation with visual feedback
- **Responsive**: Two-column layout on desktop, single column on mobile
- **Tags**: Comma-separated tag input with placeholder guidance
- **Date Picker**: Native date input for publish date

### Archive Management

- **Restore**: Unarchive articles back to active status
- **View**: Direct links to view archived articles
- **Visual Indicators**: Warning-colored borders for archived items
- **Empty State**: Helpful message when no archived articles exist

### Dark Mode

- **Toggle**: Easy switch between light and dark themes
- **Persistent**: Theme preference is maintained
- **Comprehensive**: All components support dark mode

## 🔧 Data Storage

This application currently uses in-memory data storage for demonstration purposes. All news data is stored locally in the browser session and will reset when the page is refreshed. No external CMS or backend is required.

## 🎯 Future Enhancements

### Planned Features

- [ ] **User Authentication**: Login/logout functionality
- [ ] **Image Upload**: Support for article images
- [ ] **Rich Text Editor**: WYSIWYG content editing
- [ ] **Categories**: Article categorization system
- [ ] **Publishing Workflow**: Draft/publish states
- [ ] **Analytics**: Article view tracking
- [ ] **Email Notifications**: New article alerts
- [ ] **API Documentation**: Swagger/OpenAPI docs

### Technical Improvements

- [ ] **Unit Tests**: Comprehensive test coverage
- [ ] **E2E Tests**: End-to-end testing with Cypress
- [ ] **Performance**: Lazy loading and code splitting
- [ ] **Accessibility**: WCAG compliance improvements
- [ ] **PWA**: Progressive Web App features
- [ ] **Internationalization**: Multi-language support

## 🐛 Troubleshooting

### Common Issues

**Build Errors**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styling Issues**

```bash
# Rebuild styles
npm run build -- --configuration development
```

**Routing Issues**

- Ensure all routes are properly configured in `app.routes.ts`
- Check that components are properly exported

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🚀 Deployment: Host Your Demo on Netlify

You can easily deploy this Angular project for free using Netlify:

### 1. Build the Project

```bash
npm run build
# The output will be in the `dist/cluster2-news/` folder
```

### 2. Deploy to Netlify

#### Option A: Drag & Drop

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the contents of the `dist/cluster2-news/` folder into the drop area
3. Netlify will instantly host your site and give you a live link

#### Option B: Connect Your GitHub Repo

1. Push your code to GitHub (see instructions above)
2. Go to [https://app.netlify.com/](https://app.netlify.com/)
3. Click **Add new site** > **Import an existing project**
4. Connect your GitHub account and select your repository
5. Set the build command to `npm run build` and the publish directory to `dist/cluster2-news`
6. Click **Deploy site**
7. Netlify will build and host your Angular app, providing a public demo link

---

## 🤝 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for Cluster2 Airports**
