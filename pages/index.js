import Web3 from "web3";

export default function Home() {

  const loggedIn = "";

  const enableEth = async () => {

    let connectBtn = document.getElementById('connect-metamask')
    let balanceBtn = document.getElementById('check-balance')

    if (typeof window.ethereum !== 'undefined') {
      web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        loggedIn = true;
        console.log("logged in")
        connectBtn.style.display = "none";
        balanceBtn.style.display = "block";
        return true
      } catch (err) {
        alert("You must connect to metamask to use this Dapp!")
        return false
      }
    } else {
      console.log("Metamask must be installed to use this page!")
    }

  }

  const checkBalance = async () => {
    const p = document.getElementById('eth-balance')
    if (loggedIn === true) {
      const accounts = await web3.eth.getAccounts()
      const balance = await web3.eth.getBalance(accounts[0])
      const ethBalance = web3.utils.fromWei(balance, "ether")
      p.innerHTML = "ETH balance: " + ethBalance
    }

  }

  return (
    <div>
      <h1> Metamask Wallet Check</h1>
      <button id="connect-metamask" onClick={enableEth}>Connect MetaMask</button>
      <button id="check-balance" style={{ display: "none" }} onClick={checkBalance}>Check Coin balance</button>
      <p id="eth-balance"></p>
    </div>
  )



}


