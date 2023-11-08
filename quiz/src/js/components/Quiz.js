import { randomListItem } from "../shared/utility.js";
import QuizCard from "./QuizCard.js";
import Species from "../shared/Species.js";
import QuizRound from "./QuizRound.js";
import QuizProgress from "./QuizProgress.js";
import INaturalistClient from "../services/iNaturalist/INaturalistClient.js";
import QuizInfoCard from "./QuizInfoCard.js";
// TODO Add play again button
// TODO Replace start quiz button with species selection
// TODO Remove possibility to click on disabled card
export default class Quiz {
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
    const allSpecies = [];
    const cards = [];

    // Pick 1 correct answer and 3 incorrect answers
    for (let i = 0; i < 4; ++i) {
      let newSpecies;
      let index;
      let randomSpecies;
      // Pick the correct answer first
      if (i == 0) {
        [index, randomSpecies] = randomListItem(this.correct);
        randomSpecies.isRedlisted = true;
        // Remove species from list
        this.correct.splice(index, 1);
      } else {
        [index, randomSpecies] = randomListItem(this.incorrect);
        randomSpecies.isRedlisted = false;
        // Remove species from list
        this.incorrect.splice(index, 1);
      }

      // Create new Species object
      newSpecies = new Species(
        randomSpecies.id,
        randomSpecies.swedishname,
        randomSpecies.scientificname,
        null,
        randomSpecies.isRedlisted,
        [],
      );

      // Add to list of species
      allSpecies.push(newSpecies);

      // Create cards for round
      const card = new QuizCard(newSpecies);
      cards.push(card);
    }

    // Map each species instance to a promise that calls getInaturalistId()
    this.getInatIdsAndPhotos(allSpecies, cards);

    const round = new QuizRound(cards, (result) => {
      // Determine what to do based on the result
      if (result[0]) {
        this.currentScore++;
        this.showSpeciesInfo(result[1]);
      } else {
        this.currentHearts--;
        this.quizProgress.updateHearts(this.currentHearts, this.totalHearts);
        if (this.currentHearts <= 0) {
          this.showLoseScreen();
        }
      }
    });
    return round;
  }

  getInatIdsAndPhotos(allSpecies, cards) {
    const promises = allSpecies.map((spec) => spec.getInaturalistId());

    // Use Promise.all() to run them concurrently
    Promise.all(promises)
      .then(async (inaturalistIds) => {
        // Create a new INaturalistClient instance
        const inat = new INaturalistClient();

        // Use the retrieved inaturalistIds to fetch taxonomic information
        const taxa = await inat.getTaxa(inaturalistIds);

        // Iterate through the results
        for (const t of taxa.results) {
          // Find the correct card object based on the inaturalist id of the species
          const card = cards.find((obj) => {
            return obj.species.iNaturlistId == t.id;
          });
          const species = card.species;

          // Populate the species' photos from the retrieved taxon photos
          species.photos = t.taxon_photos.map((item) => item.photo);

          // Set a random photo for the species
          card.setPhoto(randomListItem(species.photos)[1]);
        }
      })
      .catch((error) => {
        // Handle errors if any of the promises are rejected
        console.error("Error:", error);
        throw new Error(error);
      });
  }
  showSpeciesInfo(card) {
    console.log(`Correct answer ${card.species.swedishName}`);
    const infoCard = new QuizInfoCard(card.species, () => {
      this.moveToNextRound();
    });
    this.quizBoard.innerHTML = "";
    this.quizBoard.append(infoCard.element);
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
