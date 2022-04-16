export function getLink(host, path) {
  return fetch(`http://192.168.0.22:5000/api/link?host=${host}&path=${path}`, {
    headers: { Accept: "text/html" },
  })
}
