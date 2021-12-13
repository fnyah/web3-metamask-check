import { useState } from "react/cjs/react.development";
import Web3 from "web3";

export default function Home() {

  const [login, setLogin] = useState();

  const enableEth = async () => {
    if (typeof window.ethereum !== 'undefined') {
      web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        checkLogin()
        return true
      } catch (err) {
        alert("You must connect to metamask to use this Dapp!")
        return false
      }
    } else {
      alert("Metamask must be installed to use this page!")
    }
  }

  const checkBalance = async () => {
    const ethP = document.getElementById('eth-balance')
    const usdP = document.getElementById('usd-balance')
    if (login === true && login != null) {
      const accounts = await web3.eth.getAccounts()
      const balance = await web3.eth.getBalance(accounts[0])
      const ethBalance = web3.utils.fromWei(balance, "ether")
      const usdBalance = await ethPrice(ethBalance)
      ethP.innerHTML = "ETH balance: " + ethBalance
      usdP.innerHTML = "USD balance: $" + usdBalance
    }
  }

  const ethPrice = async (walletBalance) => {
    const res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`)
    const data = await res.json()
    const usdAmount = 0
    if (!data) {
      return {
        notFound: true,
      }
    }
    usdAmount = walletBalance * data.USD
    usdAmount = usdAmount.toFixed(2)
    return usdAmount
  }

  const checkLogin = async () => {
    const connectBtn = document.getElementById('connect-metamask')
    const balanceBtn = document.getElementById('check-balance')
    web3 = new Web3(window.ethereum)
    web3.eth.getAccounts(function (err, accounts) {
      if (accounts.length > 0) {
        console.log("User is logged in to MetaMask");
        connectBtn.style.display = "none";
        balanceBtn.style.display = "block"
        setLogin(true)
        checkBalance()
      } else {
        console.log("User is not logged in to MetaMask");
        connectBtn.style.display = "block"
      }
    });
  }

  checkLogin()

  return (
    <div>
      <h1> Metamask Wallet Check</h1>
      <button id="connect-metamask" style={{ display: "none" }} onClick={enableEth}>Connect MetaMask</button>
      <button id="check-balance" style={{ display: "none" }} onClick={checkBalance}>Check Coin balance</button>
      <p id="eth-balance"></p>
      <p id='usd-balance'></p>
    </div>
  )
}