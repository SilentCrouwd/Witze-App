const API_ENDPOINT = "https://witzapi.de//api/joke/";
export let jokeList = [];

export async function getJoke() {
  const response = await fetch(API_ENDPOINT);
  const newJoke = await response.json();
  return newJoke;
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
