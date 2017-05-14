'use strict';

//These are our 62 possible characters for encoding (62^n) donde n = 6
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
/*
    We are placing the conversion of our number, for example for 7,912 we have
    7912/62^2(3844) (Highest available, this to shorten the url) = 2 with reminder of
    224, then 244/62^1(62) = 3, with remainder of 38. So we have:
    [2 3 38] => Using our map we obtain the shorten which is "23C" ("C" has the 38th place)
    */
module.exports.encodeBase64 = function encodeBase64(n){
	let digits = [];
  let remainder = null;
  let result = '';
  const BASE = 62;
  while(n > 0){
  	remainder = n % BASE;
    /*
    We are placing the conversion of our number, for example for 7,912 we have
      7912%62 = 38, n = 127
      127%62 = 3, n = 2;
      2%62 = 2
      [38,3,2]
    */
    digits.push(remainder);
    n = Math.floor(n/BASE);
  }
  digits.reverse().forEach(function(item){
  	result += ALPHABET[item];
  });
  return result;
}

