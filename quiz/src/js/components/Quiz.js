import { randomListItem } from "../shared/utility.js";
import { QuizCard } from "./QuizCard.js";
import { Species } from "../Species.js";
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

  initRound() {
    const species = [];
    const cards = [];

    // Pick 1 correct answer and 3 incorrect answers
    for (let i = 0; i < 4; ++i) {
      let newSpecies;
      // Pick the correct answer first
      if (i == 0) {
        const randomSpecies = randomListItem(this.correct);
        newSpecies = new Species(
          randomSpecies.id,
          randomSpecies.swedishname,
          randomSpecies.scientificname,
          null,
          true,
          []
        );
      } else {
        const randomSpecies = randomListItem(this.incorrect);
        newSpecies = new Species(
          randomSpecies.id,
          randomSpecies.swedishname,
          randomSpecies.scientificname,
          null,
          false,
          []
        );
      }

      // Add to list of species
      species.push(newSpecies);

      // Create cards for round
      const card = new QuizCard(newSpecies);
      cards.push(card);

      // Get images from iNaturalist
      //   const inat = new INaturalistClient();
      //   const inatId = await inat.getIdFromScientificName(
      //     newSpecies.scientificName
      //   );
      //   newSpecies.iNaturlistId = inatId;
      // Get taxa
      //   const inatTaxa = await inat.getTaxa([newSpecies.iNaturlistId]);
      //   newSpecies.photos = inatTaxa.results[0].taxon_photos.map(
      //     (item) => item.photo
      //   );
      // Set photo
      //   card.setPhoto = newSpecies.photos[0];
      // }
      // console.log(species);
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

  startRound() {
    const round = this.initRound();
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
