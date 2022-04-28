import { ethers } from "ethers"
import Web3Modal from "web3modal"
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import WalletConnectProvider from "@walletconnect/web3-provider"

let provider

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  theme: "dark",
  providerOptions: {
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "NFKey", // Required
        infuraId: process.env.REACT_APP_INFURA_ID, // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 1, // Optional. It defaults to 1 if not provided
      },
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID, // required
      },
    },
  },
})

export async function connectWallet() {
  const instance = await web3Modal.connect()
  provider = new ethers.providers.Web3Provider(instance)
}

// export function getEthAccounts() {
//   return provider.get
// }

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
