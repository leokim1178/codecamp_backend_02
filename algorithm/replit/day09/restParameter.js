// 인수로 전달된 숫자들의 총함을 구하는 함수를 만들어주세요.

//RestParameter를 사용해주세요.
function sum4(...args){
  let total =  0;
  for(ele of args){
    total += ele
  }

  return total
}
console.log(sum4(5,7,2)); // 14

//api 만들때 활용하게된다