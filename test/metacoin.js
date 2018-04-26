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
  console.log(numerator.toString());
  const denominator = r.totalReputation.times(r.totalTokens);
  console.log(denominator.toString());
  const a = numerator.div(denominator).sqrt();
  console.log(a.toString());
  console.log(r.payoutAmount.times(a).toString());
  return r.payoutAmount.times(a);
}

function BigNumberCalculationINT(r){
  const numerator = r.userTokens.sqrt().times(r.userReputation.sqrt());
  console.log(numerator.toString(), 't*r');
  const denominator = r.totalReputation.sqrt().times(r.totalTokens.sqrt());
  console.log(denominator.toString(), 'T*R');
  const factor = BigNumber(10).pow(Math.floor(len(denominator)/2));
  console.log(factor.toString(), 'factor');
  const a = numerator.times(factor).div(denominator);
  console.log(numerator.times(factor).toString(), 'numerator*factor');
  console.log(a.toString(), 'res');
  console.log(r.payoutAmount.times(a).div(factor).toString(), 'data');
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
      {
        totalReputation: BigNumber("27836472836478263784623876428736487236428"),
        userReputation: BigNumber("2397429834782374223974298347823742"),
        totalTokens:BigNumber("2837429374236748263784623876478236487236748623874623876234682"),
        userTokens:BigNumber("4523145231452314523145231452314523112"),
        payoutAmount:BigNumber("8275893475873498573984759834759834957349875938475983749857348"),
      },
      {
        totalReputation: BigNumber("27836472836478263784623876428736487236428278364728364782637846238764287364872"),
        userReputation: BigNumber("2397429834782374223974298347823742239742983478237422397429834782374"),
        totalTokens:BigNumber("28374293742367482637846238764782364872367486238746238762346822837429374236748"),
        userTokens:BigNumber("4523145231452314523145231452314523112452314523145231452314523145231452311"),
        payoutAmount:BigNumber("82758934758734985739847598347598349573498759384759837498573488275893475873498"),
      },
    ];
  reputations.forEach(data => {
    it("implementation1", async () => {
      m = await TestCalculation.deployed();
      const gas = await m.implementation1.estimateGas(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const res = await m.implementation1(data.payoutAmount.toString(), data.userReputation.toString(), data.userTokens.toString(), data.totalReputation.toString(), data.totalTokens.toString());
      const onChainResult = BigNumber(res.toString());
      BigNumberCalculation(data);
      const preciseResult = BigNumberCalculationINT(data);
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
