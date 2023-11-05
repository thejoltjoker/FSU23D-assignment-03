import TaxonomyClient from "./services/artdatabanken/TaxonomyClient.js";
import { PRODUCTION, TAXON_PRIMARY } from "../../env.js";
import { COMMON_SPECIES } from "../../mockData/commonSpecies.js";
import { REDLISTED_SPECIES } from "../../mockData/redlistedSpecies.js";
import {
  filterDataArray,
  removeRedlistedFromCommon,
} from "./shared/utility.js";
import { VERTEBRATES_IDS } from "../../mockData/vertebrataIds.js";
import { Quiz } from "./components/Quiz.js";

// Get common species
// Get redlisted species

const getRedlistedAnimals = async () => {
  // List id for the "Rödlistade arter" list is 227
  const listId = 227;
  const client = new TaxonomyClient(TAXON_PRIMARY);
  try {
    // TODO Remove this eventually
    const allSpecies = PRODUCTION
      ? await client.getTaxonList(listId, [
          "id",
          "swedishname",
          "scientificname",
        ])
      : REDLISTED_SPECIES;

    // Käkförsedda ryggradsdjur (Gnathostomata) has taxon id 6009729
    // TODO Remove this as well
    const allAnimalIds = PRODUCTION
      ? await client.getChildIds(6009729)
      : VERTEBRATES_IDS;
    // console.log(allAnimalIds);
    const animals = filterDataArray(
      allSpecies.natureConservationListTaxa[0].taxonInformation,
      allAnimalIds["taxonIds"],
      "id"
    );
    return animals;
    // console.log(animals);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getCommonAnimals = async () => {
  // List id for the "Typiska arter" list is 1

  const listId = 1;
  const client = new TaxonomyClient(TAXON_PRIMARY);
  try {
    // TODO Remove this "if" eventually
    const allSpecies = PRODUCTION
      ? await client.getTaxonList(listId, [
          "id",
          "swedishname",
          "scientificname",
        ])
      : COMMON_SPECIES;

    // console.log(allSpecies);
    // Käkförsedda ryggradsdjur (Gnathostomata) has taxon id 6009729
    // TODO Remove this as well
    const allAnimalIds = PRODUCTION
      ? await client.getChildIds(6009729)
      : VERTEBRATES_IDS;
    // console.log(allAnimalIds);
    const animals = filterDataArray(
      allSpecies.natureConservationListTaxa[0].taxonInformation,
      allAnimalIds["taxonIds"],
      "id"
    );
    const commonAnimals = removeRedlistedFromCommon(animals, redlistAnimals);
    return commonAnimals;
    // console.log(animals);
  } catch (error) {
    console.error("Error:", error);
  }
};

const redlistAnimals = await getRedlistedAnimals();
const commonAnimals = await getCommonAnimals();
const createButton = (id, text, color) => {
  const button = document.createElement("button");
  button.id = id;
  button.className = `transition bg-${color}-300 hover:bg-${color}-400 border-4 border-zinc-800 rounded-2xl overflow-hidden p-4 md:p-6 drop-shadow-card text-zinc-800 text-xl md:text-4xl font-extrabold md:font-black flex-grow md:flex-grow-0`;
  button.innerText = text;
  return button;
};

// document.body.prepend(createButton("test-btn", "Testknapp", "teal"));
const startQuizButton = document.querySelector("#start-quiz");
startQuizButton.onclick = (e) => {
  const quiz = new Quiz(10, commonAnimals, redlistAnimals);
  quiz.start();
};
