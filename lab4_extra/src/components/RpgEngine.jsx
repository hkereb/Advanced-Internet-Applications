import React, { useState, useEffect } from 'react';

function RpgEngine() {
  const [story, setStory] = useState(null);
  const [currentId, setCurrentId] = useState('start');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('/story.json')
      .then((res) => res.json())
      .then(setStory);
  }, []);

  const handleChoice = (choice) => {
    if (choice.chance !== undefined) {
      const success = Math.random() < choice.chance;
      setMessage(success ? "Your attempt is SUCCESSFUL!" : "Your attempt FAILS...");
      setCurrentId(success ? choice.next : choice.alt_next || choice.next);
    } else {
      setMessage(null);
      setCurrentId(choice.next);
    }
  };


  const restartGame = () => {
    setCurrentId('start');
    setMessage(null);
  };

  if (!story) return <p>Loading...</p>;
  const current = story[currentId];
  if (!current) return <p>Error: no continuation</p>;

  const isEnd = !current.choices || current.choices.length === 0;

  const containerStyle = current.background
    ? {
      backgroundImage: `url(${current.background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '40px',
    }
    : {
      backgroundColor: '#121212',
      minHeight: '100vh',
      padding: '40px',
    };

  return (
    <div style={containerStyle}>
      {!isEnd && (
        <button className="restart-button-def"
          onClick={restartGame}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          <span className="material-icons">restart_alt</span>
        </button>
      )}

      <div className="box">
        {message && <p className="message">{message}</p>}
        <p className="text">{current.text}</p>

        {isEnd ? (
          <button onClick={restartGame} className="restart-button">
            Play Again
          </button>
        ) : (
          <div className="choices">
            {current.choices.map((choice, index) => (
              <button key={index} onClick={() => handleChoice(choice)}>
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RpgEngine;
