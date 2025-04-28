import "./Alerts.scss";
import { useState } from "react";
import AlertsModal from "../../Pages/Modals/AlertsModal/AlertsModal";
interface AlertsProps {
  isInAlertMode?: boolean;
}

export default function Alerts(props: AlertsProps) {
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
      <AlertsModal
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
      ></AlertsModal>
    </>
  );
}
