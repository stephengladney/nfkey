import axios from "axios"

export function getLink(host, path) {
  return new Promise((resolve, reject) => {
    resolve({
      data: {},
    })
  })
  return axios.get(`api/link?host=${host}&path=${path}`, {})
}

export function createLink({
  host,
  pathname,
  destination_url,
  requirement_smart_contract,
}) {
  return new Promise((resolve, reject) => {
    resolve({
      data: {},
    })
  })
  return axios.post("api/link", {
    host,
    pathname,
    requirement_smart_contract,
    destination_url,
  })
}
