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
    this.iNaturlistId = iNaturlistId;
    this.isRedlisted = isRedlisted;
    this.photos = photos;
  }
}
