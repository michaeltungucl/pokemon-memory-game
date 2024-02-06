import React from 'react';
import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img 
          className='card front' 
          src={card.imageUrl} 
          alt='card front' />
        <div 
          className='back' 
          alt='card back'
          onClick={handleClick} />
      </div>
    </div>
  )
}

export default SingleCard
