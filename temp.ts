interface Coin {
  name: string;
  amount: number;
}

// Array method
let array: Coin[] = [
  { name: "USDT", amount: 12 },
  { name: "BTC", amount: 0.0001 },
];

// way 1
const usdt1: Coin | undefined = array.find((item) => item.name === "USDT");

// way 2
let btc1: undefined | Coin = undefined;
for (let i = 0; i < array.length; i++) {
  if (array[i].name === "BTC") {
    btc1 = array[i];
  }
}

//
//
//
// Object method
// This is all to the object method?

let object: { [key: string]: { amount: number } } = {
  USDT: { amount: 12 },
  BTC: { amount: 0.0001 },
};

const usdt: { amount: number } = object["USDT"];

// let arrayTemp: any = [1, 2, 3, 4, 5];
// console.log("Object.keys(arrayTemp): ", Object.keys(arrayTemp));

// let objectTemp: any = { 0: "", 1: "", 2: "", 3: "", 4: "" };
// console.log("Object.keys(objectTemp): ", Object.keys(objectTemp));
