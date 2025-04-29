import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";
import HeadBar from "./Components/HeadBar/HeadBar";
import axios from "axios";
import WaterLevel from "./Components/WaterLevel/WaterLevel";
import Status from "./Components/Status/Status";
import Stats from "./Components/Stats/Stats";
import MakeCoffee from "./Pages/Modals/MakeCoffee/MakeCoffee";

/*
Evolution : 
 - API route : set a .env files to avoid the full writen API route in source code and to get a better handle of environnement url
 - Handle error : there is almost no handler for error in all the source code, but adding a handler will not be difficult (just missing some time to do it)
                  Will go for a useState propagated to all component like inError that say if coffeeMachine got an error and tell why.
 - API call : here application make an API Call eveyry 5 seconds, a better way is to set a websocket to subscribe to back-end in order to get every update state and value everytime maybe ?
*/
function App() {
  //First state for loading land page
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  ///Default value are displayed if the api does not answer
  const [state, setState] = useState({
    isOn: false,
    waterLevelState: 0,
    isMakingCoffee: false,
    waterTrayState: 0,
    wasteCoffeeState: 0,
    beanFeedState: 0,
    isInAlert: true,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <>
        <MakeCoffee
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isMakingCoffee={state.isMakingCoffee}
          isInAlert={state.isInAlert}
          isOn={state.isOn}
          // isInAlertMode={false}
        ></MakeCoffee>
        <div className="main-container">
          <HeadBar
            className="header-bar"
            state={state}
            setIsOpen={setIsOpen}
          ></HeadBar>
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
      </>
    );
  }
}

export default App;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
