function getValueTest() {
  return fetch("/api/")
    .then(response => response.json())
}

export default getValueTest;