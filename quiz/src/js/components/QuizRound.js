/**
 * Represents a round of a quiz game.
 * @class
 */
import { shuffleArray } from "../shared/utility.js";
// eslint-disable-next-line no-unused-vars
import QuizCard from "./QuizCard.js";

export default class QuizRound {
  /**
   * Creates a new QuizRound instance.
   * @constructor
   * @param {Array.<QuizCard>} cards - The array of cards for the quiz round.
   * @param {Function} callback - The callback function to handle the quiz result.
   */
  constructor(cards, callback) {
    this.cards = cards;
    this.result = null;
    this.callback = callback;

    // Shuffle cards
    shuffleArray(this.cards);
    // Set up onclick event for each card
    for (const card of this.cards) {
      card.element.onclick = () => {
        if (card.species.isRedlisted) {
          this.result = [true, card];
          // Send result to callback function
        } else {
          this.result = [false, card];

          // Set card to gray looking for inactive
          card.setInactive();
          // Reset onclick event
          card.element.onclick = null;
        }

        // Send result and card to callback function
        this.callback(this.result);
      };
    }
  }
}
