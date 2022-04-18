import axios from "axios"

export function getLink(host, path) {
  return axios.get(`api/link?host=${host}&path=${path}`, {})
}

export function createLink({
  host,
  pathname,
  destination_url,
  requirement_smart_contract,
}) {
  return axios.post(
    `api/link?host=${host}&pathname=${pathname}&requirement_smart_contract=${requirement_smart_contract}&destination_url=${destination_url}`,
    {}
  )
}
