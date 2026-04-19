import './App.css'
import TrainingList from './components/layouts/trainingList'
import {createBrowserRouter, RouterProvider, useLocation} from 'react-router-dom'
import Training from './components/layouts/trainingPage'
import { useEffect } from 'react'
function FlyonUIInitializer() {
  const location = useLocation();

  useEffect(() => {
    const loadFlyon = async () => {
      // Import dynamique pour éviter les soucis au build
      const { HSStaticMethods } = await import("flyonui/flyonui");
      HSStaticMethods.autoInit();
    };
    loadFlyon();
  }, [location.pathname]);

  return null; // Il ne rend rien visuellement
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TrainingList flyReset={FlyonUIInitializer}/>
    },
    {
      path: "/training/:id/:name",
      element: <Training flyreset={FlyonUIInitializer}/>
    }
  ])
 
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App
