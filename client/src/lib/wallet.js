import { ethers } from "ethers"
const ethereum = window.ethereum

export function getEthAccounts() {
  return ethereum.request({ method: "eth_requestAccounts" })
}

const provider = ethers ? new ethers.providers.Web3Provider(ethereum) : null

export async function getSignatureAndAddress(message) {
  const signer = provider.getSigner()
  const signature = await signer.signMessage(message)
  const address = await signer.getAddress()
  return { address, message, signature }
}

export function verifySignature({ address, message, signature }) {
  const resolvedAddress = ethers.utils.verifyMessage(message, signature)
  return address === resolvedAddress
}
