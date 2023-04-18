// // 1번
// const nums = [1,2,3,4,5,6,7,8]

// for (let i = 0; i < nums.length; i++) {
//   console.log('nums[' + i + ']: ' + nums[i])
// }

// // for (const i = 0; i < nums.length; i++) {
// //                                     ^

// // TypeError: Assignment to constant variable.

// // for문에서는 const를 사용하면 안된다.


// // 2번
// for (const num in nums) {
//   console.log(nums[num], typeof nums[num])
//   if (typeof nums[num] === 'number') {
//     console.log('yeyyeye')
//   }
// }
// console.log(typeof 1)
// if (typeof 1 === 'number') {
//   console.log('yeyeye')
// }
// // 0 string
// // 1 string
// // 2 string
// // 3 string
// // 4 string
// // 5 string
// // 6 string
// // 7 string

// // for...in 구문은 array의 경우 인덱스를 반환하게 되어 key값으로 인식하게 된다.
// // 따라서 nums[num]으로 array의 값을 출력해야한다.


const participantNums =  [[1, 3, 2, 2, 1], 
[3, 7, 100, 21, 13, 6, 5, 7, 5, 6, 3, 13, 21],
[9, 1, 8, 7, 71, 33, 62, 35, 11, 4, 7, 71, 33, 8, 9, 1, 4, 11, 35]
]

function check(params) {
  for (let idx = 0; idx < params.length; idx++) {
    const element = array[idx];
    
  }
}


for (const part of participantNums) {
  
}

// 3
// 100
// 62
