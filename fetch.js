export async function fetchData({ url, query, method, data }) {
  const result = await fetch(`${url}${query ? query : ""}`, {
    method: method || "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    //   body: '{"titre": "test", "content": "mon contenu"}',
    body: data ? JSON.stringify(data) : data,
  });
  if (result.ok === true) {
    return result.json();
  }
  throw new Error("Erreur request");
}
