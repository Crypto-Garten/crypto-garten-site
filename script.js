// Load ethers.js via CDN
// <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.min.js"></script>

const presaleAddress = "0x2422287C38434FfA3c04365E3fcDf60bdaB156e2";
const airdropAddress = "0xc823AE3F6e92dC741A37C49b25e6C24d3F130Ea1";
const stakingAddress = "0xF47D6F3e86E5f75681292e57648C5c5E031915be";

const presaleAbi = [
  { "constant": false, "inputs": [], "name": "buy", "outputs": [], "stateMutability": "payable", "type": "function" }
];

const airdropAbi = [
  { "constant": false, "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

const stakingAbi = [
  { "constant": false, "inputs": [], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

let provider, signer;

// Helper to show spinner
function setButtonLoading(button, loading, defaultText) {
  if (loading) {
    button.disabled = true;
    button.innerHTML = `<span class="spinner"></span>Loading...`;
  } else {
    button.disabled = false;
    button.innerText = defaultText;
  }
}

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    await ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    Swal.fire({
  icon: 'success',
  title: 'Wallet Connected!',
  showConfirmButton: false,
  timer: 2000
});
  } else {
    alert("Please install MetaMask.");
  }
}

async function buyTokens() {
  if (!signer) return alert("Connect wallet first.");
  const buyButton = document.getElementById("buy");
  setButtonLoading(buyButton, true, "Buy with MetaMask");
  try {
    const contract = new ethers.Contract(presaleAddress, presaleAbi, signer);
    const tx = await contract.buy({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Tokens purchased!");
  } catch (err) {
    console.error(err);
    alert("Purchase failed.");
  }
  setButtonLoading(buyButton, false, "Buy with MetaMask");
}

async function claimAirdrop() {
  if (!signer) return alert("Connect wallet first.");
  const airdropButton = document.getElementById("airdrop");
  setButtonLoading(airdropButton, true, "Claim Airdrop");
  try {
    const contract = new ethers.Contract(airdropAddress, airdropAbi, signer);
    const tx = await contract.claim();
    await tx.wait();
    alert("Airdrop claimed!");
  } catch (err) {
    console.error(err);
    alert("Claim failed.");
  }
  setButtonLoading(airdropButton, false, "Claim Airdrop");
}

async function stakeTokens() {
  if (!signer) return alert("Connect wallet first.");
  const stakeButton = document.getElementById("stake");
  setButtonLoading(stakeButton, true, "Stake");
  try {
    const contract = new ethers.Contract(stakingAddress, stakingAbi, signer);
    const tx = await contract.stake();
    await tx.wait();
    alert("Staked successfully!");
  } catch (err) {
    console.error(err);
    alert("Stake failed.");
  }
  setButtonLoading(stakeButton, false, "Stake");
}

async function withdrawTokens() {
  if (!signer) return alert("Connect wallet first.");
  const withdrawButton = document.getElementById("withdraw");
  setButtonLoading(withdrawButton, true, "Withdraw");
  try {
    const contract = new ethers.Contract(stakingAddress, stakingAbi, signer);
    const tx = await contract.withdraw();
    await tx.wait();
    alert("Withdrawn successfully!");
  } catch (err) {
    console.error(err);
    alert("Withdraw failed.");
  }
  setButtonLoading(withdrawButton, false, "Withdraw");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connect").onclick = connectWallet;
  document.getElementById("buy").onclick = buyTokens;
  document.getElementById("airdrop").onclick = claimAirdrop;
  document.getElementById("stake").onclick = stakeTokens;
  document.getElementById("withdraw").onclick = withdrawTokens;
});
