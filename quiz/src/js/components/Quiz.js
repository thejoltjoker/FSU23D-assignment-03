import { randomListItem } from "../shared/utility.js";
import { QuizCard } from "./QuizCard.js";
import { Species } from "../shared/Species.js";
import { QuizRound } from "./QuizRound.js";
import QuizProgress from "./QuizProgress.js";

export class Quiz {
  constructor(rounds = 10, commonSpecies, redlistedSpecies) {
    this.rounds = rounds;
    this.incorrect = commonSpecies;
    this.correct = redlistedSpecies;
    this.currentRound = 1;
    this.quizContainer = document.querySelector("#quiz");
    this.quizBoard = document.querySelector("#quiz-board");
    this.quizProgress = new QuizProgress();
    this.currentScore = 0;
    this.currentHearts = 3;
    this.totalHearts = 3;
  }

  start() {
    // Add progress bar
    this.quizContainer.prepend(this.quizProgress.element);
    // create new round
    this.startRound();
  }

  async initRound() {
    const species = [];
    const cards = [];

    // Pick 1 correct answer and 3 incorrect answers
    for (let i = 0; i < 4; ++i) {
      let newSpecies;
      // Pick the correct answer first
      if (i == 0) {
        const [index, randomSpecies] = randomListItem(this.correct);
        newSpecies = new Species(
          randomSpecies.id,
          randomSpecies.swedishname,
          randomSpecies.scientificname,
          null,
          true,
          []
        );
        // Remove species from list
        this.correct.splice(index, 1);
      } else {
        const [index, randomSpecies] = randomListItem(this.incorrect);
        newSpecies = new Species(
          randomSpecies.id,
          randomSpecies.swedishname,
          randomSpecies.scientificname,
          null,
          false,
          []
        );
        // Remove species from list
        this.incorrect.splice(index, 1);
      }

      // Add to list of species
      species.push(newSpecies);

      // Create cards for round
      const card = new QuizCard(newSpecies);
      cards.push(card);
    }

    const round = new QuizRound(cards, (result) => {
      if (result) {
        this.currentScore++;
      } else {
        this.currentHearts--;
      }
      this.moveToNextRound();
    });
    return round;
  }

  moveToNextRound() {
    this.currentRound++;
    if (this.currentHearts <= 0) {
      this.showLoseScreen();
    } else if (this.currentRound <= this.rounds) {
      // Start the next round
      console.log("lets move on");
      this.startRound();
    } else {
      // Quiz is complete
      this.showQuizSummary();
    }
  }

  async startRound() {
    const round = await this.initRound();
    this.quizProgress.updateTextProgress(this.currentRound, this.rounds);
    this.quizProgress.updateProgressBar(this.currentRound, this.rounds);
    this.quizProgress.updateHearts(this.currentHearts, this.totalHearts);
    this.quizBoard.innerHTML = "";

    for (const card of round.cards) {
      this.quizBoard.append(card.element);
    }
  }

  // TODO Add play again button
  showQuizSummary() {
    this.quizProgress.element.remove();
    this.quizBoard.innerHTML = `<h2 class="text-center text-2xl w-full col-span-2 mt-8 font-black">Färdig!<br>Du fick ${this.currentScore} av ${this.rounds}</h2>`;
  }

  // TODO Add play again button
  showLoseScreen() {
    this.quizProgress.element.remove();
    this.quizBoard.innerHTML = `<h2 class="text-center text-2xl w-full col-span-2 mt-8 font-black">Aj aj aj, precis som de rödlistade arterna fick du slut på extra-liv...<br>Du fick ${this.currentScore} av ${this.rounds}</h2>`;
  }
}
