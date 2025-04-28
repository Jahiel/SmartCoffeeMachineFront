import Modal from "react-modal";
interface AlertsModalProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;
}

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

export default function AlertsModal({
  isAlertOpen,
  setIsAlertOpen,
}: AlertsModalProps) {
  return (
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
  );
}
