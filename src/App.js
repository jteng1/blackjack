import React, { Component } from 'react';
import Hand from './components/Hand.jsx';
import Stats from './components/Stats.jsx';
import Chips from './components/Chips.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    // Set the initial state of the application
    this.state = {
      // Game states
      gameStarted: false,
      playerPlaying: false,
      deckId: '',
      // Dealer options and flags
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      dealerHasAce: false,
      dealerHasBlackjack: false,
      dealerSoft: false,
      insurance: false,
      // Player options and flags
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      playerHasBlackjack: false,
      playerSplittable: false,
      // Game Statistics
      playerWins: 0,
      dealerWins: 0,
      pushes: 0,
      playerBlackjacks: 0,
      dealerBlackjacks: 0,
      playerBusts: 0,
      dealerBusts: 0,
      gameMessage: '',
      // Betting options and flags
      initialBuy: 0,
      playerChips: 0,
      betAmount: 0,
      chipsInPlay: 0,
      winAmount: 0,
    };
  }

  // Fetches deck(s) from Deck of Cards API
  componentDidMount() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          deckId: json.deck_id,
        });
      });
  }

  // When End Game is pressed a new deck is drawn, reset state to initial state
  handleEndGame() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          deckId: json.deck_id,
        });
      });
    this.setState({
      gameStarted: false,
      playerPlaying: false,
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      dealerHasAce: false,
      dealerHasBlackjack: false,
      dealerSoft: false,
      insurance: false,
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      playerHasBlackjack: false,
      playerSplittable: false,
      // Game Statistics
      playerWins: 0,
      dealerWins: 0,
      pushes: 0,
      playerBlackjacks: 0,
      dealerBlackjacks: 0,
      playerBusts: 0,
      dealerBusts: 0,
      gameMessage: '',
      // Betting options and flags
      initialBuy: 0,
      playerChips: 0,
      betAmount: 0,
      chipsInPlay: 0,
      winAmount: 0,
    });
  }

  // Handle Buying In Chips Increase buttons
  increaseChipOne = (event) => {
    this.setState({
      initialBuy: this.state.initialBuy + 1,
      playerChips: this.state.playerChips + 1,
    });
  };

  increaseChipFive = (event) => {
    this.setState({
      initialBuy: this.state.initialBuy + 5,
      playerChips: this.state.playerChips + 5,
    });
  };

  increaseChipTen = (event) => {
    this.setState({
      initialBuy: this.state.initialBuy + 10,
      playerChips: this.state.playerChips + 10,
    });
  };

  increaseChipTwentyFive = (event) => {
    this.setState({
      initialBuy: this.state.initialBuy + 25,
      playerChips: this.state.playerChips + 25,
    });
  };

  increaseChipHundred = (event) => {
    this.setState({
      initialBuy: this.state.initialBuy + 100,
      playerChips: this.state.playerChips + 100,
    });
  };

  clearChips = (event) => {
    this.setState({
      initialBuy: 0,
      playerChips: 0,
    });
  };

  // Handle Betting buttons
  increaseBetOne = (event) => {
    if (this.state.betAmount + 1 > this.state.playerChips) {
      this.setState({
        gameMessage: "You don't have enough chips to bet that amount",
      });
    } else {
      this.setState({
        betAmount: this.state.betAmount + 1,
      });
    }
  };

  increaseBetFive = (event) => {
    if (this.state.betAmount + 5 > this.state.playerChips) {
      this.setState({
        gameMessage: "You don't have enough chips to bet that amount",
      });
    } else {
      this.setState({
        betAmount: this.state.betAmount + 5,
      });
    }
  };

  increaseBetTen = (event) => {
    if (this.state.betAmount + 10 > this.state.playerChips) {
      this.setState({
        gameMessage: "You don't have enough chips to bet that amount",
      });
    } else {
      this.setState({
        betAmount: this.state.betAmount + 10,
      });
    }
  };

  increaseBetTwentyFive = (event) => {
    if (this.state.betAmount + 25 > this.state.playerChips) {
      this.setState({
        gameMessage: "You don't have enough chips to bet that amount",
      });
    } else {
      this.setState({
        betAmount: this.state.betAmount + 25,
      });
    }
  };

  increaseBetHundred = (event) => {
    if (this.state.betAmount + 100 > this.state.playerChips) {
      this.setState({
        gameMessage: "You don't have enough chips to bet that amount",
      });
    } else {
      this.setState({
        betAmount: this.state.betAmount + 100,
      });
    }
  };

  increaseBetAllIn = (event) => {
    this.setState({
      betAmount: this.state.playerChips,
    });
  };

  clearBets = (event) => {
    this.setState({
      betAmount: 0,
    });
  };

  // Return corresponding blackjack value from input card value
  returnValue(value) {
    const cardValues = {
      ACE: 11,
      KING: 10,
      QUEEN: 10,
      JACK: 10,
      10: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2,
    };

    return cardValues[value];
  }

  // Handle the initial hand deal, i.e. when Start Game is clicked or when Deal is clicked
  handleDealHand() {
    // If player bet is zero
    if (this.state.playerChips === 0) {
      this.setState({
        gameMessage: `You have no more money! Press NEW GAME to play again.`,
      });
    } else if (this.state.betAmount === 0) {
      this.setState({
        gameMessage: 'You have to bet some money!',
      });
    } else if (this.state.betAmount > this.state.playerChips) {
      this.setState({
        gameMessage: 'You do not have that much money',
      });
    } else {
      // Deal with initial betting
      this.setState({
        betAmount: this.state.betAmount,
        playerChips: this.state.playerChips - this.state.betAmount,
        chipsInPlay: this.state.betAmount,
        gameMessage: 'Choose an action...',
        winAmount: 0,
      });
      // Draw 4 cards from the deck
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`
      )
        .then((res) => res.json())
        .then((json) => {
          // Check remaining cards and shuffle deck if remaining cards is less than 100 cards, or 25% of deck
          console.log(json.remaining);
          if (json.remaining < 100) {
            fetch(
              `https://deckofcardsapi.com/api/deck/${this.state.deckId}/shuffle/`
            )
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                console.log('Deck reshuffled!');
              });
          }

          // Return blackjack values of json card values
          const value0 = this.returnValue(json.cards[0].value);
          const value1 = this.returnValue(json.cards[1].value);
          const value2 = this.returnValue(json.cards[2].value);
          const value3 = this.returnValue(json.cards[3].value);

          // Check if the player has two Aces first or just an Ace, or else set default state
          if (value0 === 11 && value2 === 11) {
            this.setState({
              gameStarted: true,
              playerPlaying: true,
              playerHand: [
                ...this.state.playerHand,
                json.cards[0],
                json.cards[2],
              ],
              playerHasAce: true,
              playerSplittable: true,
              playerScore: 12,
              dealerHand: [
                ...this.state.dealerHand,
                json.cards[1],
                json.cards[3],
              ],
              dealerHasAce: false,
              dealerScore: this.state.dealerScore + value1 + value3,
              dealerInitialScore: value3,
            });
          } else if (value0 === 11 || value2 === 11) {
            this.setState({
              gameStarted: true,
              playerPlaying: true,
              playerHand: [
                ...this.state.playerHand,
                json.cards[0],
                json.cards[2],
              ],
              playerScore: this.state.playerScore + value0 + value2,
              playerHasAce: true,
              dealerHand: [
                ...this.state.dealerHand,
                json.cards[1],
                json.cards[3],
              ],
              dealerHasAce: false,
              dealerScore: this.state.dealerScore + value1 + value3,
              dealerInitialScore: value3,
            });
          } else if (value0 === value2) {
            this.setState({
              gameStarted: true,
              playerPlaying: true,
              playerSplittable: true,
              playerHand: [
                ...this.state.playerHand,
                json.cards[0],
                json.cards[2],
              ],
              playerScore: this.state.playerScore + value0 + value2,
              dealerHand: [
                ...this.state.dealerHand,
                json.cards[1],
                json.cards[3],
              ],
              dealerHasAce: false,
              dealerScore: this.state.dealerScore + value1 + value3,
              dealerInitialScore: value3,
            });
          } else {
            this.setState({
              gameStarted: true,
              playerPlaying: true,
              playerHand: [
                ...this.state.playerHand,
                json.cards[0],
                json.cards[2],
              ],
              playerScore: this.state.playerScore + value0 + value2,
              dealerHand: [
                ...this.state.dealerHand,
                json.cards[1],
                json.cards[3],
              ],
              dealerHasAce: false,
              dealerScore: this.state.dealerScore + value1 + value3,
              dealerInitialScore: value3,
            });
          }
          // Check if dealer has two aces or an ace
          if (value1 === 11 && value3 === 11) {
            this.setState({
              dealerHasAce: true,
              dealerScore: 12,
              insurance: true,
              // gameMessage: 'Insurance?'
            });
          } else if (
            value1 + value3 === 17 &&
            (value1 === 11 || value3 === 11)
          ) {
            this.setState({
              dealerHasAce: true,
              dealerSoft: true,
              dealerScore: 17,
            });
          } else if (value3 === 11) {
            this.setState({
              dealerHasAce: true,
              insurance: true,
              // gameMessage: 'Insurance?'
            });
          } else if (value1 === 11 || value3 === 11) {
            this.setState({
              dealerHasAce: true,
            });
          }
          // After the ace checks
          this.blackJackChecker();
        })
        .catch((err) => console.log(err));
    }
  }

  // Checks for blackjack
  blackJackChecker() {
    // Check for player blackjack
    if (
      this.returnValue(this.state.playerHand[0].value) === 10 &&
      this.returnValue(this.state.playerHand[1].value) === 11
    ) {
      this.setState({
        playerHasBlackjack: true,
      });
    } else if (
      this.returnValue(this.state.playerHand[1].value) === 10 &&
      this.returnValue(this.state.playerHand[0].value) === 11
    ) {
      this.setState({
        playerHasBlackjack: true,
      });
    }

    // Check for dealer blackjack
    if (
      this.returnValue(this.state.dealerHand[0].value) === 10 &&
      this.returnValue(this.state.dealerHand[1].value) === 11
    ) {
      this.setState({
        dealerHasBlackjack: true,
      });
    } else if (
      this.returnValue(this.state.dealerHand[1].value) === 10 &&
      this.returnValue(this.state.dealerHand[0].value) === 11
    ) {
      this.setState({
        dealerHasBlackjack: true,
      });
    }

    // Check who has blackjacks and award chips accordingly
    if (this.state.playerHasBlackjack && this.state.dealerHasBlackjack) {
      this.setState({
        playerPlaying: false,
        pushes: this.state.pushes + 1,
        playerChips: this.state.playerChips + this.state.chipsInPlay,
        chipsInPlay: 0,
        gameMessage: 'Push! You both have a Blackjack!',
      });
    } else if (this.state.playerHasBlackjack) {
      this.setState({
        playerPlaying: false,
        playerWins: this.state.playerWins + 1,
        playerBlackjacks: this.state.playerBlackjacks + 1,
        playerChips:
          this.state.playerChips +
          this.state.betAmount +
          (3 * this.state.chipsInPlay) / 2,
        winAmount: (3 * this.state.chipsInPlay) / 2,
        chipsInPlay: 0,
        gameMessage: 'Blackjack!',
      });
    } else if (this.state.dealerHasBlackjack) {
      this.setState({
        playerPlaying: false,
        dealerWins: this.state.dealerWins + 1,
        dealerBlackjacks: this.state.dealerBlackjacks + 1,
        chipsInPlay: 0,
        gameMessage: 'Dealer has a Blackjack!',
      });
    }
  }

  // Checks if the player bust, if there is an ace in hand subtract 10 and set playerHasAce to false
  bustChecker() {
    if (this.state.playerHasAce && this.state.playerScore > 21) {
      this.setState({
        playerScore: this.state.playerScore - 10,
        playerHasAce: false,
      });
    } else if (this.state.playerScore > 21) {
      this.setState({
        playerPlaying: false,
        dealerWins: this.state.dealerWins + 1,
        playerBusts: this.state.playerBusts + 1,
        chipsInPlay: 0,
        gameMessage: 'You Busted!',
      });
    }
  }

  // Determines winner of hand
  checkWinner() {
    if (this.state.dealerScore > 21) {
      this.setState({
        // Set statistics
        playerWins: this.state.playerWins + 1,
        dealerBusts: this.state.dealerBusts + 1,
        // Set chips, 2 times chips in play if you win
        playerChips: this.state.playerChips + 2 * this.state.chipsInPlay,
        winAmount: this.state.chipsInPlay,
        chipsInPlay: 0,
        gameMessage: 'Dealer busts, you win!',
      });
    } else if (
      this.state.playerScore > this.state.dealerScore &&
      this.state.playerScore <= 21
    ) {
      this.setState({
        // Set statistics
        playerWins: this.state.playerWins + 1,
        // Set chips, 2 times chips in play if you win
        playerChips: this.state.playerChips + 2 * this.state.chipsInPlay,
        winAmount: this.state.chipsInPlay,
        chipsInPlay: 0,
        gameMessage: `You win!`,
      });
    } else if (this.state.playerScore === this.state.dealerScore) {
      this.setState({
        // Set statistics
        pushes: this.state.pushes + 1,
        // Set chips, return original chips in play if push
        playerChips: this.state.playerChips + this.state.chipsInPlay,
        chipsInPlay: 0,
        gameMessage: 'You pushed!',
      });
    } else {
      this.setState({
        // Set statistics
        dealerWins: this.state.dealerWins + 1,
        // Set chips
        chipsInPlay: 0,
        gameMessage: 'You lost!',
      });
    }
  }

  // When player clicks HIT
  handleDrawCardEvent = (event) => {
    if (this.state.playerScore < 21) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then((res) => res.json())
        .then((json) => {
          const newValue = this.returnValue(json.cards[0].value);
          // Handle if player hits multiple aces
          if (newValue === 11 && this.state.playerHasAce) {
            this.setState({
              playerScore: this.state.playerScore - 10,
              playerHasAce: true,
              playerSplittable: false,
            });
          } else if (newValue === 11) {
            this.setState({
              playerHasAce: true,
              playerSplittable: false,
            });
          }
          // Otherwise update player hand and player score from response
          this.setState({
            playerHand: [...this.state.playerHand, json.cards[0]],
            playerScore: this.state.playerScore + newValue,
            playerSplittable: false,
          });
          this.bustChecker();
        })
        .catch((err) => console.log(err));
    }
  };

  // When player clicks STAND, execute dealer hits less than 17
  handleStandEvent = (event) => {
    // If the dealer has an ace and is greater than 21, subtract 10 and set the ace flag to false, recursively call itself
    // Handle soft 17
    if (this.state.dealerSoft) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then((res) => res.json())
        .then((json) => {
          const softHit = this.returnValue(json.cards[0].value);
          this.setState({
            dealerHand: [...this.state.dealerHand, json.cards[0]],
            dealerScore: this.state.dealerScore + softHit,
            dealerSoft: false,
          });
          this.handleStandEvent();
        });
    } else if (this.state.dealerHasAce && this.state.dealerScore === 17) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then((res) => res.json())
        .then((json) => {
          const softHit = this.returnValue(json.cards[0].value);
          this.setState({
            dealerHand: [...this.state.dealerHand, json.cards[0]],
            dealerScore: this.state.dealerScore + softHit,
          });
          this.handleStandEvent();
        });
    } else if (this.state.dealerScore > 21 && this.state.dealerHasAce) {
      this.setState({
        dealerScore: this.state.dealerScore - 10,
        dealerHasAce: false,
      });
      this.handleStandEvent();
    } else if (this.state.dealerScore < 17) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then((res) => res.json())
        .then((json) => {
          const newValue = this.returnValue(json.cards[0].value);
          // Handle if dealer hits multiple aces
          if (newValue === 11 && this.state.dealerHasAce) {
            this.setState({
              dealerScore: this.state.dealerScore - 10,
              dealerHasAce: true,
            });
          } else if (newValue === 11) {
            this.setState({
              dealerHasAce: true,
            });
          }
          this.setState({
            playerPlaying: false,
            dealerHand: [...this.state.dealerHand, json.cards[0]],
            dealerScore: this.state.dealerScore + newValue,
          });
          this.handleStandEvent();
        });
    } else {
      // Check winner because dealer did not bust and has 17 or above
      this.setState({
        playerPlaying: false,
      });
      this.checkWinner();
    }
  };

  // When player clicks DOUBLE DOWN
  handleDoubleDownEvent = (event) => {
    // Handle Double Down Bet
    if (this.state.betAmount > this.state.playerChips) {
      this.setState({
        gameMessage: 'You do not have enough to double down!',
      });
    } else {
      this.setState({
        playerChips: this.state.playerChips - this.state.betAmount,
        chipsInPlay: this.state.chipsInPlay + this.state.betAmount,
      });
      if (this.state.playerScore < 21) {
        fetch(
          `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
        )
          .then((res) => res.json())
          .then((json) => {
            const newValue = this.returnValue(json.cards[0].value);
            // Check if new card is an ace
            if (newValue === 11) {
              this.setState({
                playerHasAce: true,
              });
            }
            this.setState({
              playerHand: [...this.state.playerHand, json.cards[0]],
              playerScore: this.state.playerScore + newValue,
              playerPlaying: false,
            });
            // Check if the double down was a bust, if it was a bust do not execute auto hits for dealer
            this.bustChecker();
            if (this.state.playerScore <= 21) {
              this.handleStandEvent();
            }
          });
      }
    }
  };

  // TODO: When player clicks SPLIT
  handleSplitEvent = (event) => {
    this.setState({
      dealerSplit: false,
    });
  };

  // When player clicks DEAL reset the hand states but not the game states
  handleDealEvent = (event) => {
    this.setState({
      playerPlaying: false,
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      dealerHasAce: false,
      dealerHasBlackjack: false,
      dealerSoft: false,
      insurance: false,
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      playerHasBlackjack: false,
      playerSplittable: false,
      gameMessage: '',
    });
    this.handleDealHand();
  };

  render() {
    return (
      <div className='App'>
        <div className='gameHeader'>
          <h1>Blackjack</h1>
          {/* If game isn't started show Start Game button else show New Deck */}
          {this.state.gameStarted ? (
            <div>
              <button className='sm red' onClick={() => this.handleEndGame()}>
                New Game
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        {this.state.gameMessage ? (
          <h2>{this.state.gameMessage}</h2>
        ) : (
          <h2>Dealer hits on soft 17</h2>
        )}
        {this.state.gameStarted ? (
          <div className='hands-container'>
            <Hand
              name='Dealer'
              cards={this.state.dealerHand}
              score={this.state.dealerScore}
              playerPlaying={this.state.playerPlaying}
              dealerInitialScore={this.state.dealerInitialScore}
            />
            <Hand
              name='Player'
              cards={this.state.playerHand}
              score={this.state.playerScore}
              playerPlaying={this.state.playerPlaying}
              playerSplittable={this.state.playerSplittable}
              handleSplitEvent={this.handleSplitEvent}
              handleDrawCardEvent={this.handleDrawCardEvent}
              handleStandEvent={this.handleStandEvent}
              handleDealEvent={this.handleDealEvent}
              handleDoubleDownEvent={this.handleDoubleDownEvent}
            />
          </div>
        ) : (
          ''
        )}
        <Chips
          playerChips={this.state.playerChips}
          betAmount={this.state.betAmount}
          initialBuy={this.state.initialBuy}
          chipsInPlay={this.state.chipsInPlay}
          winAmount={this.state.winAmount}
          playerPlaying={this.state.playerPlaying}
          gameStarted={this.state.gameStarted}
          // Increase Chips Functions
          increaseChipOne={this.increaseChipOne}
          increaseChipFive={this.increaseChipFive}
          increaseChipTen={this.increaseChipTen}
          increaseChipTwentyFive={this.increaseChipTwentyFive}
          increaseChipHundred={this.increaseChipHundred}
          clearChips={this.clearChips}
          // Bet Functions
          increaseBetOne={this.increaseBetOne}
          increaseBetFive={this.increaseBetFive}
          increaseBetTen={this.increaseBetTen}
          increaseBetTwentyFive={this.increaseBetTwentyFive}
          increaseBetHundred={this.increaseBetHundred}
          increaseBetAllIn={this.increaseBetAllIn}
          clearBets={this.clearBets}
        />
        {!this.state.gameStarted ? (
          <button className='lg purple' onClick={() => this.handleDealHand()}>
            Deal!
          </button>
        ) : (
          ''
        )}
        <Stats
          playerWins={this.state.playerWins}
          dealerWins={this.state.dealerWins}
          playerBlackjacks={this.state.playerBlackjacks}
          dealerBlackjacks={this.state.dealerBlackjacks}
          playerBusts={this.state.playerBusts}
          dealerBusts={this.state.dealerBusts}
          pushes={this.state.pushes}
        />
      </div>
    );
  }
}
