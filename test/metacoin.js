var BigNumber = require('bignumber.js');
var TestCalculation = artifacts.require("./TestCalculation.sol");

function BigNumberCalculation(r){
  const numerator = r.userTokens.times(r.userReputation).sqrt();
  const denominator = r.totalReputation.times(r.totalTokens).sqrt();
  const a = r.payoutAmount.times(numerator);
  return a.div(denominator);
}

contract('TestCalculation', function(accounts) {
  const reputations = [
      {
        totalReputation: BigNumber("1"),
        userReputation: BigNumber("1"),
        totalTokens:BigNumber("1"),
        userTokens:BigNumber("1"),
        payoutAmount:BigNumber("1"),
      },
      {
        totalReputation: BigNumber("10"),
        userReputation: BigNumber("1"),
        totalTokens:BigNumber("10"),
        userTokens:BigNumber("1"),
        payoutAmount:BigNumber("1"),
      },
      {
        totalReputation: BigNumber("10000000000"),
        userReputation: BigNumber("10000"),
        totalTokens:BigNumber("1000000000000000000000"),
        userTokens:BigNumber("1000000000"),
        payoutAmount:BigNumber("2000000000000000000000000000000000"),
      }
    ];
  reputations.forEach(data => {
    it("Test accuracy", async () => {
      m = await TestCalculation.deployed();
      const gas = await m.implementation1.estimateGas(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const res = await m.implementation1(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const onChainResult = BigNumber(res.toString());
      const preciseResult = BigNumberCalculation(data);
      console.log("User Tokens: ", data.userTokens.toString());
      console.log("User Reputation: ", data.userReputation.toString());
      console.log("Total Tokens: ", data.totalTokens.toString());
      console.log("Total Reputation: ", data.totalReputation.toString());
      console.log("Reward pool: ", data.payoutAmount.toString());
      console.log("Percentage Wrong: ", onChainResult.minus(preciseResult).div(preciseResult).times(100).toString(), "%");
      console.log("Absolute Wrong: ", onChainResult.minus(preciseResult).toString())
      console.log("Estimated Gas cost: ", gas.toString());
    });
  });
});
