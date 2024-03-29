import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainPage from "./components/MainPage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import EventPage from "./components/eventsComponent/EventPage.jsx";
import RootLayout from "./components/RootLayout.jsx";
import LoginForm from "./components/authentication/Login.jsx";
import Registration from "./components/authentication/Registration.jsx";
import {EventContextProvider} from "./EventContext.jsx";



const router = createBrowserRouter([{
    path:"/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <MainPage /> },
        { path: "/events", element: <EventPage /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/register", element: <Registration /> },
    ]}
    ,{
        path: "/register",
        element: <Registration />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginForm /> ,
        errorElement: <ErrorPage />
    }
])
const App = () => {

    return (
        <>
            <EventContextProvider>
                <RouterProvider router={router} />
            </EventContextProvider>
        </>
    );
};

export default App;

