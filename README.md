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

## 🔧 CMS Integration (Optional)

### Current Implementation
The application currently uses in-memory data storage for demonstration purposes. All data is stored locally and persists during the session.

### CMS Integration Options

#### Option 1: Strapi CMS
```bash
# Install Strapi
npx create-strapi-app@latest cluster2-cms --quickstart

# Configure content types for news articles
# Update news-data.service.ts to use Strapi API
```

#### Option 2: Contentful
```bash
# Install Contentful SDK
npm install contentful

# Configure environment variables
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

#### Option 3: Firebase Firestore
```bash
# Install Firebase
npm install firebase

# Configure Firebase in environment files
# Update services to use Firestore
```

### Implementation Steps for CMS
1. **Choose a CMS** (Strapi, Contentful, Firebase, etc.)
2. **Set up content models** for news articles
3. **Update `news-data.service.ts`** to use CMS API
4. **Add environment configuration** for API keys
5. **Implement authentication** if required
6. **Add image upload** functionality
7. **Set up deployment** for both frontend and CMS

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

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for Cluster2 Airports**
