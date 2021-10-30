const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const funContractFactory = await hre.ethers.getContractFactory('FunPortal');
  const funContract = await funContractFactory.deploy();
  await funContract.deployed();
  console.log("Contract deployed to:", funContract.address);
  console.log("Contract deployed by:", owner.address);
  console.log("contract deployed to", randomPerson.address);
  let funCount;
   funCount = await funContract.getTotalFuns();
  
  let funTxn = await funContract.Fun("this fun");
 // const funTxns = await funContract.Fun();

  await funTxn.wait();
  //await funTxns.wait();
  funCount = await funContract.getTotalFuns();

  funTxn = await funContract.connect(randomPerson).Fun("This is fun");

  await funTxn.wait();

  funCount = await funContract.getTotalFuns();

  let getFunss= await funContract.returnMessageDetails(randomPerson.address);
  console.log(getFunss);
let getFuns= await funContract.returnMessageDetailss();
console.log(getFuns);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();