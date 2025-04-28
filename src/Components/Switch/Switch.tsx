import React, { useEffect, useState } from "react";
import "./Switch.scss";
import axios from "axios";

interface SwitchProps {
  state: boolean;
  onChange: (state: boolean) => void;
}

export default function Switch(props: SwitchProps) {
  const [isOn, setIsOn] = useState(props.state);

  useEffect(() => {
    setIsOn(props.state);
  }, [props.state]);

  const toggle = async () => {
    const newState = !isOn;
    setIsOn(newState);
    props.onChange(newState);

    try {
      const url = newState
        ? "https://localhost:44323/api/v1/CoffeeMachine/turn-on"
        : "https://localhost:44323/api/v1/CoffeeMachine/turn-off";

      await axios.post(url); // Envoi de la requête POST
      console.log("Machine state updated successfully.");
    } catch (error) {
      console.error("Error updating machine state:", error);
    }
  };

  return (
    <div className="checkbox-wrapper-41">
      <input type="checkbox" checked={isOn} onChange={toggle} />
    </div>
  );
}
