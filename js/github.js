class GitHubAPI {
  baseUrl = "https://api.github.com";
  httpClient;

  constructor() {
    this.httpClient = new FetchHttpRequest();
  }

  getUserInformations(userName) {
    let url = `${this.baseUrl}/users/${userName}`;
    return this.httpClient
      .get(url)
      .then((data) => data)
      .catch((error) => error);
  }

  getFollowingCount(userName) {
    let url = `${this.baseUrl}/users/${userName}/following`;
    return this.httpClient
      .get(url)
      .then((data) => data.following)
      .catch((error) => error);
  }

  getFollowersCount(userName) {
    let url = `${this.baseUrl}/users/${userName}/`;
    return this.httpClient
      .get(url)
      .then((data) => data.followers)
      .catch((error) => error);
  }

  getRepositories(userName) {
    let url = `${this.baseUrl}/users/${userName}/repos`;
    return this.httpClient
      .get(url)
      .then((data) => data)
      .catch((error) => error);
  }
}
