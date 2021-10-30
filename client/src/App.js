import React, { useEffect, useState } from "react";
import classes from './App.module.css';
import abi from './artifacts/contracts/FunPortal.sol/FunPortal.json'
import { ethers } from "ethers";
const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);

  const contractAddress='0x122aFFdd58A5Fd1e687EB6be3F2fd76007541Fb5';
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
        getAllWaves();
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
        const waveTxn = await wavePortalContract.Fun("Hello");
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

  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
console.log('hey')
        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.returnFuns();
        console.log(waves);

        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
           wavesCleaned.push({
           address: wave.funSender,
             timestamp: new Date(wave.timestamp * 1000),
            message: wave.Message
           });
         });
console.log(wavesCleaned)
        
      //   Store our data in React State
         
       setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
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
                  {/* <button  onClick={getAllWaves}>get</button> */}


                  <div className={classes.account}>Address:{currentAccount}</div>
                 {/* <div>{allWaves}</div>  */}

                  {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}

export default App