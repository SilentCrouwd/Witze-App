import {
  getJoke,
  getCategory,
  getLocalStorage,
  jokeList,
  removeJoke,
  setLocalStorage,
} from "../api.js";
import "./style.scss";
const jokeDisplay = document.querySelector(".Main__Joke"); //   Get Joke by Click
const loadBtnEl = document.querySelector(".Btn--Load");
const saveBtnEl = document.querySelector(".Btn--Inverted");
const dropdown = document.querySelector(".Header__Dropdown");
let currCategory = undefined;
addEventListener("DOMContentLoaded", () => {
  getLocalStorage();
  renderJokes();
  setCategorys();
});

dropdown.addEventListener("change", async () => {
  currCategory = dropdown.value;
  console.log(currCategory);
});

loadBtnEl.addEventListener("click", async () => {
  const newJoke = await getJoke(currCategory);

  jokeDisplay.innerText = newJoke;
  saveBtnEl.classList.remove("disabled");
});

saveBtnEl.addEventListener("click", () => {
  if (localStorage.length === 0) {
    jokeList.push(jokeDisplay.innerText);
    setLocalStorage();
    renderJokes();
  } else {
    const jokes = getLocalStorage();
    const isSaved = jokes.includes(jokeDisplay.innerText);
    if (isSaved === false) {
      jokeList.push(jokeDisplay.innerText);
      setLocalStorage();
      renderJokes();
    } else {
      alert("Der Witz befindet sich schon in der Liste");
    }
  }
});
window.removeSavedJoke = removeSavedJoke;

async function setCategorys() {
  const newCategory = await getCategory();
  console.log(newCategory);
  newCategory.forEach((elm) => {
    const option = document.createElement("option");
    option.value = elm.name;
    option.textContent = elm.name;
    option.classList.add("Header__Dropdown__Option");
    dropdown.appendChild(option);
  });
}

function removeSavedJoke(index) {
  removeJoke(index);

  renderJokes();
}

function renderJokes() {
  let html = "";
  const jokeContainer = document.querySelector(".Footer__JokeContainer");

  if (jokeList.length !== 0) {
    jokeList.forEach((elm, index) => {
      html += `
  <div class="Footer__JokeCard id="${index}" >
            <p class="Footer__SavedJoke">
                  ${elm}    
            </p>
            <button class="Btn Btn--Delete" onclick="removeSavedJoke(${index})">
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                id="mdi-delete-forever"
                class="Btn__Svg Btn__Svg--Delete"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                />
              </svg>
            </button>
          </div>
  `;
    });

    jokeContainer.innerHTML = html;
  } else {
    jokeContainer.innerHTML = "Bisher keine Witze gespeichert";
    jokeContainer.style.color = "white";
    jokeContainer.style.marginTop = "1rem";
  }
}
//Duplikate v
