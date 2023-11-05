export const toTitleCase = (str) => {
  return str.replace(/(^|\s)\S/g, (t) => {
    return t.toUpperCase();
  });
};
export const randomListItem = (list) =>
  list[Math.floor(Math.random() * list.length)];

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

// const common = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Sarah" },
//   { id: 3, name: "Henry" },
// ];
// const uncommon = [{ id: 2, name: "Sarah" }];

// console.log(removeRedlistedFromCommon(common, uncommon, "id"));
