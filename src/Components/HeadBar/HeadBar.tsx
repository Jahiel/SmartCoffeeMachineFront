import { useEffect, useState } from "react";
import Switch from "../Switch/Switch";
import "./HeadBar.scss";
import Awake from "../Awake/Awake";
import Alerts from "../Alerts/Alerts";
interface HeadBarProps {
  className?: string;
  state?: { isOn: boolean; isInAlert: boolean };
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
