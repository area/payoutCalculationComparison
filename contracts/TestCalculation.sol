pragma solidity ^0.4.3;

contract TestCalculation {
 function implementation1(uint256 availableAmount, uint256 r, uint256 t, uint256 R, uint256 T) public pure returns (uint256) {
   uint256 numerator = sqrt(r) * sqrt(t);
   uint256 denumerator = sqrt(R) * sqrt(T);
   uint256 d = numDigits(denumerator) / 2;
   uint256 factor = 10 ** d;
   uint256 res = numerator * factor / (denumerator / factor);
   return mul(res, (availableAmount / factor)) / factor;
   /* return numerator; */
  }

  /* function implementation1(uint256 availableAmount, uint256 r, uint256 t, uint256 R, uint256 T) public pure returns (uint256) {
    uint256 numerator = r * t;
    uint256 denumerator = R * T;
    uint256 d = numDigits(denumerator) / 2;
    uint256 factor = 10 ** uint256((d % 2 == 0) ? d : d - 1);
    uint256 res = sqrt(numerator * factor / (denumerator / factor));
    return mul(res, availableAmount) / factor;
   } */

  function implementation2(uint256 availableAmount, uint256 r, uint256 t, uint256 R, uint256 T) public pure returns (uint256) {
    uint256 numerator = r * t;
    uint256 denumerator = R * T;
    uint256 factor = 78 - (numDigits(numerator) / 2);
    uint256 res = sqrt(numerator * (10 ** factor) / (denumerator / 10 ** factor));
    return mul(res, availableAmount) / (10 ** factor);
   }

   function implementation3(uint256 availableAmount, uint256 r, uint256 t, uint256 R, uint256 T) public pure returns (uint256) {
     uint256 numerator = r * t;
     uint256 denumerator = R * T;
     uint256 factor = 78 - numDigits(numerator);
     uint256 res = sqrt(numerator * (10 ** factor) / denumerator);
     return mul(res, availableAmount) / (10 ** factor);
    }

  function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
      require((z = x - y) <= x);
  }

  function min(uint x, uint y) internal pure returns (uint z) {
      return x <= y ? x : y;
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
