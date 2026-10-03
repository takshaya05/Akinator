# AKINATOR

## Tagline

**The Mind Reading Game**

## Overview

Akinator is an AI-powered guessing game where users think of a real or fictional character and answer a series of questions. Based on the given answers, the system dynamically narrows down the possible characters and attempts to identify the character.

## Features

* **Smart Question System:** Ask relevant questions based on the player's previous answers.
* **Intelligent Guessing:** Narrow down character possibilities and identify the most likely character.
* **Character Database:** Store and manage real and fictional characters using MongoDB.
* **Candidate Tracking:** Track and display the number of possible characters remaining during gameplay.
* **Interactive Results:** Confirm the final guess and display a celebration effect when the character is correctly identified.

## Tech Stack

* **React.js:** Build the interactive user interface.
* **Vite:** Provide fast development and optimized frontend builds.
* **Node.js:** Run the backend server environment.
* **Express.js:** Develop backend APIs and game logic.
* **MongoDB:** Store character and game-related data.

## Project Structure

* client/
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