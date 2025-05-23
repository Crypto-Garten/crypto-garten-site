// Load ethers.js via CDN
// <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.min.js"></script>
// Load SweetAlert2 via CDN
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

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

// Helper for spinner loading
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
      timer: 2000,
      showConfirmButton: false
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Please install MetaMask!',
      timer: 2500,
      showConfirmButton: false
    });
  }
}

async function buyTokens() {
  if (!signer) return Swal.fire({ icon: 'error', title: 'Connect wallet first!', timer: 2000, showConfirmButton: false });
  const buyButton = document.getElementById("buy");
  setButtonLoading(buyButton, true, "Buy with MetaMask");
  try {
    const contract = new ethers.Contract(presaleAddress, presaleAbi, signer);
    const tx = await contract.buy({ value: ethers.utils.parseEther("0.01") }); // Adjust if needed
    await tx.wait();
    Swal.fire({
      icon: 'success',
      title: 'Tokens Purchased!',
      timer: 2000,
      showConfirmButton: false
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Purchase Failed!',
      timer: 2500,
      showConfirmButton: false
    });
  }
  setButtonLoading(buyButton, false, "Buy with MetaMask");
}

async function claimAirdrop() {
  if (!signer) return Swal.fire({ icon: 'error', title: 'Connect wallet first!', timer: 2000, showConfirmButton: false });
  const airdropButton = document.getElementById("airdrop");
  setButtonLoading(airdropButton, true, "Claim Airdrop");
  try {
    const contract = new ethers.Contract(airdropAddress, airdropAbi, signer);
    const tx = await contract.claim();
    await tx.wait();
    Swal.fire({
      icon: 'success',
      title: 'Airdrop Claimed!',
      timer: 2000,
      showConfirmButton: false
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Claim Failed!',
      timer: 2500,
      showConfirmButton: false
    });
  }
  setButtonLoading(airdropButton, false, "Claim Airdrop");
}

async function stakeTokens() {
  if (!signer) return Swal.fire({ icon: 'error', title: 'Connect wallet first!', timer: 2000, showConfirmButton: false });
  const stakeButton = document.getElementById("stake");
  setButtonLoading(stakeButton, true, "Stake");
  try {
    const contract = new ethers.Contract(stakingAddress, stakingAbi, signer);
    const tx = await contract.stake();
    await tx.wait();
    Swal.fire({
      icon: 'success',
      title: 'Staked Successfully!',
      timer: 2000,
      showConfirmButton: false
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Stake Failed!',
      timer: 2500,
      showConfirmButton: false
    });
  }
  setButtonLoading(stakeButton, false, "Stake");
}

async function withdrawTokens() {
  if (!signer) return Swal.fire({ icon: 'error', title: 'Connect wallet first!', timer: 2000, showConfirmButton: false });
  const withdrawButton = document.getElementById("withdraw");
  setButtonLoading(withdrawButton, true, "Withdraw");
  try {
    const contract = new ethers.Contract(stakingAddress, stakingAbi, signer);
    const tx = await contract.withdraw();
    await tx.wait();
    Swal.fire({
      icon: 'success',
      title: 'Withdrawn Successfully!',
      timer: 2000,
      showConfirmButton: false
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Withdraw Failed!',
      timer: 2500,
      showConfirmButton: false
    });
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
