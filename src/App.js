import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Photo1 from './images/photos/1.JPG';
import Photo2 from './images/photos/2.JPG';
import Photo3 from './images/photos/3.JPG';
import Photo4 from './images/photos/4.JPG';
import Photo5 from './images/photos/5.JPG';
import Photo6 from './images/photos/6.JPG';
import Photo7 from './images/photos/7.JPG';
import Photo8 from './images/photos/8.JPG';
import Photo9 from './images/photos/9.JPG';
import Photo10 from './images/photos/10.JPG';

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [newGameBtnDisabled, setNewGameBtnDisabled] = useState(true);

  const shuffleCards = async () => {
    let newCards = [
      {
        name: 1,
        imageUrl: Photo1,
        matched: false
      },
      {
        name: 2,
        imageUrl: Photo2,
        matched: false
      },
      {
        name: 3,
        imageUrl: Photo3,
        matched: false
      },
      {
        name: 4,
        imageUrl: Photo4,
        matched: false
      },
      {
        name: 5,
        imageUrl: Photo5,
        matched: false
      },
      {
        name: 6,
        imageUrl: Photo6,
        matched: false
      },
      {
        name: 7,
        imageUrl: Photo7,
        matched: false
      },
      {
        name: 8,
        imageUrl: Photo8,
        matched: false
      },
      {
        name: 9,
        imageUrl: Photo9,
        matched: false
      },
      {
        name: 10,
        imageUrl: Photo10,
        matched: false
      }
    ];
    // const requests = [];
    // for(let i = 0; i < 8; i++) {
    //   const randomNumber = Math.floor(Math.random() * 200) + 1;
    //   requests.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`))

    // }
    // await Promise.all(requests)
    //   .then(res => Promise.all(res.map(r => r.json())))
    //   .then(data => {
    //     data.forEach(d => 
    //       newCards.push({
    //         name: d.name,
    //         imageUrl: d.sprites.front_default,
    //         matched: false
    //       })
    //     )
    //   }).then(() => {
    //     const doubleNewCards = [...newCards, ...newCards]
    //     .sort(() => Math.random() - 0.5)
    //     .map((card) => ({ ...card, id: Math.random() }));
    //     setChoiceOne(null);
    //     setChoiceTwo(null);
    //     setCards(doubleNewCards);
    //     setTurns(0);
    //   }).then(() => {
    //     setNewGameBtnDisabled(false)
    //   })
    
    const doubleNewCards = [...newCards, ...newCards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(doubleNewCards);
        setTurns(0);
        setNewGameBtnDisabled(false)
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
