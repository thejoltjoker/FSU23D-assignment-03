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
    this.photoContainer = document.createElement("div");
    this.photoContainer.classList =
      "border-4 border-zinc-800 rounded-lg bg-stone-300";

    this.img = document.createElement("img");
    this.img.className =
      "w-full h-[22vh] object-cover text-center text-stone-500";
    this.img.alt = `Photo of ${this.swedishName} (${this.scientificName})`;
    this.img.src = this.species.photos[0]?.small_url;

    this.imgPlaceholder = document.createElement("div");
    this.imgPlaceholder.role = "status";
    this.imgPlaceholder.classList =
      "space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center w-full h-[22vh]";
    this.imgPlaceholder.innerHTML = `<div class="flex items-center justify-center w-full h-full bg-stone-300">
      <svg class="w-10 h-10 text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" viewBox="0 0 20 18">
        <path
          d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>`;
    this.photoContainer.append(this.imgPlaceholder);

    this.element.className =
      "quiz-card group w-full h-30 transition bg-white hover:bg-red-400 border-4 border-zinc-800 rounded-2xl overflow-hidden cursor-pointer p-2 sm:p-3 md:p-5 drop-shadow-card";

    this.textContainer = document.createElement("div");
    this.textContainer.classList = "w-full text-center pt-2 sm:pt-3 md:pt-5";
    this.textContainer.innerHTML = `<h2 class="text-zinc-800 group-hover:text-red-950 text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-extrabold md:font-black">
        ${this.swedishName}
      </h2>
      <p class="text-stone-500 group-hover:text-red-800 tracking-wider">
        ${this.scientificName}
      </p>
    `;
    this.element.append(this.textContainer);
    this.element.prepend(this.photoContainer);

    // Set photos
    this.species
      .getPhotos()
      .then(() => {
        this.setPhoto(this.species.photos[0]);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  /**
   * @param {{ small_url: string; medium_url: string; large_url: string; }} photo - Photo object from iNaturalist
   */
  setPhoto(photo) {
    this.photoContainer.innerHTML = "";
    this.img.src = photo.small_url;
    // this.img.src = photo.medium_url;
    // this.img.src = photo.large_url;
    this.photoContainer.append(this.img);
  }

  setInactive() {
    this.img.classList.add("grayscale");
    this.element.className =
      "quiz-card group w-full h-30 transition bg-stone-300 border-4 border-zinc-800 rounded-2xl overflow-hidden cursor-auto p-2 sm:p-3 md:p-5 drop-shadow-card";
    this.textContainer.innerHTML = `
      <h2 class="text-zinc-600 text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-extrabold md:font-black">
        ${this.swedishName}
      </h2>
      <p class="text-stone-500 tracking-wider">${this.scientificName}</p>
    `;
  }
}
