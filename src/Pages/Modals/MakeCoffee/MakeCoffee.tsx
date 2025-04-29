import Modal from "react-modal";
import "./MakeCoffee.scss";
import { useEffect, useState } from "react";
import axios from "axios";
interface MakeCoffeeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isInAlert: boolean;
  isMakingCoffee: boolean;
  isOn: boolean;
}

/// Tried new way of styling for personnal purpose
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

/*
Possible evolution : handle error and state in order to show information to the user (currently making coffee, internal error....)
*/

export default function MakeCoffee({
  isInAlert,
  isMakingCoffee,
  isOpen,
  isOn,
  setIsOpen,
}: MakeCoffeeProps) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [shotCount, setShotCount] = useState(1);
  const [withMilk, setWithMilk] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(isInAlert || isMakingCoffee || !isOn);
  }, [isInAlert, isMakingCoffee, isOn]);

  const handleMakeCoffe = () => {
    axios
      .post("https://localhost:44323/api/v1/CoffeeMachine/coffee", {
        numExpressoShots: shotCount,
        addMilk: withMilk,
      })
      .catch((error) => {
        console.error("Failed to send coffee request : ", error);
      });
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Make your own coffee"
    >
      <h2>Make your own coffee from Dashboard</h2>
      <div className="modal-shot-expresso">
        <div>How many shot of coffee do you want ?</div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={shotCount}
          onChange={(e) => setShotCount(parseInt(e.target.value))}
        />
      </div>
      <div className="modal-milk">
        <div>Do you want milk in your coffee ?</div>
        <div className="checkbox-wrapper-41">
          <input
            type="checkbox"
            checked={withMilk}
            onChange={(e) => setWithMilk(e.target.checked)}
          />
        </div>
      </div>
      <button
        onClick={() => {
          handleMakeCoffe();
        }}
        disabled={isButtonDisabled}
      >
        Make my coffee !
      </button>
      <button onClick={() => setIsOpen(false)}>close</button>
    </Modal>
  );
}
