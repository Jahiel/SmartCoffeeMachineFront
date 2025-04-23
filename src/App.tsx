import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await sleep(10000);
      setIsReady(true);
    };

    load();
  }, [isReady]);

  if (!isReady) {
    return (
      <>
        <div>
          <Loader></Loader>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Hello</div>
      </>
    );
  }
}

export default App;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
