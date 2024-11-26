// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("NFTmarketplace", (m) => {
  
  const NFTMarketplace = m.contract("NFTMarketplace", []);

  return {NFTMarketplace};
});
