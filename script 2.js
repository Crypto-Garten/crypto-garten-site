// Import Ethers.js via <script> in HTML as discussed

// Smart contract addresses
const tokenAddress = "0x65508a62173df9502F9f2e098C583230Fb1eA875";         // GARTEN Token
const airdropAddress = "0xc823AE3F6e92dC741A37C49b25e6C24d3F130Ea1";
const presaleAddress = "0x2422287C38434FfA3c04365E3fcDf60bdaB156e2";
const stakingAddress = "0xF47D6F3e86E5f75681292e57648C5c5E031915be";

// ABI placeholders (you need real ABIs here!)
const simpleABI = ["function claim() public", "function stake() public", "function withdraw() public", "function buy() payable"];

// Connect wallet
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Wallet connected");
  } else {
    alert("Please install MetaMask.");
  }
}

// Buy tokens from presale
async function buyTokens() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const presaleContract = new ethers.Contract(presaleAddress, simpleABI, signer);

  const valueInEth = "0.01"; // adjust amount if needed
  const tx = await presaleContract.buy({ value: ethers.utils.parseEther(valueInEth) });
  await tx.wait();
  alert("Tokens bought successfully!");
}

// Claim airdrop
async function claimAirdrop() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const airdropContract = new ethers.Contract(airdropAddress, simpleABI, signer);

  const tx = await airdropContract.claim();
  await tx.wait();
  alert("Airdrop claimed!");
}

// Stake tokens
async function stakeTokens() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const stakingContract = new ethers.Contract(stakingAddress, simpleABI, signer);

  const tx = await stakingContract.stake();
  await tx.wait();
  alert("Tokens staked!");
}

// Withdraw tokens
async function withdrawTokens() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const stakingContract = new ethers.Contract(stakingAddress, simpleABI, signer);

  const tx = await stakingContract.withdraw();
  await tx.wait();
  alert("Tokens withdrawn!");
}

// Hook up buttons
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connect").onclick = connectWallet;
  document.getElementById("buy").onclick = buyTokens;
  document.getElementById("airdrop").onclick = claimAirdrop;
  document.getElementById("stake").onclick = stakeTokens;
  document.getElementById("withdraw").onclick = withdrawTokens;
});
