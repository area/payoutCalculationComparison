var TestCalculation = artifacts.require("./TestCalculation.sol");

module.exports = function(deployer) {
  deployer.deploy(TestCalculation);
};
