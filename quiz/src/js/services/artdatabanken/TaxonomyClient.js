import ApiClient from "../../shared/ApiClient.js";

// TODO use shared api client
export default class TaxonomyClient extends ApiClient {
  endpoints = {
    definitions: "https://api.artdatabanken.se/taxonlistservice/v1/definitions",
    taxa: "https://api.artdatabanken.se/taxonlistservice/v1/taxa",
    childIds: "https://api.artdatabanken.se/taxonservice/v1/taxa/{id}/childids",
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

  async getChildIds(taxonId, useMainChildren = true) {
    // Documentation:
    // https://api-portal.artdatabanken.se/api-details#api=taxonservice&operation=Taxon_GetChildIds
    let endpoint = new URL(this.endpoints.childIds.replace(/{id}/, taxonId));
    endpoint.searchParams.append("useMainChildren", useMainChildren);

    try {
      return await this.request("GET", endpoint.href);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getTaxonList(
    conservationListId,
    outputFields = ["id", "scientificname", "swedishname", "englishname"],
  ) {
    let body = JSON.stringify({
      conservationListIds: [conservationListId],
      outputFields: outputFields,
    });
    let endpoint = this.endpoints.taxa;
    try {
      return await this.request("POST", endpoint, body);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

// Example
// const { TAXON_PRIMARY } = require("./keys");
// const client = new TaxonomyClient(TAXON_PRIMARY);
// console.log(await client.getTaxonList(1));
