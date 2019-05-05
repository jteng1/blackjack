import React, { Component } from "react";
import Card from "./Card.jsx";

import blankCard from '../images/blankCard.jpg';

export default class Hand extends Component {

  render() {
    let cards;
    if (this.props.cards.length) {
      cards = this.props.cards.map(card => (
        <Card
          key={card.code}
          card={card}
          history={this.props.history}
        />
      ));
    };

    return (
      <div className="Hand">
        {this.props.name === "Dealer" ? (
          <div>
            <h3>{this.props.name}</h3>
            {this.props.playerPlaying ? (
                <h5>{this.props.dealerInitialScore}</h5>
            ) : (
                <h5>{this.props.score}</h5>
            )}
            {/* If the player is playing, then the first card of the dealer is hidden */}
            {this.props.playerPlaying ? (
                <div className="cards-container"><img src={blankCard} alt="cardback" className="blankCard" />{cards[1]}</div>
            ) : (
                <div className="cards-container">{cards}</div> 
            )}
          </div>
          ) : (
            <div className="hand-container">
                <h3>{this.props.name}</h3>
                <h5>{this.props.score}</h5>
                <div className="cards-container">{cards}</div>
                {this.props.playerPlaying ? (
                    <div className="playingButtons">
                        <button
                        className="sm"
                        onClick={event => this.props.handleDrawCardEvent(event)}
                        >
                        Hit
                        </button>
                        <button
                        className="sm"
                        onClick={event => this.props.handleStandEvent(event)}
                        >
                        Stand
                        </button>
                        {this.props.cards.length === 2 ? (
                            <button
                            className="sm"
                            onClick={event => this.props.handleDoubleDownEvent(event)}
                            >
                            Double Down
                            </button>
                        ) : (
                            ""
                        )}
                        {/* Show split button when both cards are the same value - NOT IMPLEMENTED YET*/}
                        {/* {this.props.playerSplittable ? (
                            <button
                            className="sm"
                            onClick={event => this.props.handleSplitEvent(event)}
                            >
                            Split
                            </button>
                        ) : (
                            ""
                        )} */}
                    </div>
                ) : (
                    <button
                    className="sm"
                    onClick={event => this.props.handleDealEvent(event)}
                    >
                    Deal
                    </button>
                )}
                </div>
            )}
      </div>
    )
  }
}
