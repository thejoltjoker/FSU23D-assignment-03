export default class OmdbClient {
  constructor(apikey) {
    this.baseUrl = `http://www.omdbapi.com/`;
    this.apikey = apikey;
  }

  async #get(params) {
    // Add api key to params
    params.append("apikey", this.apikey);

    // Construct url
    const url = `${this.baseUrl}?${params}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  async search(query) {
    const params = new URLSearchParams({
      s: query,
    });

    return await this.#get(params);
  }
}
