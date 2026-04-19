import './App.css'
import TrainingList from './components/layouts/trainingList'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Training from './components/layouts/trainingPage'
import "../node_modules/flyonui/dist/index"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TrainingList/>
    },
    {
      path: "/training/:id",
      element: <Training/>
    }
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App
