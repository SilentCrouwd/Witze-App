const API_ENDPOINT = "https://witzapi.de/api/joke/";
const API_CATHEGORIE = "https://witzapi.de/api/category/";

const API_ENDPOINT_CATHEGORY =
  "https://witzapi.de/api/joke/?limit=1&category=antiwitze&language=de";
export let jokeList = [];

export async function getCategory() {
  let category = [];
  const response = await fetch(API_CATHEGORIE);
  category = await response.json();
  return category;
}

export async function getJoke(category) {
  if (category === "Kategorie" || !category) {
    const response = await fetch(API_ENDPOINT);
    const newJoke = await response.json();
    return newJoke[0].text;
  } else {
    const response = await fetch(
      `https://witzapi.de/api/joke/?limit=1&category=${category}&language=de`,
    );
    const newJoke = await response.json();
    return newJoke[0].text;
  }

  const response = await fetch(API_ENDPOINT);
  const newJoke = await response.json();
  return newJoke[0].text;
}

export function setLocalStorage() {
  localStorage.setItem("jokes", JSON.stringify(jokeList));
}

export function getLocalStorage() {
  if (localStorage.length !== 0) {
    jokeList = JSON.parse(localStorage.getItem("jokes"));
    return jokeList;
  }
}

export function removeJoke(index) {
  jokeList.splice(index, 1);
  setLocalStorage();
}
