/*
The general script for the all the pages.
Used init bootstrap tooltips, popovers and modals throughout the site.
*/

import {
  addDifficultyModal,
  addRulesModal,
  addTopicModal,
} from "./modals.js";

import {
  setDifficulty,
  getAvailableTopics,
  setCurrentTopicByName,
} from "./game-storage.js";
import { displayAvailableTopics } from "./game-display.js";

document.addEventListener("DOMContentLoaded", function () {
  // Sound
  const music = document.getElementById("background-music");
  const soundWrapper = document.getElementById("sound-wrapper");

  soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-mute" style="color: #17bf07;"></i>`;

  soundWrapper.addEventListener("click", function () {
    // Toggle between play and pause when the sound icon is clicked
    if (music.paused) {
      soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-up" style="color: #17bf07;"></i>`;
      music.play();
    } else {
      soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-mute" style="color: #17bf07;"></i>`;
      music.pause();
    }
  });
  // ./Sound


  // Add modals to the page
  addDifficultyModal();
  addRulesModal();
  addTopicModal();


  // Get the difficulty buttons
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

  // Set the difficulty level in local storage when a button is clicked
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Clear local storage before starting a new game
      localStorage.clear();

      // remove the continue button if it exists
      const continueBtn = document.getElementById("continue-game");
      if (continueBtn) {
        continueBtn.remove();
      }

      const difficulty = button.dataset.difficulty;
      setDifficulty(difficulty);
    });
  });

  displayAvailableTopics(getAvailableTopics());

  // Get the topic buttons
  const topicButtons = document.querySelectorAll(".topicBtn");

  // Set the topic in local storage when a button is clicked
  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const topicName = button.dataset.topic;
      setCurrentTopicByName(topicName);
      // Redirect to the game page
      window.location.href = "game.html";
    });
  });
});
