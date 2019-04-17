import React, { Component } from "react";
import Card from "./Card.js";

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
    }

    return (
      <div className={this.props.name + " Hand"}>
        {this.props.name === "Dealer" ? (
          <div>
            <h3>{this.props.name}</h3>
            <h5>{this.props.score}</h5>
            <div className="cards-container">{cards}</div>
          </div>
          ) : (
            <div>
            <h3>{this.props.name}</h3>
            <h5>{this.props.score}</h5>
            <button
              className="sm"
              onClick={event => this.props.handleDrawCard(event)}
              value={this.props.name.toLowerCase()}
            >
              Hit
            </button>
            <button
              className="sm"
              onClick={event => this.props.handleStandEvent(event)}
              value={this.props.name.toLowerCase()}
            >
              Stand
            </button>

            <div className="cards-container">{cards}</div>
            </div>
          )}
      </div>
    );
  }
}
