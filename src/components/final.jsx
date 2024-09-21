/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import './final.css';

const allTeams = [
  "Tractor Tacticians",
  "Tech arms",
  "Alpha",
  "Quality Vision Innovators",
  "Lumina",
  "NEXSENSE",
  "Comp Crew",
  "Vision AI",
  "GhosTxWa1kers",
  "i_range",
  "Eklavya : The Silent Killer",
  "3Piece",
  "Code Catalyst",
  "TEAM COYOTE",
  "techwizards",
  "THE ACHIEVERS",
  "RYM",
  "REZONIX",
  "Tracify",
  "TrafficZen"
];

const top3Teams = ["Team Lambda", "Team Beta", "Team Alpha"];

const Final = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState('');
  const [spinningIndex, setSpinningIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  const topTeams = ["3rd Place", "2nd Place", "Winner of HardWar3.0"];

  const handleClick = () => {
    if (currentStep < topTeams.length) {
      setIsSpinning(true);
      setShowTyping(false);

      const spinDuration = 5000;

      const interval = setInterval(() => {
        setSpinningIndex((prevIndex) => (prevIndex + 1) % allTeams.length);
      }, 120);

      setTimeout(() => {
        clearInterval(interval);
        setWinner(top3Teams[currentStep]);
        setIsSpinning(false);

        if (currentStep === 2) {
          setShowTyping(true);
        }

        setCurrentStep(currentStep + 1);
      }, spinDuration);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy">
      {currentStep > 0 && currentStep < topTeams.length && (
        <h2 className="text-4xl font-bold text-white mb-4">{topTeams[currentStep - 1]}</h2>
      )}

      {currentStep === 2 && showTyping && (
        <h2 className="typing-text text-4xl font-bold text-white mb-4 animate-fade-in">
          The Winner’s Trophy Goes To...
        </h2>
      )}

      <div className="lucky-draw-box relative w-80 h-32 border-4 border-yellow-500 rounded-xl shadow-lg bg-white flex items-center justify-center overflow-hidden transition-transform duration-300">
        {isSpinning ? (
          <div className="spinning-teams">
            <span className="team-name text-3xl font-bold">{allTeams[spinningIndex]}</span>
          </div>
        ) : (
          <>
            {currentStep === 3 && (
              <span className="winner-label text-xl font-bold text-yellow-600 animate-lightning">Winner!</span>
            )}
            <span className="winner-name text-3xl font-extrabold text-blue-600">{winner}</span>
          </>
        )}
      </div>

      {currentStep < topTeams.length && (
        <button onClick={handleClick} className="hidden-button mt-4">
          <FaArrowCircleRight className="text-2xl text-gray-400 hover:text-gray-600 transition duration-200" />
        </button>
      )}
    </div>
  );
};

export default Final;
