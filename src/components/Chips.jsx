import React, { Component } from 'react';

export default class Chips extends Component {
  render() {
    return (
      <div className='chips-container'>
        {/* If game is not started then show player chips buttons */}
        {this.props.gameStarted === false ? (
          <div className='buyInButtons'>
            <button
              className='sm'
              onClick={(event) => this.props.increaseChipOne(event)}
            >
              $1
            </button>
            <button
              className='sm'
              onClick={(event) => this.props.increaseChipFive(event)}
            >
              $5
            </button>
            <button
              className='sm'
              onClick={(event) => this.props.increaseChipTen(event)}
            >
              $10
            </button>
            <button
              className='sm'
              onClick={(event) => this.props.increaseChipTwentyFive(event)}
            >
              $25
            </button>
            <button
              className='sm'
              onClick={(event) => this.props.increaseChipHundred(event)}
            >
              $100
            </button>
            <button
              className='sm red'
              onClick={(event) => this.props.clearChips(event)}
            >
              Clear Chips
            </button>
            <h1>Buy-In Amount</h1>
            <h1>${this.props.playerChips.toFixed(2)}</h1>
            <h1>Initial Bet</h1>
            <h1>${this.props.betAmount.toFixed(2)}</h1>
            <div className='chipBets'>
              {/* If player is not playing AND playerChips is not zero then show bet buttons */}
              {this.props.playerPlaying === false &&
              this.props.playerChips !== 0 ? (
                <div className='chipButtons'>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetOne(event)}
                  >
                    $1
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetFive(event)}
                  >
                    $5
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetTen(event)}
                  >
                    $10
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetTwentyFive(event)}
                  >
                    $25
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetHundred(event)}
                  >
                    $100
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetAllIn(event)}
                  >
                    Max Bet
                  </button>
                  <button
                    className='sm red'
                    onClick={(event) => this.props.clearBets(event)}
                  >
                    Clear Bets
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          <div className='chipStats'>
            <div className='chipBets'>
              {/* If player is not playing AND playerChips is not zero then show bet buttons */}
              {this.props.playerPlaying === false &&
              this.props.playerChips !== 0 ? (
                <div className='chipButtons'>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetOne(event)}
                  >
                    $1
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetFive(event)}
                  >
                    $5
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetTen(event)}
                  >
                    $10
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetTwentyFive(event)}
                  >
                    $25
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetHundred(event)}
                  >
                    $100
                  </button>
                  <button
                    className='sm'
                    onClick={(event) => this.props.increaseBetAllIn(event)}
                  >
                    Max Bet
                  </button>
                  <button
                    className='sm red'
                    onClick={(event) => this.props.clearBets(event)}
                  >
                    Clear Bets
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
            <h2>Bet ${this.props.betAmount.toFixed(2)}</h2>
            <h2>Player Chips ${this.props.playerChips.toFixed(2)}</h2>
            <h5>Chips in Play $ {this.props.chipsInPlay.toFixed(2)}</h5>
            <h5>Win Amount $ {this.props.winAmount.toFixed(2)}</h5>
            <h3>Initial Buy-In $ {this.props.initialBuy.toFixed(2)}</h3>
          </div>
        )}
      </div>
    );
  }
}
