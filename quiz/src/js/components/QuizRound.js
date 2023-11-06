import { shuffleArray } from "../shared/utility.js";

export class QuizRound {
  constructor(cards, callback) {
    this.cards = cards;
    // Shuffle cards
    shuffleArray(this.cards);
    this.result = null;
    this.callback = callback;
    // TODO Randomize card order
    for (const card of this.cards) {
      card.element.onclick = () => {
        if (card.species.isRedlisted) {
          this.result = true;
        } else {
          this.result = false;
        }
        // Send result to callback function
        this.callback(this.result);
      };
    }
  }
}
