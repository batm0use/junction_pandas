import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../views/HomePage';
import ChatPage from '../views/ChatPage';
import AboutPage from '../views/AboutPage';

/**
 * Application router configuration
 * Defines all routes and their corresponding components
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;
