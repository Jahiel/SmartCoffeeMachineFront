import React from "react";
import "./Awake.scss";

interface AwakeProps {
  isOn?: boolean;
}

export default function Awake(props: AwakeProps) {
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
