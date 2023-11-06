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
    filterArray.includes(item[filterParameter])
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
