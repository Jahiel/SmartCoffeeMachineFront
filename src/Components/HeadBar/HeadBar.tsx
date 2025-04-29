import { useEffect, useState } from "react";
import Switch from "../Switch/Switch";
import "./HeadBar.scss";
import Awake from "../Awake/Awake";
import Alerts from "../Alerts/Alerts";

interface HeadBarProps {
  //tried to set a className as props but never removed it, possible evolution is to set everything in the /HeadBar.scss
  className?: string;
  //State of the machine got with API call (or default values set in App.tsx)
  state?: { isOn: boolean; isInAlert: boolean };
  //Close the modal when clicked on
  setIsOpen: (isOpen: boolean) => void;
}

export default function HeadBar(props: HeadBarProps) {
  const [isOn, setIsOn] = useState(props.state?.isOn ?? false);
  const { className } = props;

  useEffect(() => {
    if (props.state?.isOn !== undefined) {
      setIsOn(props.state.isOn);
    }
  }, [props.state?.isOn]);
  return (
    <div className={className}>
      <div className="head-title">
        <h1>Coffee Machine DashBoard</h1>
      </div>
      <div>
        <Awake isOn={isOn}></Awake>
      </div>
      <Alerts isInAlertMode={props.state?.isInAlert}></Alerts>
      <button onClick={() => props.setIsOpen(true)}>MakeCoffee</button>
      <Switch state={isOn} onChange={setIsOn}></Switch>
    </div>
  );
}
