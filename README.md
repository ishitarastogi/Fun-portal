# run.js

```shell
const funContractFactory = await hre.ethers.getContractFactory("FunPortal");
```
This will actually compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.

```shell
const funContract = await funContractFactory.deploy();
```
Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. What's the point? It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.

```shell
await funContract.deployed();
```
wait until  contract is officially deployed to  local blockchain! Constructor runs when it actually deploy.
```shell
console.log("Contract deployed to:", funContract.address);
```