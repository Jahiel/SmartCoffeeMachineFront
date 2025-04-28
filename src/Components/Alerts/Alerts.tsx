import Modal from "react-modal";
import "./Alerts.scss";
import { useState } from "react";
interface AlertsProps {
  isInAlertMode?: boolean;
}

export default function Alerts(props: AlertsProps) {
  const customStyles = {
    content: {
      color: "black",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  return (
    <>
      <div hidden={!props.isInAlertMode}>
        <button
          className="alerts-button"
          color="green"
          onClick={() => setIsAlertOpen(true)}
        >
          {"Alert(s)"}
        </button>
      </div>
      <Modal
        isOpen={isAlertOpen}
        onRequestClose={() => setIsAlertOpen(false)}
        style={customStyles}
        contentLabel="Make your own coffee"
      >
        <h2>WIP</h2>
        <div>
          <div>
            {
              "Here we can imagine detailled alert explanation (and link to what to do or who you need to call"
            }
            {"And a history of last alert get in the log database"}
          </div>
        </div>
        <button onClick={() => setIsAlertOpen(false)}>close</button>
      </Modal>
    </>
  );
}
