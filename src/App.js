import "./styles.css";
import { useEffect, useRef, useState } from "react";
export default function App() {
  const [value, setValue] = useState("");
  const [rand, setRand] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [chances, setChances] = useState(3);
  const [disableInput, setDisableInput] = useState(false);
  const inpRef = useRef(null);
  useEffect(() => {
    let number = Math.floor(Math.random() * 20) + 1;
    setRand(number);
  }, [rand]);
  const grabNumber = (e) => {
    console.log("random number is :", rand);
    console.log("enterred value is:", value);
    if (rand.toString() === value) {
      setGuessed(true);
      setDisableInput(true);
    } else {
      setChances(chances - 1);
      if (chances - 1 === 0) {
        setDisableInput(true);
      }
    }
  };
  const playAgain = () => {
    setRand(0);
    setDisableInput(false);
    setGuessed(false);
    setChances(3);
    inpRef.current.value = "";
  };
  return (
    <div className="container">
      <h2>Guess the number</h2>
      <input
        type="number"
        onChange={(e) => setValue(e.target.value)}
        disabled={disableInput}
        ref={inpRef}
      />
      <button onClick={grabNumber} disabled={disableInput}>
        Guess
      </button>
      {chances > 0 && !guessed && <p>chances left {chances}</p>}
      {chances === 0 && !guessed && <p>Gameover the number is {rand}</p>}
      {guessed && (
        <p>
          Hurray you guessed the number in {3 - chances + 1} guesses. Answer is:{" "}
          {rand}
        </p>
      )}
      {(chances === 0 || guessed) && (
        <button onClick={playAgain}>Play again</button>
      )}
    </div>
  );
}
