import ApiClient from "../../shared/ApiClient.js";

/**
 *
 *
 * @export
 * @class INaturalistClient
 * @extends {ApiClient}
 */
export default class INaturalistClient extends ApiClient {
  endpoints = {
    taxa: "https://api.inaturalist.org/v1/taxa",
  };
  /**
   *
   *
   * @param {*} params
   * @return {*}
   * @memberof INaturalistClient
   */
  async searchTaxa(params) {
    // console.log(`Search iNaturalist for ${scientificName}`);
    const searchParams = new URLSearchParams(params);

    const url = new URL(this.endpoints.taxa);
    url.search = searchParams;

    try {
      const response = await this.request(
        "GET",
        "https://corsproxy.io/?" + url.href,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Get taxa information for given ids
   *
   * @param {Array} ids - The iNaturalist ids to get taxa for
   * @return {Object} Response data from iNaturalist
   * @memberof INaturalistClient
   */
  async getTaxa(ids) {
    const url = new URL(
      "https://corsproxy.io/?" +
        `${this.endpoints.taxa}/${encodeURIComponent(ids.join(","))}`,
    );

    try {
      const response = await this.request("GET", url.href);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getIdFromScientificName(scientificName) {
    const params = {
      q: scientificName,
      is_active: "true",
      rank: "species",
      per_page: "1",
      only_id: "true",
      order: "desc",
      order_by: "observations_count",
    };

    try {
      const response = await this.searchTaxa(params);
      if (response.results.length > 0) {
        return response.results[0]["id"];
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }
}

// Example
// const inat = new INaturalistClient();
// const taxa = await inat.getIdFromScientificName("Turdus Merula");
// console.log(taxa);
