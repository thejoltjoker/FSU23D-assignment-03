/**
 * Class representing a generic API client for making HTTP requests.
 */
export default class ApiClient {
  /**
   * Initializes a new ApiClient instance with default headers.
   */
  constructor() {
    this.headers = {
      Accept: "*/*",
      "User-Agent": "Animal Quiz",
      "Content-Type": "application/json",
    };
  }

  /**
   * Send an HTTP request to the specified URL.
   * @param {string} method - The HTTP request method (e.g., "GET", "POST").
   * @param {string} url - The URL to send the request to.
   * @param {string} body - The request body (if applicable).
   * @returns {Promise} A Promise that resolves with the response data from the API.
   * @throws {Error} Throws an error if the API request fails.
   */
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
