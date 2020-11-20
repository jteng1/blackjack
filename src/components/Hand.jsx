import React, { Component } from 'react';
import Card from './Card.jsx';

import blankCard from '../images/blankCard.jpg';

export default class Hand extends Component {
  render() {
    let cards;
    if (this.props.cards.length) {
      cards = this.props.cards.map((card) => (
        <Card key={card.code} card={card} history={this.props.history} />
      ));
    }

    return (
      <div className='Hand'>
        {this.props.name === 'Dealer' ? (
          <div className='hand-container'>
            {this.props.playerPlaying ? (
              <h3>
                {this.props.name} {this.props.dealerInitialScore}
              </h3>
            ) : (
              <h3>
                {this.props.name} {this.props.score}
              </h3>
            )}
            {/* Show blank cards when not ready */}
            {this.props.cards.length == 0 ? (
              <div className='cards-container'>
                <img src={blankCard} alt='cardback' className='blankCard' />
                <img src={blankCard} alt='cardback' className='blankCard' />
              </div>
            ) : (
              ''
            )}
            {/* If the player is playing, then the first card of the dealer is hidden */}
            {this.props.playerPlaying ? (
              <div className='cards-container'>
                <img src={blankCard} alt='cardback' className='blankCard' />
                {cards[1]}
              </div>
            ) : (
              <div className='cards-container'>{cards}</div>
            )}
          </div>
        ) : (
          <div className='hand-container'>
            <h3>
              {this.props.name} {this.props.score}
            </h3>
            {/* Show blank cards when not ready */}
            {this.props.cards.length == 0 ? (
              <div className='cards-container'>
                <img src={blankCard} alt='cardback' className='blankCard' />
                <img src={blankCard} alt='cardback' className='blankCard' />
              </div>
            ) : (
              ''
            )}
            <div className='cards-container'>{cards}</div>
            {this.props.playerPlaying ? (
              <div className='playingButtons'>
                <button
                  className='sm'
                  onClick={(event) => this.props.handleDrawCardEvent(event)}
                >
                  Hit
                </button>
                <button
                  className='sm'
                  onClick={(event) => this.props.handleStandEvent(event)}
                >
                  Stand
                </button>
                {this.props.cards.length === 2 ? (
                  <button
                    className='sm'
                    onClick={(event) => this.props.handleDoubleDownEvent(event)}
                  >
                    Double Down
                  </button>
                ) : (
                  ''
                )}
                {/* TODO: Show split button when both cards are the same value */}
                {/* {this.props.playerSplittable ? (
                  <button
                    className='sm'
                    onClick={(event) => this.props.handleSplitEvent(event)}
                  >
                    Split
                  </button>
                ) : (
                  ''
                )} */}
              </div>
            ) : (
              <button
                className='lg purple'
                onClick={(event) => this.props.handleDealEvent(event)}
              >
                Deal
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
