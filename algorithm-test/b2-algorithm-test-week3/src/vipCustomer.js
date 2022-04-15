/*
    VIP 고객

    당신은 어느 매장의 점원입니다.
    이번달 사은품 행사를 위해 가장 많은 금액을 사용한 영수증을 찾아야 합니다.

    고객들의 구매 영수증은 이중배열 arr로 주어집니다.
    이중배열 arr 내부에 존재하는 배열들은 숫자들을 요소로 가집니다.
    배열들의 합을 구하고 그 중 가장 큰 값을 리턴해주세요.

    입출력 예시
    ------------------------------
    input
    ------------------------------
    
    arr = [[1000,3000,2000], [700,5500,3000], [200,3700,5800]]

    ------------------------------
    output
    ------------------------------

    9700

*/

function vipCustomer(arr) {
  let price=[]
  arr.forEach(x=>{
    price.push(x.reduce((acc,cur)=>{
      return acc+cur
    },0))
  })
	return  Math.max(...price)
  // 여기에서 작업하세요.
}

module.exports = vipCustomer
