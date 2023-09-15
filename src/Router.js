
// Router
import {
    createBrowserRouter,
} from "react-router-dom";

// routes paths
import App from './App';
import Home from './routes/home';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);
