/* 문자열로 이루어진 배열이 있습니다.
   "123"처럼 숫자로 읽을 수 있는 문자도 있고,
   "1a"처럼 숫자로 읽을 수 없는 문자도 있습니다. 

   이 배열이 주어질 때 
   숫자로 읽을 수 있는 경우에는 숫자로 바꿔
   총 합을 리턴하는 함수 solution을 완성해주세요.
*/
function solution(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if(Number.isNaN(Number(arr[i]))===false){
      sum += Number(arr[i]) 
    }
  }
  return sum;
}
//Number.isNaN이 better than isNaN
//isNaN은 숫자라면 false 나머지는 true
//Number.isNaN은 값이 NaN이면 true 나머지는 false

const arr = ['1', '2w', '3', 'qwer'];


const result = solution(arr);

console.log(result); // 4
