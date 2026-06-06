

export async function getJoke() {
  const response = await fetch("https://witzapi.de//api/joke/");
  const newJoke = await response.json();
  return newJoke;
}
