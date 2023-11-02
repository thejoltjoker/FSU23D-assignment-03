export class SearchResultItem {
  constructor({ Title, Poster, Type, Year, imdbID }) {
    this.title = Title;
    this.poster = Poster;
    this.type = Type;
    this.year = Year;
    this.imdbID = imdbID;

    if (Poster == "N/A") {
      this.poster = "https://placekitten.com/160/240";
    }

    const html = `
            
              <img
                src="${this.poster}"
                alt="Poster"
                class="flex-shrink-0"
              />
              <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h2 class="mb-1">${this.title}</h2>

                  <p class="mb-1 opacity-50">${this.year}</p>
                </div>
                <small class="align-self-center opacity-50 text-nowrap">${this.type}</small>
              </div>
            
    `;
    this.element = document.createElement("a");
    this.element.className =
      "search-result list-group-item list-group-item-action d-flex gap-3 py-3 align-items-center";
    this.element.href = "#";
    this.element.innerHTML = html;
  }
}
