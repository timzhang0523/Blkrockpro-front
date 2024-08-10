import TronWeb from 'tronweb';

function NCinit() {
  
  const TRON_API_KEY = 'e60feaca-ff77-4340-9362-dd1c459655fe';

  const tronWeb = new TronWeb({
      fullNode: 'https://api.trongrid.io',
      solidityNode: 'https://api.trongrid.io',
      eventServer: 'https://api.trongrid.io',
  });

  tronWeb.setHeader({
      "TRON-PRO-API-KEY": TRON_API_KEY,
  });
  return new Promise((resolve, reject) => {
    let obj = {};
    let Inval = setInterval(() => {
      obj.defaultAddress = window.tronWeb.defaultAddress.base58
        ? window.tronWeb.defaultAddress.base58
        : "";
      //当获取到地址的时候就关掉定时器
      if (obj.defaultAddress) {
        window.defaultAddress = obj.defaultAddress;
        window.clearInterval(Inval);
        if (window.tronWeb) {
          obj.tronWeb = window.tronWeb;
          // obj.tronWeb.setHeader({
          //   "TRON-PRO-API-KEY": "e60feaca-ff77-4340-9362-dd1c459655fe",
          // });
        } else {
          console.warn(
            "No tronWeb detected. Falling back to" +
            obj.url +
            " . You should remove this fallback when you deploy live"
          );
        }
        resolve(obj);
      } else {
      
        console.error("Could not connect to contract or chain.");
      
      }
    }, 500);
  });
}

function toFixedReg(value) {
  let count = 4;
  // 小括号内是我们想要的结果
  const reg = new RegExp(`(\\d+\\.?\\d{0,${count}})[\\.\\d]*`);
  return (value + "." + "0".repeat(count))
    .replace(reg, "$1" + "0".repeat(count - 1))
    .replace(reg, "$1");
}

const lpContract = "TEeJxWc5zzh4zJ8ZLgL2MT6RmXpwBf8BAz";
const mainContract = "TXqzibpyWmMtuqLD7NQwm2yrCY34DNC5Sg";
const uContract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

const poolContract = "TM8h7GFZ4aCRMvafFf6VA8fanWSN9dnJZS";


const winContract = "TD9wc9y5wtVVwqNyFEGJ4HgwJ2CpEQXeXX";


export { NCinit, lpContract, mainContract, toFixedReg, uContract, poolContract };