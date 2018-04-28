pragma solidity ^0.4.3;

contract TestCalculation {
  function getPower(uint256 a, uint256 b) public pure returns (uint256) {
    return (a + b) > 77 ? (77 - a) : b;
  }
  function implementation1(uint256 availableAmount, uint256 r, uint256 t, uint256 R, uint256 T) public pure returns (uint256) {
    uint256 numerator = sqrt(r) * sqrt(t);
    uint256 denomerator = sqrt(R) * sqrt(T);
    uint256 factor = 10 ** getPower(numDigits(numerator), numDigits(denomerator) / 2);
    uint256 res = mul(numerator, factor) / (denomerator / factor);
    return (mul(sqrt(res), sqrt(availableAmount)) / factor) ** 2;
  }

  function implementation2(uint256 availableAmount, uint256 r, uint256 t, uint256 R, uint256 T) public pure returns (uint256) {
    uint256 numerator = sqrt(r) * sqrt(t);
    uint256 denomerator = sqrt(R) * sqrt(T);
    uint256 power = getPower(numDigits(numerator), (numDigits(denomerator) / 2));
    power = power % 2 == 0 ? power : sub(power, 1);
    uint256 res = mul(numerator, 10 ** power) / denomerator;
    return (mul(sqrt(res), sqrt(availableAmount)) / (10 ** (power / 2))) ** 2;
  }

  function sub(uint x, uint y) internal pure returns (uint z) {
    require((z = x - y) <= x);
  }
  function mul(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x);
  }

  function sqrt(uint256 a) public pure returns (uint256) {
    uint256 c = (a + 1) / 2;
    uint256 b = a;
    while (c < b) {
      b = c;
      c = (a / c + c) / 2;
    }
    return b;
  }

  function numDigits(uint256 a) public pure returns (uint8) {
    uint8 len = 0;
    uint256 b = a;
    while (b != 0) {
      b /= 10;
      len++;
    }
    return len;
  }
}
