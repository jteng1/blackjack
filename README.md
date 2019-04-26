## Blackjack created with React

This is my personal recreation of a blackjack application bootstrapped with create-react-app. It was created from scratch with only React and pulls cards from
the Deck of Cards API.

## Purpose
I wanted to create a blackjack simulation that I could practice on with a stats counter and real betting. I also wanted to create it purely in React with no state management to get a better feel managing state without Redux.

## Rules
Dealer stands on 17<br />
Blackjack pays 3:2<br />
Insurance pays 2:1<br />
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

1.0.0 - Added functionality for game<br />

## In Progress

Adding a betting system/chip system<br />
Redo the UI/UX for application<br />
Add split functionality<br />
Add insurance option<br />
Add deck count/customization<br />
Add high score<br />
Add card counting stats <br />
Make responsive<br />

## Known Bugs

Game breaks when there are no more cards from the deck - Fixed
