// Contract addresses
const presaleAddress = "0x2422287C38434FfA3c04365E3fcDf60bdaB156e2";
const airdropAddress = "0xc823AE3F6e92dC741A37C49b25e6C24d3F130Ea1";
const stakingAddress = "0xF47D6F3e86E5f75681292e57648C5c5E031915be";

// Connect wallet
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert("Wallet connected: " + accounts[0]);
    } catch (err) {
      console.error("Connection error", err);
    }
  } else {
    alert("Please install MetaMask.");
  }
}

// Buy with MetaMask
async function buyToken() {
  const tx = {
    to: presaleAddress,
    value: '0x2386F26FC10000'  // 0.01 ETH in hexadecimal (adjust as needed)
  };
  await window.ethereum.request({ method: 'eth_sendTransaction', params: [tx] });
}

// Claim airdrop
async function claimAirdrop() {
  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      to: airdropAddress,
      data: '0x4e71d92d' // claim() function signature hash
    }]
  });
}

// Stake tokens
async function stakeTokens() {
  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      to: stakingAddress,
      data: '0xa694fc3a' // stake() function signature hash
    }]
  });
}

// Withdraw tokens
async function withdrawTokens() {
  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      to: stakingAddress,
      data: '0x3ccfd60b' // withdraw() function signature hash
    }]
  });
}

// Attach to buttons
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connect").onclick = connectWallet;
  document.getElementById("buy").onclick = buyToken;
  document.getElementById("airdrop").onclick = claimAirdrop;
  document.getElementById("stake").onclick = stakeTokens;
  document.getElementById("withdraw").onclick = withdrawTokens;
});
