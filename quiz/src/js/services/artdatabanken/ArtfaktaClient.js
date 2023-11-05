export class ArtdataClient {
  baseUrl = "https://api.artdatabanken.se/information/v1/speciesdataservice/v1";
  endpoints = {
    speciesdata: `${this.baseUrl}/speciesdata`,
  };
  constructor(subscriptionKey) {
    this.headers = {
      Accept: "*/*",
      "User-Agent": "Animal Quiz",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    };
  }

  async #request(method = "GET", endpoint, body) {
    try {
      const response = await fetch(endpoint, {
        method: method,
        body: body,
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  async getSpeciesData(taxa) {
    let endpoint = new URL(this.endpoints.speciesdata);
    endpoint.searchParams.append("taxa", taxa);

    try {
      return await this.#request("GET", endpoint.href);
    } catch (error) {
      console.error(error);
    }
  }
}
