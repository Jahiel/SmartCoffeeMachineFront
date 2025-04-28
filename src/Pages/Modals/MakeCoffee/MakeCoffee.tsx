import Modal from "react-modal";
import "./MakeCoffee.scss";
import { useEffect, useState } from "react";
interface MakeCoffeeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isInAlert: boolean;
  isMakingCoffee: boolean;
  isOn: boolean;
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

export default function MakeCoffee({
  isInAlert,
  isMakingCoffee,
  isOpen,
  isOn,
  setIsOpen,
}: MakeCoffeeProps) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(isInAlert || isMakingCoffee || !isOn);
  }, [isInAlert, isMakingCoffee, isOn]);

  return (
    <Modal
      isOpen={isOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Make your own coffee"
    >
      <h2>Make your own coffee from Dashboard</h2>
      <div className="modal-shot-expresso">
        <div>How many shot of coffee do you want ?</div>
        <input type="range" min="1" max="10" step="1" />
      </div>
      <div className="modal-milk">
        <div>Do you want milk in your coffee ?</div>
        <div className="checkbox-wrapper-41">
          <input type="checkbox" />
        </div>
      </div>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        disabled={isButtonDisabled}
      >
        Make my coffee !
      </button>
      <button onClick={() => setIsOpen(false)}>close</button>
    </Modal>
  );
}
