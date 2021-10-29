const main = async () => {
  const funContractFactory = await hre.ethers.getContractFactory('FunPortal');
  const funContract = await funContractFactory.deploy();
  await funContract.deployed();
  console.log("Contract deployed to:", funContract.address);
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