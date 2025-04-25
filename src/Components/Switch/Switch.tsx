import React, { useState } from "react";
import "./Switch.scss";

interface SwitchProps {
  state: boolean;
  onChange: (state: boolean) => void;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const [isOn, setIsOn] = useState(props.state);

  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    props.onChange(newState);
  };

  return (
    <div className="checkbox-wrapper-41">
      <input type="checkbox" checked={isOn} onChange={toggle} />
    </div>
  );
};

export default Switch;
