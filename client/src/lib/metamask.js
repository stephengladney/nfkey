const ethereum = window.ethereum

export function getEthAccounts() {
  return ethereum.request({ method: "eth_requestAccounts" })
}

// const provider = new ethers.providers.Web3Provider(window.ethereum)
// const signer = provider.getSigner()
// const signature = await signer.signMessage(message)
// const address = await signer.getAddress()
