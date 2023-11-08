export const toTitleCase = (str) => {
  return str.replace(/(^|\s)\S/g, (t) => {
    return t.toUpperCase();
  });
};
/**
 * Return a random list item and its index
 *
 * @param {*} list item
 */
export const randomListItem = (list) => {
  const index = Math.floor(Math.random() * list.length);
  return [index, list[index]];
};

console.log(randomListItem([1, 2, 3, 4]));

/**
 * Filters out objects based on parameter and a list of values.
 *
 * @param {Array[Object]} dataArray
 * @param {Array} filterArray
 * @param {String} filterParameter
 * @return {Array[Object]} The filtered objects
 */
export const filterDataArray = (dataArray, filterArray, filterParameter) => {
  return dataArray.filter((item) =>
    filterArray.includes(item[filterParameter]),
  );
};

export const removeRedlistedFromCommon = (commonSpecies, redlistedSpecies) => {
  const redlistedIds = redlistedSpecies.map((item) => item["id"]);
  return commonSpecies.filter((item) => !redlistedIds.includes(item["id"]));
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRedlistCategoryData = (category) => {
  const categories = [
    {
      category: "NT",
      title: "Nära hotad",
      color: "red-300",
    },
    {
      category: "LC",
      title: "Livskraftig",
      color: "emerald-500",
    },
    {
      category: "DD",
      title: "Kunskapsbrist",
      color: "zinc-400",
    },
    {
      category: "VU",
      title: "Sårbar",
      color: "red-400",
    },
    {
      category: "EN",
      title: "Starkt hotad",
      color: "red-500",
    },
    {
      category: "CR",
      title: "Akut hotad",
      color: "violet-500",
    },
    {
      category: "RE",
      title: "Nationellt utdöd",
      color: "slate-500",
    },
  ];
  return categories.find(
    (element) => element.category == category.toUpperCase(),
  );
};
export const toKebabCase = (input) => {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$|-(?=-)/g, "");
};

const inputString = "This is the String";
const kebabCaseString = toKebabCase(inputString);
console.log(kebabCaseString); // Output: "this-is-the-string"

export const constructArtfaktaUrl = (scientificName, taxonId) => {
  return `https://artfakta.se/artinformation/taxa/${toKebabCase(
    scientificName,
  )}-${taxonId}`;
};
