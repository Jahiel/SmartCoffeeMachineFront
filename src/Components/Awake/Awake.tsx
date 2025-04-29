import "./Awake.scss";

interface AwakeProps {
  // is the machine on ?
  isOn?: boolean;
}

export default function Awake(props: AwakeProps) {
  ///Requirements file ask for 4 states : Off, idle, Active, Alert
  /*
    Here I only implemented Off and On, alert are in the Alert button and Idle and Active will be
    in possible evolution.
    Note that we can also get special status that say if the dashboard is connected or not
  */
  return (
    <button
      className={props.isOn ? "available-for-btn-on" : "available-for-btn-off"}
    >
      <div className={props.isOn ? "circle-on" : "circle-off"}>
        <div className="dot" />
        <div className="outline" />
      </div>
      The machine is currently turned {props.isOn ? "On" : "Off"}
    </button>
  );
}
