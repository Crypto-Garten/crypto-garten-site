
// Web3 Integration Example (simplified for educational purposes)
const presaleAddress = "0x2422287C38434FfA3c04365E3fcDf60bdaB156e2";
const airdropAddress = "0xc823AE3F6e92dC741A37C49b25e6C24d3F130Ea1";
const stakingAddress = "0xF47D6F3e86E5f75681292e57648C5c5E031915be";
const tokenAddress = "0x65508a62173df9502F9f2e098C583230Fb1eA875";
const receiverWallet = "0xDF38080ecF6D985C086FDb4a67Fe914cD6E2e5BE";

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert("Wallet connected: " + accounts[0]);
        } catch (error) {
            console.error("User rejected wallet connection", error);
        }
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}

function buyToken() {
    window.open("https://bscscan.com/address/" + presaleAddress, "_blank");
}

function claimAirdrop() {
    window.open("https://bscscan.com/address/" + airdropAddress, "_blank");
}

function stakeTokens() {
    window.open("https://bscscan.com/address/" + stakingAddress, "_blank");
}

function withdrawTokens() {
    window.open("https://bscscan.com/address/" + stakingAddress, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("connect").onclick = connectWallet;
    document.getElementById("buy").onclick = buyToken;
    document.getElementById("airdrop").onclick = claimAirdrop;
    document.getElementById("stake").onclick = stakeTokens;
    document.getElementById("withdraw").onclick = withdrawTokens;
});
