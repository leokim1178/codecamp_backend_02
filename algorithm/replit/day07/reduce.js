// arr 배열의 총합을 반환하는 함수를 만들어주세요
let arr =  [14, 36, 43, 64, 88, 97];

function sum (arr){
  const result = arr.reduce((acc,cur,i,array)=>{
     console.log(acc, cur)
      return acc+cur
    })
    console.log(result)
  // reduce 메서드를 사용해 주세요.
    return result
}
console.log(sum(arr)); // 342