
// Connect to MetaMask and interact with deployed smart contracts using ethers.js

const presaleAddress = "0x2422287C38434FfA3c04365E3fcDf60bdaB156e2";
const airdropAddress = "0xc823AE3F6e92dC741A37C49b25e6C24d3F130Ea1";
const stakingAddress = "0xF47D6F3e86E5f75681292e57648C5c5E031915be";

// ABI fragments for demo purposes
const airdropAbi = [
  "function claim() public"
];
const stakingAbi = [
  "function stake() public payable",
  "function withdraw() public"
];

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Wallet connected: " + accounts[0]);
    } catch (error) {
      console.error("User rejected wallet connection", error);
    }
  } else {
    alert("Please install MetaMask to use this feature.");
  }
}

async function buyToken() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: presaleAddress,
      value: ethers.utils.parseEther("0.01") // Change value as needed
    });
    await tx.wait();
    alert("Tokens purchased successfully!");
  } catch (err) {
    console.error("Purchase failed:", err);
    alert("Error during purchase.");
  }
}

async function claimAirdrop() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const airdropContract = new ethers.Contract(airdropAddress, airdropAbi, signer);
    const tx = await airdropContract.claim();
    await tx.wait();
    alert("Airdrop claimed!");
  } catch (err) {
    console.error("Claim failed:", err);
    alert("Error claiming airdrop.");
  }
}

async function stakeTokens() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(stakingAddress, stakingAbi, signer);
    const tx = await stakingContract.stake({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    alert("Tokens staked!");
  } catch (err) {
    console.error("Staking failed:", err);
    alert("Error during staking.");
  }
}

async function withdrawTokens() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(stakingAddress, stakingAbi, signer);
    const tx = await stakingContract.withdraw();
    await tx.wait();
    alert("Tokens withdrawn!");
  } catch (err) {
    console.error("Withdrawal failed:", err);
    alert("Error during withdrawal.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("connect").onclick = connectWallet;
  document.getElementById("buy").onclick = buyToken;
  document.getElementById("airdrop").onclick = claimAirdrop;
  document.getElementById("stake").onclick = stakeTokens;
  document.getElementById("withdraw").onclick = withdrawTokens;
});
