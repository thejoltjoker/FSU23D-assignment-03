// TODO add information about the correct answer, implement QuizInfoCard

import Species from "../shared/Species.js";
import {
  constructArtfaktaUrl,
  getRedlistCategoryData,
} from "../shared/utility.js";

export default class QuizInfoCard {
  /**
   * Creates an instance of QuizInfoCard.
   * @param {Species} species
   * @param {function} callback Callback function after the user clicks to move on
   * @memberof QuizInfoCard
   */
  constructor(species, callback) {
    this.species = species;
    console.log(species);
    this.element = document.createElement("div");
    this.element.classList = "col-span-full";
    this.textContainer = document.createElement("div");
    this.textContainer.classList = "w-full pt-2 sm:pt-3 md:pt-5";
    this.metaContainer = document.createElement("div");
    this.metaContainer.classList = "meta inline-flex w-full items-center";
    this.metaContainer.innerHTML = `<div class="flex flex-col justify-center pl-4">
    <h2 class="text-xl font-extrabold text-zinc-800 md:text-4xl md:font-black">
      ${species.swedishName}
    </h2>
    <p class="tracking-wider text-stone-500">
      ${species.scientificName}
    </p>
  </div>
  <a href="${constructArtfaktaUrl(
    this.species.scientificName,
    this.species.taxonId,
  )}" target="_blank"
  class="ml-auto">
  <svg class="h-full w-14 cursor-pointer fill-white stroke-stone-400 transition hover:fill-blue-50 hover:stroke-sky-400"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
      stroke="currentColor">
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          </a>`;

    // Redlist badge
    this.redlistBadge = this.createRedlistBadge(species);
    this.metaContainer.prepend(this.redlistBadge);

    this.about = document.createElement("p");
    this.about.classList = "mt-5";
    this.about.innerText = species.redlistInfo[0].criterionText;
    // Add text to container
    this.textContainer.append(this.metaContainer);
    this.textContainer.append(this.about);

    this.card = document.createElement("div");
    this.card.classList =
      "quiz-info-card h-30 group w-full overflow-hidden rounded-2xl border-4 border-zinc-800 bg-white p-2 drop-shadow-card transition sm:p-3 md:p-5";

    this.photoContainer = document.createElement("div");
    this.photoContainer.classList =
      "rounded-lg border-4 border-zinc-800 bg-stone-300";
    this.img = document.createElement("img");
    this.img.classList =
      "h-[28vh] w-full object-cover text-center text-stone-500";
    this.photoContainer.append(this.img);
    this.setPhoto(species.photos[0]);

    this.card.append(this.photoContainer);
    this.card.append(this.textContainer);

    this.element.append(this.card);
    // Create button
    this.continueButton = document.createElement("button");
    this.continueButton.classList =
      "mt-3 w-full flex-grow cursor-pointer overflow-hidden rounded-2xl border-4 border-zinc-800 bg-teal-300 p-4 text-center text-xl font-extrabold text-zinc-800 drop-shadow-card transition hover:bg-red-400 group-hover:text-red-950 md:p-6 md:text-4xl md:font-black";
    this.continueButton.innerText = "Gå vidare";
    this.continueButton.onclick = callback;
    this.element.append(this.continueButton);
  }
  createRedlistBadge() {
    const redlist = getRedlistCategoryData(
      this.species.redlistInfo[0]?.category,
    );
    const badge = document.createElement("div");
    badge.classList = `overflow-hidden rounded-2xl border-4 border-zinc-800 bg-${redlist.color} p-2 text-center drop-shadow-card transition sm:p-3 md:p-5`;

    badge.innerHTML = `
      <p class="text-xl font-extrabold text-white md:text-4xl md:font-black">
        ${redlist.category}
      </p>
      <p class="text-zinc-800">${redlist.title}</p>`;
    return badge;
  }

  /**
   * @param {{ small_url: string; medium_url: string; large_url: string; }} photo - Photo object from iNaturalist
   */
  setPhoto(photo) {
    this.photoContainer.innerHTML = "";
    this.img.src = photo.small_url;
    this.img.src = photo.medium_url;
    this.img.src = photo.large_url;
    this.photoContainer.append(this.img);
  }
}
