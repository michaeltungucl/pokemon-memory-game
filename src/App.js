import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [newGameBtnDisabled, setNewGameBtnDisabled] = useState(true);

  const shuffleCards = async () => {
    let newCards = [];
    const requests = [];
    for(let i = 0; i < 8; i++) {
      const randomNumber = Math.floor(Math.random() * 200) + 1;
      requests.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`))

    }
    await Promise.all(requests)
      .then(res => Promise.all(res.map(r => r.json())))
      .then(data => {
        data.forEach(d => 
          newCards.push({
            name: d.name,
            imageUrl: d.sprites.front_default,
            matched: false
          })
        )
      }).then(() => {
        const doubleNewCards = [...newCards, ...newCards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(doubleNewCards);
        setTurns(0);
      }).then(() => {
        setNewGameBtnDisabled(false)
      })
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  }

  useEffect(() => {
    shuffleCards();
  }, [])

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.name === choiceTwo.name) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.name === choiceOne.name) {
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 500)
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <div className='container'>
      <button className='button' onClick={shuffleCards} disabled={newGameBtnDisabled}>New Game</button>
      <p className='turns'>Turns: {turns}</p>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}/>
        ))}
      </div>
    </div>
  )
}

export default App
