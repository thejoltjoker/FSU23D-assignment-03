import { toTitleCase } from "../shared/utility.js";

export class QuizCard {
  /**
   * Creates an instance of QuizCard.
   * @param {Species} species
   * @memberof QuizCard
   */
  constructor(species) {
    this.species = species;
    this.swedishName = toTitleCase(species.swedishName);
    this.scientificName = toTitleCase(species.scientificName);
    this.element = document.createElement("div");

    // Img
    // TODO srcset
    this.img = document.createElement("img");
    this.img.className = "object-cover rounded-lg text-center text-stone-500";
    this.img.alt = `Photo of ${this.swedishName} (${this.scientificName})`;
    this.img.src = this.species.photos[0]?.small_url;

    this.element.className =
      "quiz-card group w-full h-30 transition bg-white hover:bg-red-400 border-4 border-zinc-800 rounded-2xl overflow-hidden cursor-pointer p-2 sm:p-3 md:p-5 drop-shadow-card";
    this.element.innerHTML = `<div class="w-full h-[22vh] border-4 border-zinc-800 rounded-lg bg-stone-300">
    
      ${this.img.outerHTML}
      </div>
    <div class="w-full text-center pt-2 sm:pt-3 md:pt-5">
      <h2 class="text-zinc-800 group-hover:text-red-950 text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-extrabold md:font-black">
        ${this.swedishName}
      </h2>
      <p class="text-stone-500 group-hover:text-red-800 tracking-wider">${this.scientificName}</p>
    </div>
    `;
  }

  /**
   * @param {{ small_url: string; medium_url: string; large_url: string; }} photo - Photo object from iNaturalist
   */
  set setPhoto(photo) {
    this.img.src = photo.small_url;
    this.img.src = photo.medium_url;
    this.img.src = photo.large_url;
  }
}
