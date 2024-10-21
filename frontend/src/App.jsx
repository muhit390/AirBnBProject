import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotsList from './components/SpotsList/SpotsList';
import SpotDetails from './components/SpotDetails/SpotDetails';
import NewSpotForm from './components/NewSpotForm/NewSpotForm'; // Import NewSpotForm
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateSpotForm from './components/UpdateSpotForm/UpdateSpotForm';


// Layout component to manage loading session data and show navigation
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />} {/* This will render child components based on the route */}
    </>
  );
}

// Router configuration
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsList /> // Use SpotsList component on the home page
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails /> // Route for Spot details page
      },
      {
        path: '/spots/new',
        element: <NewSpotForm /> // Route for the new spot form
      },
      {
        path:'/spots/manage',
        element:<ManageSpots />
      },
      {
        path:'/spots/:spotId/edit',
        element:<UpdateSpotForm />
      }
    ]
  }
]);

// Main App component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
