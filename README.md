## Blackjack created with React

This is my personal recreation of a blackjack application bootstrapped with create-react-app. It was created from scratch with only React and pulls cards from
the Deck of Cards API. It was built without state management and using class based components.

## Play the game

Play blackjack at https://jteng1.github.io/blackjack/

## Demo

![Video Blackjack Demo](demo/blackjack.gif)

## Purpose

I wanted to create a blackjack simulation that I could practice on with a statistics and betting with chips. I also wanted to create it purely in React with no state management to understand the idea of a "Single Source of Truth" and to get a better feel of managing state and passing properties without utilizing a state management system like Redux.

## Rules

Dealer stands on 17<br />
Blackjack pays 3:2<br />
Insurance pays 2:1 (Not available yet) <br />
Max of one split hand (Not available yet) <br />
Push on both player and dealer blackjacks<br />
Six decks in the shoe<br />
Shoe is shuffled after 50% of the cards are dealt<br />

## Installing the app

Clone this repo into a directory<br />
cd directory<br />
npm install<br />
npm start<br />
application will run on localhost:3000<br />

## Versions

1.2.0 - Made UI more mobile friendly
1.1.0 - Released playable build on github-pages<br />
1.0.0 - Added functionality for game<br />

## In Progress

Redo the UI/UX for application<br />
Add split functionality<br />
Add insurance option<br />
Add deck count/customization<br />
Add high score<br />
Add card counting stats <br />
Make responsive<br />

## Known Bugs
