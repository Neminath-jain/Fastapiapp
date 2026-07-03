console.log("Hello, World!");
let x=10;
console.log(x);
const y=20;
console.log(y);
console.log("sum is",x+y);

function add(x,y){
    return x+y;
}
console.log("sum is",add(x,y));


const arr=[10,20,30,40,50];
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
console.log(arr[3]);
console.log(arr[4]);


//dictionary
const dict={
    "name":"John",
    "age":30,
    "city":"New York"
};
console.log(dict["name"]);
console.log(dict["age"]);
console.log(dict["city"]);

//Destructuring
let {name,age,city}=dict;
console.log(name);
console.log(age);
console.log(city);


//Array Destructuring
const arr1=[1,2,3,4,5];
let [a,b,c,d,e]=arr1;
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);


//rest and spread operator
let a1=[100,200,300];
let b1=[400,500,600];
console.log({...a1,...b1});
console.log({...b1,...a1});
console.log([...a1,...b1]);

//rest operator
// rest operator
function add(a,b,...c){
    return a+b+c;
}
console.log(add(10,20));
console.log(add(10,20,30));
console.log(add(10,20,30,40,50));
console.log(add(10,20,30,40,50,60,70,80,90,100));


//template literals
const a2=10;
const b2=20;
console.log(`The sum of ${a2} and ${b2} is ${a2+b2}.`);















