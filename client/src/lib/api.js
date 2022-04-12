export function getLink(host, path) {
  return fetch(`http://localhost:5000/api/link?host=${host}&path=${path}`, {
    headers: { Accept: "text/html" },
  })
}
