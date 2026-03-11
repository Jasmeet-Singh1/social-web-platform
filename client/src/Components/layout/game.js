import React, { useEffect, useState } from 'react';

export default function Game() {
  const [memoryPattern, setMemoryPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function playSound(colorPressed) {
    var playSound = new Audio('src/Assets/sounds/' + colorPressed + '.mp3');
    playSound.play();
  }

  const handleKeyDown = () => {
    var randomNumber = randomInt(1, 4);
    var randomButtton = document.getElementById(randomNumber);

    var orignalColor = randomButtton.style.backgroundColor;
    randomButtton.style.backgroundColor = 'black';

    playSound(orignalColor);

    setTimeout(() => {
      randomButtton.style.backgroundColor = orignalColor;
    }, 100);
    setMemoryPattern((prev) => [...prev, randomNumber]);
    console.log('inside', memoryPattern);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener();
    };
  }, []);

  useEffect(() => {
    for (var i = 0; i < userPattern.length; i++) {
      if (memoryPattern[i] != userPattern[i]) {
        setMemoryPattern([]);
        setUserPattern([]);
        const main = document.getElementById('mainDiv');
        const originalBackgroundColor = main.style.backgroundColor;
        main.style.backgroundColor = 'red';
        playSound('wrong');

        setTimeout(() => {
          main.style.backgroundColor = originalBackgroundColor;
        }, 200);
        return;
      }
    }

    if (
      memoryPattern.length === userPattern.length &&
      memoryPattern.length != 0
    ) {
      setUserPattern([]);
      handleKeyDown();
    }
  }, [userPattern]);
  console.log('memoryPattern', memoryPattern);
  console.log('userPattern', userPattern);

  return (
    <>
      <div className="press-start-2p-regular header">Press A Key to Start</div>
      <div className="TopDiv">
        <div className="middleDiv">
          <button
            id="1"
            className="btn green"
            style={{ backgroundColor: 'green' }}
            onClick={() => setUserPattern((prev) => [...prev, 1])}
          ></button>
          <button
            id="2"
            className="btn red"
            style={{ backgroundColor: 'red' }}
            onClick={() => setUserPattern((prev) => [...prev, 2])}
          ></button>
        </div>
        <div className="middleDiv">
          <button
            id="3"
            className="btn yellow"
            style={{ backgroundColor: 'yellow' }}
            onClick={() => setUserPattern((prev) => [...prev, 3])}
          ></button>
          <button
            id="4"
            className="btn blue"
            style={{ backgroundColor: 'blue' }}
            onClick={() => setUserPattern((prev) => [...prev, 4])}
          ></button>
        </div>
      </div>
    </>
  );
}
