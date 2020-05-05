function getBarGraph() {
  return fetch("/api/bar-graph")
    .then(response => response.json())
}

export default getBarGraph;