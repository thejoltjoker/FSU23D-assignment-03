import OmdbClient from "./OmdbClient.js";
import { SearchResultItem } from "./SearchResultItem.js";
import TOKEN from "./key.js";

let timeoutId;

const searchInput = document.querySelector("#search");
function debounce(func, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
}

searchInput.oninput = async (event) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => search(event.target.value), 300);
};

const search = async (query) => {
  const omdb = new OmdbClient(TOKEN);

  try {
    const response = await omdb.search(query);

    if (response["Search"]) {
      const resultsList = document.querySelector("#results");
      resultsList.innerHTML = "";
      const items = response.Search.map((listing) => {
        const elem = new SearchResultItem({ ...listing });
        // console.log(listing);
        return elem;
      });
      items.forEach((element) => {
        resultsList.append(element.element);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
