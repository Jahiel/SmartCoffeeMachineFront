import { useEffect, useState } from "react";
import "./Switch.scss";
import axios from "axios";

interface SwitchProps {
  state: boolean;
  onChange: (state: boolean) => void;
}

export default function Switch(props: SwitchProps) {
  const [isOn, setIsOn] = useState(props.state);
  const [previousState, setPreviousState] = useState(props.state);

  useEffect(() => {
    setIsOn(props.state);
    setPreviousState(props.state);
  }, [props.state]);

  const toggle = async () => {
    const newState = !isOn;
    setIsOn(newState);
    props.onChange(newState);

    try {
      const url = newState
        ? "https://localhost:44323/api/v1/CoffeeMachine/turn-on"
        : "https://localhost:44323/api/v1/CoffeeMachine/turn-off";

      const response = await axios.post(url);

      if (response.status === 200) {
        console.log("Machine state updated successfully.");
      } else {
        throw new Error("Failed to update machine state");
      }
    } catch (error) {
      console.error("Error updating machine state:", error);
      // In case of error, revert the switch state
      setIsOn(previousState);
      props.onChange(previousState);
    }
  };

  return (
    <div className="checkbox-wrapper-41">
      <input type="checkbox" checked={isOn} onChange={toggle} />
    </div>
  );
}
