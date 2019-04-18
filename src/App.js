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
      playerHand: [],
      playerScore: 0
    }
  }

  // Fetches deck from Deck of Cards API
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

  // When Start Game is pressed
  handleStartGame() {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`)
      .then(res => res.json())
      .then(json => {
        const value0 = this.returnValue(json.cards[0].value);
        const value1 = this.returnValue(json.cards[1].value);
        const value2 = this.returnValue(json.cards[2].value);
        const value3 = this.returnValue(json.cards[3].value);
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
      playerHand: [],
      playerScore: 0
    });
  }

  blackJackChecker() {
    if (this.returnValue(this.state.playerHand[0].value) === 10 && this.returnValue(this.state.playerHand[1].value) === 11) {
      this.setState({
        playerScore: 21,
        playerPlaying: false
      })
      console.log("Blackjack!")
    }
    if (this.returnValue(this.state.playerHand[1].value) === 10 && this.returnValue(this.state.playerHand[0].value) === 11) {
      this.setState({
        playerScore: 21,
        playerPlaying: false
      })
      console.log("Blackjack!")
    }
  }

  bustChecker() {
    if (this.state.playerScore > 21) {
      console.log("You Busted!")
      this.setState({
        playerPlaying: false
      })
    }
  }

  checkWinner() {
    if (this.state.dealerScore > 21) {
      console.log("Dealer busts, you win!")
    } else if (this.state.playerScore > this.state.dealerScore) {
      console.log("You Win!")
    } else if (this.state.playerScore === this.state.dealerScore) {
      console.log("You Pushed!")
    } else {
      console.log("You Lost!")
    }
  }

  // When player clicks HIT
  handleDrawCard = event => {
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
          this.checkWinner();
        });
    } else {
      this.setState({
        playerPlaying: false
      })
      this.checkWinner();
    }
  }

  // When player clicks DEAL
  handleDealEvent = event => {
    this.setState({
      gameStarted: false,
      playerPlaying: false,
      dealerHand: [],
      dealerScore: 0,
      dealerInitialScore: 0,
      playerHand: [],
      playerScore: 0
    });
    this.handleStartGame()
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
            <button className="lg" onClick={() => this.handleStartGame()}>
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
              handleDrawCard={this.handleDrawCard}
              handleStandEvent={this.handleStandEvent}
              handleDealEvent={this.handleDealEvent}
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
