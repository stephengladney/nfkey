import { ethers } from "ethers"
import Web3Modal from "web3modal"
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import WalletConnectProvider from "@walletconnect/web3-provider"

let provider

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
]

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

export async function getSmartContractName(contractAddress) {
  const _provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
  )
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, _provider)
  const name = await contract.name()
  return name
}
