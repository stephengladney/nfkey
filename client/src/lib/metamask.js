const ethereum = window.ethereum

export function getEthAccounts() {
  return ethereum.request({ method: "eth_requestAccounts" })
}
