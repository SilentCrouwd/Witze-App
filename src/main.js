import { getJoke } from "../api.js";
import "./style.scss";
loadNewJoke();

function loadNewJoke() {
  //   Get Joke by Click

  const loadBtnEl = document.querySelector(".Btn--Load");
  loadBtnEl.addEventListener("click", async () => {
    const newJoke = await getJoke();
    //  Set to Display
    const jokeDisplay = document.querySelector(".Main__Joke");
    jokeDisplay.innerHTML = newJoke[0].text;
  });
}
