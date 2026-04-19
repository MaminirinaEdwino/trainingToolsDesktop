import './App.css'
import TrainingList from './components/layouts/trainingList'
import Training from './components/layouts/trainingPage'
import { useEffect, useState } from 'react'

function App() {
  const [actualWindow, setWindow] = useState({ view: "/", params: null })
  const navigate = (route, params) => {
    setWindow({ view: route, params: params })
  }
  const FlyonUIInitializer = () => {
    useEffect(() => {
      const loadFlyon = async () => {
        const { HSStaticMethods } = await import("flyonui/flyonui");
        HSStaticMethods.autoInit();
      };
      loadFlyon();
    }, []);

    return null; // Il ne rend rien visuellement
  }
  const windowList = {
    "/": (<TrainingList flyReset={FlyonUIInitializer} navigate={navigate} />),
    "/training": <Training flyreset={FlyonUIInitializer} navigate={navigate} params={actualWindow.params} />
  }

  return windowList[actualWindow.view]
}

export default App
