const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const funContractFactory = await hre.ethers.getContractFactory('FunPortal');
  const funContract = await funContractFactory.deploy();
  await funContract.deployed();
  console.log("Contract deployed to:", funContract.address);
  console.log("Contract deployed by:", owner.address);
  let funCount;
   funCount = await funContract.getTotalFuns();
  
  let funTxn = await funContract.Fun();
 // const funTxns = await funContract.Fun();

  await funTxn.wait();
  //await funTxns.wait();
  funCount = await funContract.getTotalFuns();
  console.log('HEY')

  funTxn = await funContract.connect(randomPerson).Fun();
  console.log('HEY')

  await funTxn.wait();

  funCount = await funContract.getTotalFuns();


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