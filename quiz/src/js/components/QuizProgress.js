export default class QuizProgress {
  constructor() {
    this.textProgress = document.createElement("div");
    this.textProgress.className = "text-center font-bold text-xl text-zinc-700";
    this.textProgress.innerText = "Klicka på en av bilderna för att börja";

    this.heartsContainer = document.createElement("div");
    this.heartsContainer.className = "inline-flex";
    this.heartsContainer.append(this.createHeart());
    this.heartsContainer.append(this.createHeart());
    this.heartsContainer.append(this.createHeart());

    this.metaElement = document.createElement("div");
    this.metaElement.className =
      "inline-flex w-full justify-between items-center pt-6 pb-2";
    this.metaElement.append(this.heartsContainer);
    // this.metaElement.innerHTML = `
    // <div class="inline-flex">
    //   <svg class="fill-red-400 w-8 h-8 stroke-2 stroke-stone-800" xmlns="http://www.w3.org/2000/svg" fill="none"
    //     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    //     <path stroke-linecap="round" stroke-linejoin="round"
    //       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    //   </svg>
    //   <svg class="fill-red-400 w-8 h-8 stroke-2 stroke-stone-800" xmlns="http://www.w3.org/2000/svg" fill="none"
    //     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    //     <path stroke-linecap="round" stroke-linejoin="round"
    //       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    //   </svg>
    //   <svg class="fill-stone-600 w-8 h-8 stroke-2 stroke-stone-800" xmlns="http://www.w3.org/2000/svg"
    //     fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    //     <path stroke-linecap="round" stroke-linejoin="round"
    //       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    //   </svg>
    // </div>`;
    this.metaElement.prepend(this.textProgress);

    this.element = document.createElement("div");
    this.element.id = "quiz-progress";
    this.element.className = "mb-4";
    this.element.innerHTML = `
    <div class="border-4 border-zinc-800 rounded-full transition">
      <div class="w-full bg-white bg-stripes rounded-full h-2.5 overflow-hidden">
        <div class="progress-bar transition-all duration-500 bg-emerald-500 h-2.5 outline outline-4 outline-zinc-800 rounded-full" style="width: 0%">
        </div>
      </div>
    </div>`;
    this.element.prepend(this.metaElement);

    // Progress bar
    this.progressBar = this.element.querySelector(".progress-bar");
  }
  createHeart(isAlive = true) {
    const element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const color = isAlive ? "fill-red-400" : "fill-stone-600";
    element.classList = `${color} w-8 h-8 stroke-2 stroke-stone-800`;
    element.fill = "none";
    element.setAttribute("viewBox", "0 0 24 24");
    element.setAttribute("stroke-width", "1.5");
    element.setAttribute("stroke", "currentColor");
    element.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round"
    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />`;
    return element;
  }
  updateTextProgress(currentRound, totalRounds) {
    console.log(`Omgång ${currentRound} av ${totalRounds}`);
    this.textProgress.innerText = `Omgång ${currentRound} av ${totalRounds}`;
  }
  updateProgressBar(currentRound, totalRounds) {
    const percentage = (currentRound / totalRounds) * 100;
    this.progressBar.style.width = `${percentage}%`;
  }
  updateHearts(currentHearts, totalHearts) {
    this.heartsContainer.innerHTML = "";
    for (let i = 0; i < totalHearts; ++i) {
      if (i < currentHearts) {
        this.heartsContainer.append(this.createHeart(true));
      } else {
        this.heartsContainer.append(this.createHeart(false));
      }
    }
  }
}
