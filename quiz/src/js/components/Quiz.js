import { randomListItem } from "../shared/utility.js";
import { QuizCard } from "./QuizCard.js";
import { Species } from "../shared/Species.js";
import { QuizRound } from "./QuizRound.js";
import QuizProgress from "./QuizProgress.js";
// TODO add information about the correct answer, implement QuizInfoCard
// TODO Gray out wrong answer
// TODO Add play again button
// TODO Replace start quiz button with species selection
class QuizInfoCard {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList = "col-span-full";
    this.element.innerHTML = `
    <div
      class="quiz-card h-30 group w-full overflow-hidden rounded-2xl border-4 border-zinc-800 bg-white p-2 drop-shadow-card transition sm:p-3 md:p-5"
    >
      <div class="rounded-lg border-4 border-zinc-800 bg-stone-300">
        <img
          class="h-[22vh] w-full object-cover text-center text-stone-500"
          alt=""
          srcset="
            https://static.inaturalist.org/photos/60548654/small.png   240w,
            https://static.inaturalist.org/photos/60548654/medium.png  500w,
            https://static.inaturalist.org/photos/60548654/large.png  1000w
          "
          sizes="(max-width: 500px) 60vw,
100vw"
        />
      </div>
      <div class="w-full pt-2 sm:pt-3 md:pt-5">
        <div class="meta inline-flex w-full items-center">
          <div
            class="overflow-hidden rounded-2xl border-4 border-zinc-800 bg-red-500 p-2 text-center drop-shadow-card transition sm:p-3 md:p-5"
          >
            <p
              class="text-xl font-extrabold text-white md:text-4xl md:font-black"
            >
              NT
            </p>
            <p class="text-red-800">Nära hotad</p>
          </div>
          <div class="flex flex-col justify-center pl-4">
            <h2
              class="text-xl font-extrabold text-zinc-800 md:text-4xl md:font-black"
            >
              Pilgrimsfalk
            </h2>
            <p class="tracking-wider text-stone-500">
              Falco Peregrinus
            </p>
          </div>
          <svg
            class="ml-auto h-full w-14 cursor-pointer fill-white stroke-stone-400 transition hover:fill-blue-50 hover:stroke-sky-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>

        <p class="mt-5">
          Pilgrimsfalk häckar mestadels i klippbranter i södra hälften
          av Sverige, men i norra Norrland även på blöta myrar. Arten
          uppvisat en påtagligt ökande population i Sverige, liksom i
          Finland och Norge, och finns numera i samtliga län i
          Götaland, i fem län i Svealand samt i samtliga Norrlandslän.
          Födan består uteslutande av fåglar. Antalet reproduktiva
          individer skattas till 1100 (1000-1240). Utbredningsområdets
          storlek (EOO) och förekomstarean (AOO) överskrider
          gränsvärdena för rödlistning. Populationen är ökande. De
          skattade värdena som bedömningen baserar sig på ligger alla
          inom intervallet för kategorin Nära hotad (NT). Antalet
          individer bedöms överstiga gränsvärdet för Sårbar (VU)
          enligt D-kriteriet. (D1).
        </p>
        <!-- <div class="inline-flex"> -->
        <!-- <div
            class="mt-3 flex-grow cursor-pointer rounded-2xl border-4 border-zinc-800 bg-teal-300 p-4 text-center text-xl font-extrabold text-zinc-800 drop-shadow-card transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-full w-14"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
    <button
      class="mt-3 w-full flex-grow cursor-pointer overflow-hidden rounded-2xl border-4 border-zinc-800 bg-teal-300 p-4 text-center text-xl font-extrabold text-zinc-800 drop-shadow-card transition hover:bg-red-400 group-hover:text-red-950 md:p-6 md:text-4xl md:font-black"
    >
      Gå vidare
    </button>`;
  }
}
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
          [],
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
          [],
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
        this.moveToNextRound();
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
