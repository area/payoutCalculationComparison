pragma solidity ^0.4.3;

contract TestCalculation {
 function implementation1(uint256 availableAmount, uint256 r, uint256 t, uint256 R, uint256 T) public pure returns (uint256) {
    uint256 factor = 78 - numDigits(sqrt(r) * sqrt(t)) - numDigits(availableAmount);
    uint256 res = sqrt(r) * sqrt(t) * (10 ** (factor - 1)) / (sqrt(R) * sqrt(T));
    return res * availableAmount / (10 ** (factor - 1));
  }

  function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
      require((z = x - y) <= x);
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
