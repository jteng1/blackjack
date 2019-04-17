import React, { Component } from "react";
import Hand from "./components/Hand.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      deckId: "",
      dealerHand: [],
      dealerScore: 0,
      playerHand: [],
      playerScore: 0
    }
  }

  componentDidMount() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          deckId: json.deck_id
        })
      })
  }

  returnValue(value) {
    const cardValues = {
      ACE: 1,
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

  initialDeal() {
    
  }


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
          dealerHand: [...this.state.dealerHand, json.cards[1], json.cards[3]],
          dealerScore: (this.state.dealerScore += value1 + value3),
          playerHand: [...this.state.playerHand, json.cards[0], json.cards[2]],
          playerScore: (this.state.playerScore += value0 + value2)
        });
        this.blackJackChecker();
      });
  }

  handleEndGame() {
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        deckId: json.deck_id
      })
    })
    this.setState({
      gameStarted: false,
      dealerHand: [],
      dealerScore: 0,
      playerHand: [],
      playerScore: 0
    });
  }

  handleEndHand() {
    fetch(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`
    )
    .then(res => res.json())
    .then(json => {
      const value0 = this.returnValue(json.cards[0].value);
      const value1 = this.returnValue(json.cards[1].value);
      const value2 = this.returnValue(json.cards[2].value);
      const value3 = this.returnValue(json.cards[3].value);
      this.setState({
        gameStarted: true,
        dealerHand: [...this.state.dealerHand, json.cards[1], json.cards[3]],
        dealerScore: (this.state.dealerScore += value1 + value3),
        playerHand: [...this.state.playerHand, json.cards[0], json.cards[2]],
        playerScore: (this.state.playerScore += value0 + value2)
      });
      this.blackJackChecker();
    })
    this.setState({
      gameStarted: true,
      dealerHand: [],
      dealerScore: 0,
      playerHand: [],
      playerScore: 0
    });
  }

  blackJackChecker() {
    if (this.returnValue(this.state.playerHand[0].value) === 10 && this.returnValue(this.state.playerHand[1].value) === 1) {
      this.setState({
        playerScore: 21
      })
      console.log("Blackjack!")
    }
    if (this.returnValue(this.state.playerHand[1].value) === 10 && this.returnValue(this.state.playerHand[0].value) === 1) {
      this.setState({
        playerScore: 21
      })
      console.log("Blackjack!")
    }
  }

  bustChecker() {
    if (this.state.playerScore > 21) {
      console.log("You Busted!")
    }
  }



  handleDrawCard = event => {
    const hand = event.target.value + "Hand";
    const score = event.target.value + "Score";
    this.bustChecker()
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
          });
        });
    }
  };

  handleStandEvent = event => {
    if (this.state.dealerScore < 17) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          this.setState({
            dealerHand: [...this.state.dealerHand, json.cards[0]],
            dealerScore: (this.state.dealerScore += newValue)
          });
        });
    }
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
        {this.state.dealerHand.length > 0 ? (
          <div className="hands-container">
            <Hand
              name="Player"
              cards={this.state.playerHand}
              score={this.state.playerScore}
              handleDrawCard={this.handleDrawCard}
              handleStandEvent={this.handleStandEvent}
            />
            <Hand
              name="Dealer"
              cards={this.state.dealerHand}
              firstCard={this.state.dealerHand[1]}
              score={this.state.dealerScore}
              firstScore={this.returnValue(this.state.dealerHand[1].value)}
              handleDrawCard={this.handleDrawCard}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
