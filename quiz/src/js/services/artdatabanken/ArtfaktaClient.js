import ApiClient from "../../shared/ApiClient.js";

export class ArtdataClient extends ApiClient {
  baseUrl = "https://api.artdatabanken.se/information/v1/speciesdataservice/v1";
  endpoints = {
    speciesdata: `${this.baseUrl}/speciesdata`,
  };
  constructor(subscriptionKey) {
    super();
    this.headers = {
      Accept: "*/*",
      "User-Agent": "Animal Quiz",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    };
  }

  async getSpeciesData(taxa) {
    let endpoint = new URL(this.endpoints.speciesdata);
    endpoint.searchParams.append("taxa", taxa);

    try {
      return await this.request("GET", endpoint.href);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
