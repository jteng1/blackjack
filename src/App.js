import React, { Component } from "react";
import Hand from "./components/Hand.js";
import Stats from "./components/Stats.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    // Set the initial state of the application
    this.state = {
      gameStarted: false,
      playerPlaying: false,
      deckId: "",
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      dealerHasAce: false,
      dealerHasBlackjack: false,
      insurance: false,
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      playerHasBlackjack: false,
      // Game Statistics
      playerWins: 0,
      dealerWins: 0,
      pushes: 0,
      playerBlackjacks: 0,
      dealerBlackjacks: 0,
      gameMessage: ""
    };
  };

  // Fetches deck(s) from Deck of Cards API
  componentDidMount() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          deckId: json.deck_id
        });
      });
  };

  // Return blackjack value of input card value 
  returnValue(value) {
    const cardValues = {
      ACE: 11,
      KING: 10,
      QUEEN: 10,
      JACK: 10,
      "10": 10,
      "9": 9,
      "8": 8,
      "7": 7,
      "6": 6,
      "5": 5,
      "4": 4,
      "3": 3,
      "2": 2
    };

    return cardValues[value];
  };

  // Handle the initial hand deal, i.e. when Start Game is clicked
  handleDealHand() {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`)
      .then(res => res.json())
      .then(json => {
        const value0 = this.returnValue(json.cards[0].value);
        const value1 = this.returnValue(json.cards[1].value);
        const value2 = this.returnValue(json.cards[2].value);
        const value3 = this.returnValue(json.cards[3].value);
        // Check if the player has two Aces first or just an Ace, or else set default state 
        if (value0 === 11 && value2 === 11) {
          this.setState({
            gameStarted: true,
            playerPlaying: true,
            playerHand: [...this.state.playerHand, json.cards[0], json.cards[2]],
            playerHasAce: true,
            playerScore: 12,
            dealerHand: [...this.state.dealerHand, json.cards[1], json.cards[3]],
            dealerHasAce: false,
            dealerScore: (this.state.dealerScore += value1 + value3),
            dealerInitialScore: value3
          });
        } else if (value0 === 11 || value2 === 11) {
          this.setState({
            gameStarted: true,
            playerPlaying: true,
            playerHand: [...this.state.playerHand, json.cards[0], json.cards[2]],
            playerScore: (this.state.playerScore += value0 + value2),
            playerHasAce: true,
            dealerHand: [...this.state.dealerHand, json.cards[1], json.cards[3]],
            dealerHasAce: false,
            dealerScore: (this.state.dealerScore += value1 + value3),
            dealerInitialScore: value3
          })
        } else {
          this.setState({
            gameStarted: true,
            playerPlaying: true,
            playerHand: [...this.state.playerHand, json.cards[0], json.cards[2]],
            playerScore: (this.state.playerScore += value0 + value2),
            dealerHand: [...this.state.dealerHand, json.cards[1], json.cards[3]],
            dealerHasAce: false,
            dealerScore: (this.state.dealerScore += value1 + value3),
            dealerInitialScore: value3
          });
        };
        // Check if dealer has two aces or an ace
        if (value1 === 11 && value3 === 11) {
          this.setState({
            dealerHasAce: true,
            dealerScore: 12,
            insurance: true,
            gameMessage: "Insurance?"
          });
        } else if (value3 === 11) {
          this.setState({
            dealerHasAce: true,
            insurance: true,
            gameMessage: "Insurance?"
          });
        } else if (value1 === 11 || value3 === 11) {
          this.setState({
            dealerHasAce: true
          })
        }
        // After the ace checks
        this.blackJackChecker();
      });
  };

  // When End Game is pressed a new deck is drawn, reset state to initial state
  handleEndGame() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        deckId: json.deck_id
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
      insurance: false,
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      playerHasBlackjack: false,
      // Game Statistics
      playerWins: 0,
      dealerWins: 0,
      pushes: 0,
      playerBlackjacks: 0,
      dealerBlackjacks: 0,
      gameMessage: ""
    });
  };

  // Checks for blackjack
  blackJackChecker() {
    
    // Check for player blackjack
    if (this.returnValue(this.state.playerHand[0].value) === 10 && this.returnValue(this.state.playerHand[1].value) === 11) {
      this.setState({
        playerHasBlackjack: true,
        playerPlaying: false,
      });
    } else if (this.returnValue(this.state.playerHand[1].value) === 10 && this.returnValue(this.state.playerHand[0].value) === 11) {
      this.setState({
        playerHasBlackjack: true,
        playerPlaying: false,
      });
    };

    // Check for dealer blackjack
    if (this.returnValue(this.state.dealerHand[0].value) === 10 && this.returnValue(this.state.dealerHand[1].value) === 11) {
      this.setState({
        dealerHasBlackjack: true,
        playerPlaying: false,
      });
    } else if (this.returnValue(this.state.dealerHand[1].value) === 10 && this.returnValue(this.state.dealerHand[0].value) === 11) {
      this.setState({
        dealerHasBlackjack: true,
        playerPlaying: false,
      });
    };

    // Check who has blackjacks
    if (this.state.playerHasBlackjack && this.state.dealerHasBlackjack) {
      this.setState({
        pushes: this.state.pushes + 1,
        gameMessage: "Push! You both have a Blackjack!"
      });
    } else if (this.state.playerHasBlackjack) {
      this.setState({
        playerWins: this.state.playerWins + 1,
        playerBlackjacks: this.state.playerBlackjacks + 1,
        gameMessage: "Blackjack!"
      });
    } else if (this.state.dealerHasBlackjack) {
      this.setState({
        dealerWins: this.state.dealerWins + 1,
        dealerBlackjacks: this.state.dealerBlackjacks + 1,
        gameMessage: "Dealer has a Blackjack!"
      });
    };
  };

  // Checks if the player bust
  bustChecker() {
    if (this.state.playerHasAce && this.state.playerScore > 21) {
      this.setState({
        playerScore: this.state.playerScore - 10,
        playerHasAce: false
      })
    } else if (this.state.playerScore > 21) {
      this.setState({
        playerPlaying: false,
        dealerWins: this.state.dealerWins + 1,
        gameMessage: "You Busted!"
      });
    };
  };

  // Determines winner of hand
  checkWinner() {
    if (this.state.dealerScore > 21) {
      this.setState({
        playerWins: this.state.playerWins + 1,
        gameMessage: "Dealer busts, you win!"
      });
    } else if (this.state.playerScore > this.state.dealerScore && this.state.playerScore <= 21) {
      this.setState({
        playerWins: this.state.playerWins + 1,
        gameMessage: "You win!"
      });
    } else if (this.state.playerScore === this.state.dealerScore) {
      this.setState({
        pushes: this.state.pushes + 1,
        gameMessage: "You pushed!"
      });
    } else {
      this.setState({
        dealerWins: this.state.dealerWins + 1,
        gameMessage: "You lost!"
      });
    };
  };

  // When player clicks HIT
  handleDrawCardEvent = event => {
    if (this.state.playerScore < 21) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          if (newValue === 11) {
            this.setState({
              playerHasAce: true
            });
          };
          this.setState({
            playerHand: [...this.state.playerHand, json.cards[0]],
            playerScore: (this.state.playerScore += newValue)
          });
          this.bustChecker();
        });
    };
  };

  // When player clicks STAND, execute dealer hits less than 17
  handleStandEvent = event => {
    // If the dealer has an ace and is greater than 21, subtract 10 and set the ace flag to false, recursively call itself
    if (this.state.dealerScore > 21 && this.state.dealerHasAce) {
      this.setState({
        dealerScore: this.state.dealerScore - 10,
        dealerHasAce: false
      });
      this.handleStandEvent();
    } else if (this.state.dealerScore < 17) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          if (newValue === 11) {
            this.setState({
              dealerHasAce: true
            });
          };
          this.setState({
            playerPlaying: false,
            dealerHand: [...this.state.dealerHand, json.cards[0]],
            dealerScore: (this.state.dealerScore += newValue)
          });
          this.handleStandEvent();
        });
    } else {
      this.setState({
        playerPlaying: false
      });
      this.checkWinner();
    };
  };

  // When player clicks DOUBLE DOWN
  handleDoubleDownEvent = event => {
    if (this.state.playerScore < 21) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          if (newValue === 11) {
            this.setState({
              playerHasAce: true
            });
          };
          this.setState({
            playerHand: [...this.state.playerHand, json.cards[0]],
            playerScore: (this.state.playerScore += newValue),
            playerPlaying: false
          });
          // Check if the double down was a bust, if it was a bust do not execute auto hits for dealer
          this.bustChecker();
          if (this.state.playerScore <= 21) {
            this.handleStandEvent();
          };
        });
    };
  };

  // When player clicks DEAL
  handleDealEvent = event => {
    this.setState({
      gameStarted: false,
      playerPlaying: false,
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      dealerHasAce: false,
      dealerHasBlackjack: false,
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      playerHasBlackjack: false,
      gameMessage: ""
    });
    this.handleDealHand();
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1>Blackjack</h1>
          <h3>Dealer stands on 17</h3>
          {this.state.gameStarted ? (
            <div>
              <button className="lg red" onClick={() => this.handleEndGame()}>
                New Deck
              </button>
              <Stats 
              playerWins={this.state.playerWins}
              dealerWins={this.state.dealerWins}
              playerBlackjacks={this.state.playerBlackjacks}
              dealerBlackjacks={this.state.dealerBlackjacks}
              pushes={this.state.pushes}
              />
            </div>
          ) : (
            <button className="lg" onClick={() => this.handleDealHand()}>
              Start Game
            </button>
          )}
        </div>
        {this.state.gameStarted ? (
          <div className="hands-container">
            <Hand
              name="Player"
              cards={this.state.playerHand}
              score={this.state.playerScore}
              playerPlaying={this.state.playerPlaying}
              handleDrawCardEvent={this.handleDrawCardEvent}
              handleStandEvent={this.handleStandEvent}
              handleDealEvent={this.handleDealEvent}
              handleDoubleDownEvent={this.handleDoubleDownEvent}
            />
            <Hand
              name="Dealer"
              cards={this.state.dealerHand}
              score={this.state.dealerScore}
              playerPlaying={this.state.playerPlaying}
              dealerInitialScore={this.state.dealerInitialScore}
            />
          </div>
        ) : (
          ""
        )}
      <h3>{this.state.gameMessage}</h3>
      </div>
    );
  };
};
