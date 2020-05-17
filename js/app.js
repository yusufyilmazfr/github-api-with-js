const githubApi = new GitHubAPI();

const searchButton = document.getElementById("search_button");
const searchInput = document.getElementById("search_input");

const userImage = document.getElementById("user_image");
const userFullName = document.getElementById("user_full_name");
const userName = document.getElementById("username");
const userDescription = document.getElementById("user_description");
const userEmail = document.getElementById("user_email");
const userLink = document.getElementById("user_link");
const userLocation = document.getElementById("user_location");
const userRepositories = document.getElementById("repos");

window.addEventListener("DOMContentLoaded", (event) => {
  searchButton.addEventListener("click", searchUser);
});

let enableElements = () => {
  document.getElementById("user_repositories_area").style.display = "block";
  document.getElementById("user_informations_area").style.display = "block";

  // TODO: I will enable elements in here when document loaded.
};

let searchUser = () => {
  let userName = searchInput.value;
  if (!userName) return;

  enableElements();

  githubApi
    .getUserInformations(userName)
    .then((data) => {
      showUserInformations(data);
      getRepositories(userName);
    })
    .catch((error) => console.log(error));
};

let getRepositories = (userName) => {
  githubApi
    .getRepositories(userName)
    .then((data) => showRepositories(data))
    .catch((error) => console.log(error));
};

let showRepositories = (repositories) => {
  repositories.sort((a, b) =>
    b.stargazers_count > a.stargazers_count ? 1 : -1
  );
  userRepositories.innerHTML = "";
  repositories.forEach((repository) => {
    userRepositories.innerHTML += `<div class="card" style="width: 460px; height: 160px; margin-bottom: 10px">
    <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between;">
    <h6 class="card-subtitle mb-2 text-muted">
    <a href="${repository.html_url}" target="_blank" color="#0366d6">${
      repository.name
    }</a>
    </h6>
    <p class="card-text">
    ${repository.description == null ? "" : repository.description}
    </p>
    <div>
    <span>${repository.language}</span> 
    <i class="far fa-star"></i> ${repository.stargazers_count}
    <i class="far fa-code-branch"></i> ${repository.forks_count}
    </div>
    </div>
    </div>`;
  });
};

let showUserInformations = (user) => {
  userImage.setAttribute("src", user.avatar_url);
  userFullName.innerText = user.name;
  userName.innerText = user.login;

  userEmail.innerText = user.email;
  userEmail.setAttribute("href", `$mailto:${user.email}`);

  userLocation.innerText = `@${user.location}`;

  userLink.setAttribute("href", user.blog);
  userLink.innerText = user.blog;

  userDescription.innerText = user.bio;
};