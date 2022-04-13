const { ethers } = require("ethers")

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
]

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
)

// provider.getBalance("gladney.eth")

function newContract(addy) {
  return new ethers.Contract(addy, ERC20_ABI, provider)
}

// const contract = new ethers.Contract(
//   addy,
//   abi,
//   provider
// )

// const name = await contract.name()
// const symbol = await contract.symbol()
// const balance = await contract.balanceOf(addy)

module.exports = { newContract, provider }
