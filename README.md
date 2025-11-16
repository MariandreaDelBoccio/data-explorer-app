# 📊 Data Explorer App

A modern, production-ready data visualization dashboard built with React, TypeScript, and cutting-edge frontend technologies.

![CI/CD](https://github.com/yourusername/data-explorer-app/workflows/CI/CD%20Pipeline/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📈 **Interactive Charts**: Multiple chart types (Line, Bar, Area, Pie) with Recharts
- 🔍 **Advanced Filtering**: Complex filter system with multiple operators
- 💾 **Saved Views**: Persist and load custom dashboard configurations
- 🎯 **Real-time Stats**: Live metrics with success/warning/error tracking
- 🚀 **Performance Optimized**: React Query for intelligent caching
- 🎨 **Modern UI**: Tailwind CSS with responsive design
- ✅ **Type-Safe**: Full TypeScript coverage
- 🧪 **Well Tested**: Comprehensive unit and integration tests
- 🔄 **CI/CD Ready**: GitHub Actions pipeline included

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite** - Build tool

### State Management
- **Zustand** - Global state management
- **TanStack Query** - Server state & caching

### Visualization
- **Recharts** - Chart library
- **Lucide React** - Icon system

### Styling
- **Tailwind CSS** - Utility-first CSS

### Testing
- **Vitest** - Unit testing
- **Testing Library** - Component testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/data-explorer-app.git
cd data-explorer-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base components (Button, Card, etc.)
│   ├── charts/         # Chart components
│   └── layouts/        # Layout components
├── features/           # Feature-based modules
│   ├── dashboard/      # Main dashboard
│   ├── filters/        # Filter system
│   └── views/          # Saved views
├── hooks/              # Custom React hooks
├── services/           # API & business logic
├── stores/             # Zustand stores
├── types/              # TypeScript definitions
├── utils/              # Helper functions
└── __tests__/          # Test files
```

### Key Design Decisions

1. **Feature-Based Structure**: Code organized by feature for better scalability
2. **Separation of Concerns**: Business logic separated from UI components
3. **Custom Hooks**: Encapsulate complex logic for reusability
4. **Type Safety**: Comprehensive TypeScript types throughout
5. **Performance**: React Query handles caching, Zustand provides efficient state updates

## 🧪 Testing Strategy

- **Unit Tests**: Individual functions and utilities
- **Component Tests**: UI component behavior
- **Integration Tests**: Feature workflows
- **Store Tests**: State management logic

Run tests with:
```bash
npm run test              # Watch mode
npm run test:coverage     # With coverage
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Data Explorer
```

### Customizing Charts

Edit chart configurations in `src/components/charts/MetricsChart.tsx`:

```typescript
const COLORS = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  default: '#3b82f6',
};
```

## 📊 Key Features Explained

### Filter System

The app supports complex filtering:
- **Operators**: equals, contains, greaterThan, lessThan, between
- **Multiple Filters**: Combine filters with AND logic
- **Dynamic Updates**: Real-time chart updates

### Saved Views

Save complete dashboard configurations:
- Filter combinations
- Date ranges
- Chart types
- Persist to localStorage

### Performance Optimization

- **React Query**: Automatic background refetching
- **Memoization**: useMemo for expensive computations
- **Code Splitting**: Dynamic imports for routes (when added)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)


Project Link: [https://github.com/yourusername/data-explorer-app](https://github.com/yourusername/data-explorer-app)

---
