/**
 * Class representing a client for the Artfakta API.
 * Extends the base ApiClient class.
 */
import ApiClient from "../../shared/ApiClient.js";

export default class ArtfaktaClient extends ApiClient {
  /**
   * Initializes a new ArtfaktaClient instance.
   * @param {string} subscriptionKey - The subscription key required for accessing the Artfakta API.
   */
  constructor(subscriptionKey) {
    super();

    // Define the base URL and API endpoints for Artfakta.
    this.baseUrl =
      "https://api.artdatabanken.se/information/v1/speciesdataservice/v1";
    this.endpoints = {
      speciesdata: `${this.baseUrl}/speciesdata`,
    };

    // Set the default headers for API requests.
    this.headers = {
      Accept: "*/*",
      "User-Agent": "Animal Quiz",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    };
  }

  /**
   * Fetches species data from the Artfakta API based on the specified taxa.
   * @param {string} taxa - The taxonomic classification for the species data to retrieve.
   * @returns {Promise} A Promise that resolves with the response from the API.
   * @throws {Error} Throws an error if the API request fails.
   */
  async getSpeciesData(taxa) {
    const endpoint = new URL(this.endpoints.speciesdata);
    endpoint.searchParams.append("taxa", taxa);

    try {
      const response = await this.request("GET", endpoint.href);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
