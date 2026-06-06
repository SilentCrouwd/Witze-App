import { getJoke, getLocalStorage, jokeList, setLocalStorage } from "../api.js";
import "./style.scss";
const jokeDisplay = document.querySelector(".Main__Joke"); //   Get Joke by Click
const loadBtnEl = document.querySelector(".Btn--Load");
const saveBtnEl = document.querySelector(".Btn--Inverted");

loadBtnEl.addEventListener("click", async () => {
  const newJoke = await getJoke();

  jokeDisplay.innerText = newJoke[0].text;
  saveBtnEl.classList.remove("disabled");
});

saveBtnEl.addEventListener("click", () => {
  jokeList.push(jokeDisplay.innerText);
  setLocalStorage();
});

function renderJokes() {
  let jokes = getLocalStorage();
}

//Duplikate vermeiden
//An Liste Übergeben
// Witze aus dem Lokal storage laden bei Reload
//WItz Placeholder
