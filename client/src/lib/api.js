import axios from "axios"
export function getLink(host, path) {
  return axios.get(`http://localhost:5000/api/link?host=${host}&path=${path}`, {
    // headers: { Accept: "text/html" },
  })
}

export function createLink({
  host,
  pathname,
  destination_url,
  requirement_smart_contract,
}) {
  return fetch(
    `api/link?host=${host}&pathname=${pathname}&requirement_smart_contract=${requirement_smart_contract}&destination_url=${destination_url}`,
    {
      method: "POST",
      headers: {},
    }
  )
}
