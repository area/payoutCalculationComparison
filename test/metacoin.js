var BigNumber = require('bignumber.js');
var TestCalculation = artifacts.require("./TestCalculation.sol");

function len(n) {
  let l = 0;
  let c = n;
  while(c.decimalPlaces(0).toString() !== "0") {
    c = c.div(10);
    l += 1;
  }
  return l;
}

function BigNumberCalculation(r){
  const numerator = r.userTokens.times(r.userReputation);
  const denominator = r.totalReputation.times(r.totalTokens);
  const a = numerator.div(denominator).sqrt();
  return r.payoutAmount.times(a);
}

function BigNumberCalculationINT(r){
  const numerator = r.userTokens.times(r.userReputation).sqrt();
  console.log(len(r.userTokens.times(r.userReputation)), 't*r');
  const denominator = r.totalReputation.times(r.totalTokens).sqrt();
  console.log(len(r.totalReputation.times(r.totalTokens)), 'T*R');
  const diff = BigNumber(77).minus(len(numerator)).toNumber();
  const factor = BigNumber(10).pow((diff % 2 === 0) ? diff : diff - 1);
  console.log(len(factor), 'factor');
  const a = numerator.times(factor).div(denominator);
  console.log(len(numerator.times(factor)), 't*r*factor');
  console.log(len(r.payoutAmount.times(a)), 'res');
  return r.payoutAmount.times(a).div(factor);
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
        payoutAmount:BigNumber("2000000000"),
      },
      {
        totalReputation: BigNumber("100000000000000000000"),
        userReputation: BigNumber("100000000"),
        totalTokens:BigNumber("1000000000000000000000000000000"),
        userTokens:BigNumber("1000000000000000000"),
        payoutAmount:BigNumber("2000000000000000000000000000000"),
      },
      {
        totalReputation: BigNumber("10000000000000000000000000000000000000000"),
        userReputation: BigNumber("10000000000000000"),
        totalTokens:BigNumber("1000000000000000000000000000000000000000000000000000000000000"),
        userTokens:BigNumber("1000000000000000000000000000000000000"),
        payoutAmount:BigNumber("2000000000000000000000000000000000000000000000000000000000000"),
      },
    ];
  reputations.forEach(data => {
    it("implementation1", async () => {
      m = await TestCalculation.deployed();
      // const gas = await m.implementation1.estimateGas(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const res = await m.implementation1(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const onChainResult = BigNumber(res.toString());
      // const preciseResult = BigNumberCalculation(data);
      console.log("");
      console.log("On chain result: ", onChainResult.toString());
      // console.log("Precise result", preciseResult.toString());
      // console.log("");
      // console.log("User Tokens: ", data.userTokens.toString());
      // console.log("User Reputation: ", data.userReputation.toString());
      // console.log("Total Tokens: ", data.totalTokens.toString());
      // console.log("Total Reputation: ", data.totalReputation.toString());
      // console.log("Reward pool: ", data.payoutAmount.toString());
      // console.log("Percentage Wrong: ", onChainResult.minus(preciseResult).div(preciseResult).times(100).toString(), "%");
      // console.log("Absolute Wrong: ", onChainResult.minus(preciseResult).toString())
      // console.log("Estimated Gas cost: ", gas.toString());
      console.log("");
    });
  });

  reputations.forEach(data => {
    it.skip("implementation2", async () => {
      m = await TestCalculation.deployed();
      const gas = await m.implementation2.estimateGas(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const res = await m.implementation2(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const onChainResult = BigNumber(res.toString());
      const preciseResult = BigNumberCalculation(data);
      console.log("");
      console.log("On chain result: ", onChainResult.toString());
      console.log("Precise result", preciseResult.toString());
      console.log("");
      console.log("User Tokens: ", data.userTokens.toString());
      console.log("User Reputation: ", data.userReputation.toString());
      console.log("Total Tokens: ", data.totalTokens.toString());
      console.log("Total Reputation: ", data.totalReputation.toString());
      console.log("Reward pool: ", data.payoutAmount.toString());
      console.log("Percentage Wrong: ", onChainResult.minus(preciseResult).div(preciseResult).times(100).toString(), "%");
      console.log("Absolute Wrong: ", onChainResult.minus(preciseResult).toString())
      console.log("Estimated Gas cost: ", gas.toString());
      console.log("");
    });
  });

  reputations.forEach(data => {
    it.skip("implementation3", async () => {
      m = await TestCalculation.deployed();
      const gas = await m.implementation3.estimateGas(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const res = await m.implementation3(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const onChainResult = BigNumber(res.toString());
      const preciseResult = BigNumberCalculation(data);
      console.log("");
      console.log("On chain result: ", onChainResult.toString());
      console.log("Precise result", preciseResult.toString());
      console.log("");
      console.log("User Tokens: ", data.userTokens.toString());
      console.log("User Reputation: ", data.userReputation.toString());
      console.log("Total Tokens: ", data.totalTokens.toString());
      console.log("Total Reputation: ", data.totalReputation.toString());
      console.log("Reward pool: ", data.payoutAmount.toString());
      console.log("Percentage Wrong: ", onChainResult.minus(preciseResult).div(preciseResult).times(100).toString(), "%");
      console.log("Absolute Wrong: ", onChainResult.minus(preciseResult).toString())
      console.log("Estimated Gas cost: ", gas.toString());
      console.log("");
    });
  });
});
