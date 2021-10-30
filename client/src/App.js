import React, { useEffect, useState } from "react";
import classes from './App.module.css';
import abi from './artifacts/contracts/FunPortal.sol/FunPortal.json'
import { ethers } from "ethers";
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress='0xa57b315d1666A8A411862a4e28dcA08752573d6C';
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      //window.ethereum:
    // MetaMask injects a global API into websites visited by its users at window.ethereum. 
    // This API allows websites to request users' Ethereum accounts, read data from blockchains
    //  the user is connected to, and suggest that the user sign messages and transactions.

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
     // Returns a hexadecimal string representing the user's "currently selected" address.
      //The "currently selected" address is the first item in the array returned by eth_accounts.



      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalFuns();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.Fun();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalFuns();
        console.log("Retrieved total wave count...", count.toNumber());
let counts=await wavePortalContract.getFunners(currentAccount)
console.log("No of fun facts send by this address",counts.toNumber());
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className={classes.header}>
        👋 Hey there!
        </div>

        <div className={classes.bio}>
          This is <span className={classes.name}>Ishita</span>.
        </div>

        <button className={classes.wavesButton} onClick={wave}>
          Wave at Me
        </button>
        
        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className={classes.waveButton} onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

                  <div className={classes.account}>Address:{currentAccount}</div>

      </div>
    </div>
  );
}

export default App