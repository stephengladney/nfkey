import { ethers } from "ethers"
import Web3Modal from "web3modal"
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import WalletConnectProvider from "@walletconnect/web3-provider"

let provider

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: false,
  theme: "dark",
  providerOptions: {
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "NFKey",
        infuraId: process.env.REACT_APP_INFURA_ID,
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID,
      },
    },
  },
})

export async function connectWallet() {
  const instance = await web3Modal.connect()
  provider = new ethers.providers.Web3Provider(instance)
}

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
