import React, { useRef, useState, useEffect } from "react";
import "./RockPaperScissor.scss";

import paper_icon from "../Assets/paper.png";
import rock_icon from "../Assets/rock.png";
import scissor_icon from "../Assets/scissor.png";

const RockPaperScissor = () => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const options = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];
    setSelectedOption(randomOption);
  }, []);

  let opponentImage;
  if (selectedOption === "rock") {
    opponentImage = <img className="item" src={rock_icon} alt="" />;
  } else if (selectedOption === "paper") {
    opponentImage = <img className="item" src={paper_icon} alt="" />;
  } else if (selectedOption === "scissor") {
    opponentImage = <img className="item" src={scissor_icon} alt="" />;
  }

  const randomTimer = Math.floor(Math.random() * 1500) + 500;
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setTimeout(() => {
      setIsLoading(true);
      checkResult(item);
    }, randomTimer);
  };

  const checkResult = (item) => {
    console.log("player : " + item);
    console.log("opponent : " + selectedOption);

    if (item === selectedOption) {
      draw();
    } else if (
      (item === "rock" && selectedOption === "scissor") ||
      (item === "paper" && selectedOption === "rock") ||
      (item === "scissor" && selectedOption === "paper")
    ) {
      won("Player");
    } else {
      won("Opponent");
    }
  };

  const renderResetButton = () => {
    buttonRef.current.innerHTML = `<span id="resetButton">Play Again ?</span>`;
    document.getElementById("resetButton").addEventListener("click", resetGame);
  };
  const draw = () => {
    titleRef.current.innerHTML = `<span style="color: white;">It's a draw</span>`;
    renderResetButton();
  };

  const won = (winner) => {
    titleRef.current.innerHTML = `<span style="color: white;">${winner} wins</span>`;
    renderResetButton();
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Rock<span className="span1">Paper</span>
        <span className="span2">Scissor</span>
      </h1>
      <div className="game">
        <div className="You side rps-flex">
          <div className="player-title">Player</div>
          <div className="player-image">
            <img
              className="item"
              src={rock_icon}
              alt=""
              onClick={() => handleItemClick("rock")}
              style={{
                display:
                  selectedItem !== "paper" && selectedItem !== "scissor"
                    ? "block"
                    : "none",
              }}
            />
            <img
              className="item"
              src={paper_icon}
              alt=""
              onClick={() => handleItemClick("paper")}
              style={{
                display:
                  selectedItem !== "rock" && selectedItem !== "scissor"
                    ? "block"
                    : "none",
              }}
            />
            <img
              className="item"
              src={scissor_icon}
              alt=""
              onClick={() => handleItemClick("scissor")}
              style={{
                display:
                  selectedItem !== "rock" && selectedItem !== "paper"
                    ? "block"
                    : "none",
              }}
            />
          </div>
          <div className="player-text">Take Your Pick</div>
        </div>
        <div className="bot side rps-flex">
          <div className="player-title">Opponent</div>
          <div className="player-image">
            {isLoading ? opponentImage : <div className="loader"></div>}
          </div>
          <div className="player-text">
            {isLoading ? (
              <span>Opponent has picked</span>
            ) : (
              <span>Waiting for your pick</span>
            )}
          </div>
        </div>
      </div>
      <div className="button" ref={buttonRef}>
        <button style={{ display: "none" }}>Play Again ?</button>
      </div>
    </div>
  );
};

export default RockPaperScissor;
