export default class ApiClient {
  constructor() {
    this.headers = {
      Accept: "*/*",
      "User-Agent": "Animal Quiz",
      "Content-Type": "application/json",
    };
  }

  async request(method, url, body) {
    try {
      const response = await fetch(url, {
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
      throw new Error(error);
    }
  }
}
