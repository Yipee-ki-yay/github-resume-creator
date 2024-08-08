import {createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './components/Error';
import Resume from './pages/Resume';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:name",
    element: <Resume />,
    errorElement: <ErrorPage />,
  },
]);