import INaturalistClient from "../services/iNaturalist/INaturalistClient.js";

export class Species {
  /**
   * Creates an instance of Species.
   * @param {Number} taxonId
   * @param {String} swedishName
   * @param {String} scientificName
   * @param {Number} iNaturlistId
   * @param {boolean} [isRedlisted=false]
   * @param {Array[Object]} [photos=[]]
   * @memberof Species
   */
  constructor(
    taxonId,
    swedishName,
    scientificName,
    iNaturlistId,
    isRedlisted = false,
    photos = []
  ) {
    this.taxonId = taxonId;
    this.swedishName = swedishName;
    this.scientificName = scientificName;
    this.englishName = scientificName;
    this.iNaturlistId = iNaturlistId;
    this.isRedlisted = isRedlisted;
    this.photos = photos;
  }

  async getInaturalistId() {
    if (!this.iNaturlistId) {
      try {
        const inat = new INaturalistClient();
        let query = this.scientificName
          ? this.scientificName
          : this.englishName;
        const inatId = await inat.getIdFromScientificName(query);
        this.iNaturlistId = inatId;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    }

    return this.iNaturlistId;
  }

  async getPhotos() {
    try {
      const inat = new INaturalistClient();
      if (!this.iNaturlistId) await this.getInaturalistId();

      const taxa = await inat.getTaxa([this.iNaturlistId]);
      this.photos = taxa.results[0].taxon_photos.map((item) => item.photo);
      return this.photos;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
