import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";
import HeadBar from "./Components/HeadBar/HeadBar";
import axios from "axios";

function App() {
  //First state for loading land page
  const [isLoading, setIsLoading] = useState(true);
  //Do my components needs to refresh ? State is share to all childs
  const [needRefresh, setNeedRefresh] = useState(false);
  //get the state of the machine, on/off - alerts - state...
  const [state, setState] = useState({ isOn: false });

  const loadState = async () => {
    try {
      const reponse = await axios.get(
        "https://localhost:44323/api/v1/CoffeeMachine/state"
      );
      setState(reponse.data);
      console.log(reponse.data);
      console.log("oui");
      await sleep(10000);
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error", error);
    } finally {
      //
    }
  };

  useEffect(() => {
    if (isLoading) {
      loadState();
    }
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
      </div>
    );
  }
}

export default App;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
