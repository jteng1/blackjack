import React, { Component } from "react";
import Hand from "./components/Hand.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      playerPlaying: false,
      deckId: "",
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      dealerHasAce: false,
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      gameMessage: "",
    }
  }

  // Fetches deck(s) from Deck of Cards API
  componentDidMount() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          deckId: json.deck_id
        })
      })
  }

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
  }

  // When Start Game is clicked
  handleDealHand() {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`)
      .then(res => res.json())
      .then(json => {
        const value0 = this.returnValue(json.cards[0].value);
        const value1 = this.returnValue(json.cards[1].value);
        const value2 = this.returnValue(json.cards[2].value);
        const value3 = this.returnValue(json.cards[3].value);
        if (value0 === 11 || value2 === 11) {
          this.setState({
            playerHasAce: true
          })
          console.log("Player has an Ace")
        }
        
        if (value1 === 11 || value3 === 11) {
          this.setState({
            dealerHasAce: true
          })
          console.log("Dealer has an Ace")
        }
        this.setState({
          gameStarted: true,
          playerPlaying: true,
          dealerHand: [...this.state.dealerHand, json.cards[1], json.cards[3]],
          dealerScore: (this.state.dealerScore += value1 + value3),
          dealerInitialScore:  value3,
          playerHand: [...this.state.playerHand, json.cards[0], json.cards[2]],
          playerScore: (this.state.playerScore += value0 + value2)
        });
        this.blackJackChecker();
      });
  }

  // When End Game is pressed a new deck is drawn
  handleEndGame() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        deckId: json.deck_id
      })
    })
    this.setState({
      gameStarted: false,
      playerPlaying: false,
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      dealerHasAce: false,
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      gameMessage: ""
    });
  }

  // Checks for blackjack
  blackJackChecker() {
    if (this.returnValue(this.state.playerHand[0].value) === 10 && this.returnValue(this.state.playerHand[1].value) === 11) {
      this.setState({
        playerScore: 21,
        playerPlaying: false,
        gameMessage: "You got a Blackjack!"
      })
    }
    if (this.returnValue(this.state.playerHand[1].value) === 10 && this.returnValue(this.state.playerHand[0].value) === 11) {
      this.setState({
        playerScore: 21,
        playerPlaying: false,
        gameMessage: "You got a Blackjack!"
      })
    }
  }

  // Checks player bust
  bustChecker() {
    if (this.state.playerHasAce && this.state.playerScore > 21) {
      this.setState({
        playerScore: this.state.playerScore - 10,
        playerHasAce: false
      })
    } else if (this.state.playerScore > 21) {
      this.setState({
        playerPlaying: false,
        gameMessage: "You Busted!"
      })
    }
  }

  // Determines winner of hand
  checkWinner() {
    if (this.state.dealerScore > 21) {
      this.setState({
        gameMessage: "Dealer busts, you win!"
      })
    } else if (this.state.playerScore > this.state.dealerScore && this.state.playerScore <= 21) {
      this.setState({
        gameMessage: "You win!"
      })
    } else if (this.state.playerScore === this.state.dealerScore) {
      this.setState({
        gameMessage: "You pushed!"
      })
    } else {
      this.setState({
        gameMessage: "You lost!"
      })
    }
  }

  // When player clicks HIT
  handleDrawCardEvent = event => {
    const hand = event.target.value + "Hand";
    const score = event.target.value + "Score";
    if (this.state[score] < 21) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          if (newValue === 11) {
            this.setState({
              playerHasAce: true
            })
          }
          this.setState({
            [hand]: [...this.state[hand], json.cards[0]],
            [score]: (this.state[score] += newValue)
          })
          this.bustChecker()
        })
    } 
  };

  // When player clicks STAND
  handleStandEvent = event => {
    if (this.state.dealerScore < 17) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          this.setState({
            playerPlaying: false,
            dealerHand: [...this.state.dealerHand, json.cards[0]],
            dealerScore: (this.state.dealerScore += newValue)
          });
          this.handleStandEvent()
        });
    } else {
      this.setState({
        playerPlaying: false
      })
      this.checkWinner();
    }
  }

  // When player clicks DOUBLE DOWN
  handleDoubleDownEvent = event => {
    const hand = event.target.value + "Hand";
    const score = event.target.value + "Score";
    if (this.state[score] < 21) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          this.setState({
            [hand]: [...this.state[hand], json.cards[0]],
            [score]: (this.state[score] += newValue),
            playerPlaying: false
          })
          this.bustChecker();
          this.handleStandEvent();
        })
    } 
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
      playerHand: [],
      playerScore: 0,
      playerHasAce: false,
      gameMessage: ""
    });
    this.handleDealHand()
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Blackjack</h1>
          {this.state.gameStarted ? (
            <button className="lg red" onClick={() => this.handleEndGame()}>
              End Game
            </button>
          ) : (
            <button className="lg" onClick={() => this.handleDealHand()}>
              Start Game
            </button>
          )}
          <h3>{this.state.gameMessage}</h3>
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
      </div>
    );
  }
}
