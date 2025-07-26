console.log("i am abrar")
let a="abrar"
console.log(a[0]);
console.log(a.length)
console.log('i am ${ a } with age is 7')
console.log(a.toUpperCase())
console.log(a.slice(1,3))/*replace concatinate  .trim() once string created cannot b changed */
console.log(a.concat("ali","44", "ash"))  


let arr=[1,2,34,5,8,9,10]
console.log(arr.slice(2,3))
console.log(arr)
console.log(arr.splice(2,3))
console.log(arr)
console.log(typeof(arr))/*tostring push pop(lst) shift(1st) concat[change array not] sort delete unshift*/
console.log(arr.join("and"))

arr.forEach((value,index,arr1)=>{
    console.log(value,index,arr1)
})
let obj = {
    a: 1,
    b: 2,
    c: 3
};

for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
        const ele = obj[key];
        console.log(key ,ele);
    }
}
for (const iterator of arr) {
    console.log(iterator)
    
}

arr.forEach((value,index, arr)=>{
    console.log(value,index,arr)
})

let arrays=[2,4,5,99,56]
let newarray=arrays.map((e)=>{
    return e ** 2
})

console.log(newarray)

const greaterthan50 =((e)=>{
    if(e>50){
        return true
    }
    return false
})
console.log(newarray.filter(greaterthan50))
 
let arr2=[1,2,3,4,5]
const red=((a,b)=>{
    return a*b
})

console.log(arr2.reduce(red))
console.log(Array.from("hello kitty"))
let elem=7;
const fact=[]
for (let index = elem; index > 1; index--) {

    fact.push(index)
    
}
console.log(fact.reduce(red))
