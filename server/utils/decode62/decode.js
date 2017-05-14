'use strict';

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

module.exports.decodeBase64 = function(str){
  str = str.split('');
  let numberFormat = [];
  let convert = 0;
  //We need to get the string and convert it again to the numbers format
  /*For this we itereate over all the array if an element is not a number
  we find the assigned number in our alpabhet*/
  str.forEach(function(item, index){
    if(isNaN(item)){
      //The index is the assigned number
      numberFormat.push(ALPHABET.indexOf(item))
    }else{
      //We just convert the element
      numberFormat.push(parseInt(item));
    }
  })
  for(let i = 0; i < numberFormat.length; i++){
    /*To convert to the original form, we just change like
    [2,3,C] = [2,3,38] = 2*(62^2) + 3*(62^1) + 38*(62^0) 
     = 7688 + 186 + 38 = 7912 */
  convert += numberFormat[i] * (Math.pow(62, (numberFormat.length-1) - i)); 
  }
  return convert;
}
