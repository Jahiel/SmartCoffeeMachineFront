import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";
import HeadBar from "./Components/HeadBar/HeadBar";
import axios from "axios";
import WaterLevel from "./Components/WaterLevel/WaterLevel";
import Status from "./Components/Status/Status";
import Stats from "./Components/Stats/Stats";

function App() {
  //First state for loading land page
  const [isLoading, setIsLoading] = useState(true);
  //Do my components needs to refresh ? State is share to all childs
  // const [needRefresh, setNeedRefresh] = useState(false);
  //get the state of the machine, on/off - alerts - state...
  const [state, setState] = useState({
    isOn: false,
    waterLevelState: 0,
    isMakingCoffee: false,
    waterTrayState: 0,
    wasteCoffeeState: 0,
    beanFeedState: 0,
  });

  const loadState = async () => {
    try {
      const reponse = await axios.get(
        "https://localhost:44323/api/v1/CoffeeMachine/state"
      );
      setState(reponse.data);
      console.log(reponse.data);
      await sleep(8000);
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error", error);
      setIsLoading(false);
    } finally {
      //
    }
  };

  useEffect(() => {
    if (isLoading) {
      loadState();
    }

    const intervalId = setInterval(() => {
      loadState();
    }, 5000);

    return () => clearInterval(intervalId);
  });

  if (isLoading) {
    return (
      <>
        <div className="main-container">
          <Loader></Loader>
        </div>
      </>
    );
  } else {
    return (
      <div className="main-container">
        <HeadBar className="header-bar" state={state}></HeadBar>
        <div className="main-body">
          <Status
            isOn={state.isOn}
            isMakingCoffee={state.isMakingCoffee}
            waterLevelState={state.waterLevelState}
            waterTrayState={state.waterTrayState}
            wasteCoffeeState={state.wasteCoffeeState}
            beanFeedState={state.beanFeedState}
          />
          <WaterLevel value={state.waterLevelState}></WaterLevel>
        </div>
        <div className="main-charts">
          <Stats></Stats>
        </div>
      </div>
    );
  }
}

export default App;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
