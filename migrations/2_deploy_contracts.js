const MNUcoin = artifacts.require("MNUcoin");

module.exports = function(deployer) {
  const _name = "MNUcoin";
  const _symbol = "MNU";
  const _decimals = 18;
  const _initialSupply = web3.utils.toBN(10000000000).mul(web3.utils.toBN(10).pow(web3.utils.toBN(_decimals)));
  deployer.deploy(MNUcoin, _name, _symbol, _decimals, _initialSupply);
};
