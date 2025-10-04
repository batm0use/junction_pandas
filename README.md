# Junction Pandas

A modern web application built with React, TypeScript, and TailwindCSS, following the Model-View-Controller (MVC) architectural pattern with external LLM service integration.

## 🚀 Features

- **React 18** with **TypeScript** for type-safe component development
- **TailwindCSS** for modern, utility-first styling
- **MVC Architecture** with separate router and controller layers
- **External LLM Service Integration** for AI-powered features
- **React Router** for client-side navigation
- **Vite** for fast development and optimized builds

## 📁 Project Structure

```
junction_pandas/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ChatInterface.tsx
│   │   └── Navigation.tsx
│   ├── views/             # Page components (View layer)
│   │   ├── HomePage.tsx
│   │   ├── ChatPage.tsx
│   │   └── AboutPage.tsx
│   ├── controller/        # Business logic (Controller layer)
│   │   └── llmController.ts
│   ├── services/          # External service integrations
│   │   └── llmService.ts
│   ├── router/            # Route definitions
│   │   └── index.tsx
│   ├── types/             # TypeScript type definitions (Model layer)
│   │   └── index.ts
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── public/                # Static assets
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # TailwindCSS configuration
└── package.json           # Project dependencies
```

## 🏗️ MVC Architecture

### Model
- Located in `src/types/`
- Defines data structures and interfaces
- TypeScript types for LLM requests/responses and application state

### View
- Located in `src/views/` and `src/components/`
- React components for UI rendering
- Uses TailwindCSS for styling

### Controller
- Located in `src/controller/`
- Contains business logic
- Handles data flow between services and views
- Validates inputs and manages state

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd junction_pandas
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your LLM API credentials:
```
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_API_URL=https://api.openai.com/v1
```

## 🎯 Usage

### Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build
Create a production build:
```bash
npm run build
```

### Preview
Preview the production build:
```bash
npm run preview
```

### Type Checking
Run TypeScript type checking:
```bash
npm run lint
```

## 🤖 LLM Integration

The application includes a pre-configured LLM service that can integrate with various providers:

- **Default**: OpenAI API
- **Configurable**: Can be adapted for other providers (Anthropic, Cohere, etc.)
- **Type-safe**: Full TypeScript support for requests and responses

### Usage Example

The LLM service is used through the controller layer:

```typescript
import { llmController } from './controller/llmController';

// Process a prompt
const response = await llmController.processPrompt("Hello, AI!");
console.log(response.content);
```

## 🎨 Styling

This project uses TailwindCSS for styling:
- Utility-first CSS framework
- Responsive design out of the box
- Customizable through `tailwind.config.js`

## 🧭 Routing

Routes are defined in `src/router/index.tsx`:
- `/` - Home page
- `/chat` - Chat interface with LLM
- `/about` - About page with architecture information

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_LLM_API_KEY` | API key for LLM provider | - |
| `VITE_LLM_API_URL` | Base URL for LLM API | `https://api.openai.com/v1` |

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Vite 7** - Build tool and dev server
- **TailwindCSS 4** - CSS framework
- **React Router 7** - Routing library
- **Axios** - HTTP client

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.