# AKINATOR

## Tagline

**The Mind Reading Game**

## Problem Statement

Players often enjoy guessing games but lack an interactive experience that can intelligently identify a character based on their answers. Akinator provides an engaging AI-powered guessing game where users think of a real or fictional character and answer simple questions while the system narrows down the possibilities and attempts to guess the character.

## Design Palette

* **Primary:** `#8B5CF6`
* **Secondary:** `#5B21B6`
* **Background:** `#080612`
* **Text:** `#F8FAFC`
* **Accent:** `#22D3EE`

## Tech Stack

* React.js
* Vite
* JavaScript
* Node.js
* Express.js
* MongoDB

## Features

* **Character Selection:** Think of any real or fictional character.
* **Question System:** Answer simple questions asked by Akinator.
* **Answer Options:** Choose from available options such as Yes / No, type, and gender.
* **Smart Guessing:** Narrow down character possibilities based on the answers provided.
* **Dynamic Questions:** Generate questions based on the remaining character possibilities.
* **Candidate Tracking:** Display the number of possible characters remaining during gameplay.
* **Character Database:** Store and manage real and fictional characters using MongoDB.
* **Interactive Gameplay:** Enjoy a simple and engaging mind-reading game.
* **Player Identification:** Enter a username before starting the game.
* **Result System:** Confirm whether Akinator's final guess is correct or incorrect.
* **Celebration Effect:** Display a celebration animation when Akinator successfully guesses the character.

## Project Structure

* src/
  * components/
    * about/
    * dashboard/
    * footer/
    * header/

* server/
  * config/
  * controllers/
  * models/
  * routes/
  * utils/
  * server.js