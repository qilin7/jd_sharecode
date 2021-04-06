const fs = require("fs-extra");
const codepath = "./code.txt";

//#region 可编辑区

//京东账号数(即助力码复制几遍)
var accountNum = 2;

//TG机器人提交助力码（自己账号的助力码放在code.txt文件前面，然后指定需要提交几个账号的数量）
var tgaccountNum = 2;

//#endregion

if (!fs.existsSync(codepath)) {
  console.log(`code.txt文件不存在，请在同级目录创建code.txt\n`);
  console.log(
    `基本上把脚本生成的助力码整个复制过来就行。\n但是以防万一还是说下规则，code.txt编写规则: \n一行一种助力码，必须包含助力码名字和'】'字符，且'】'字符后面为助力码。助力码后面不可有多余字符。`
  );
}

let data = fs.readFileSync(codepath).toString("utf-8");
const lines = data.split(/\r?\n/);

var DDFACTORY_SHARECODES = getCodeArr(lines, "东东工厂");
var DREAM_FACTORY_SHARE_CODES = getCodeArr(lines, "京喜工厂");
var FRUITSHARECODES = getCodeArr(lines, "京东农场");
var JDCFD_SHARECODES = getCodeArr(lines, "财富岛");
var JDJOY_SHARECODES = getCodeArr(lines, "crazyJoy");
var JDSGMH_SHARECODES = getCodeArr(lines, "闪购盲盒");
var PETSHARECODES = getCodeArr(lines, "京东萌宠");
var PLANT_BEAN_SHARECODES = getCodeArr(lines, "种豆得豆");
var JXNC_SHARECODES = getCodeArr(lines, "京喜农场");
var JDZZ_SHARECODES = getCodeArr(lines, "京东赚赚");
var JD_CASH_SHARECODES = getCodeArr(lines, "签到领现金");

console.info(`\n====👇👇👇TG助力码打印开始：====\n`);
console.info(`\n提交机器人 @Turing Lab Bot\n`);
logTGcode("东东工厂", "/submit_activity_codes ddfactory", DDFACTORY_SHARECODES);
logTGcode(
  "京喜工厂",
  "/submit_activity_codes jxfactory",
  DREAM_FACTORY_SHARE_CODES
);
logTGcode("京东农场", "/submit_activity_codes farm", FRUITSHARECODES);
logTGcode("财富岛", "/submit_activity_codes jxcfd", JDCFD_SHARECODES);
logTGcode("闪购盲盒", "/submit_activity_codes sgmh", JDSGMH_SHARECODES);
logTGcode("京东萌宠", "/submit_activity_codes pet", PETSHARECODES);
logTGcode("种豆得豆", "/submit_activity_codes bean", PLANT_BEAN_SHARECODES);
console.info(`\n提交机器人 @Commit Code Bot\n`);
logTGcode("京东赚赚", "/jdzz", JDZZ_SHARECODES);
logTGcode("签到领现金", "/jdcash", JD_CASH_SHARECODES);
logTGcode("crazyJoy", "/jdcrazyjoy", JDJOY_SHARECODES);
console.log(`\n====👆👆👆TG助力码打印结束====\n`);

console.info(`\n====👇👇👇他人助力码打印开始：====\n`);
logcode("东东工厂", "DDFACTORY_SHARECODES", DDFACTORY_SHARECODES);
logcode("京喜工厂", "DREAM_FACTORY_SHARE_CODES", DREAM_FACTORY_SHARE_CODES);
logcode("京东农场", "FRUITSHARECODES", FRUITSHARECODES);
logcode("财富岛", "JDCFD_SHARECODES", JDCFD_SHARECODES);
logcode("crazyJoy", "JDJOY_SHARECODES", JDJOY_SHARECODES);
logcode("闪购盲盒", "JDSGMH_SHARECODES", JDSGMH_SHARECODES);
logcode("京东萌宠", "PETSHARECODES", PETSHARECODES);
logcode("种豆得豆", "PLANT_BEAN_SHARECODES", PLANT_BEAN_SHARECODES);
logcode("京喜农场", "JXNC_SHARECODES", JXNC_SHARECODES);
logcode("京东赚赚", "JDZZ_SHARECODES", JDZZ_SHARECODES);
logcode("签到领现金", "JD_CASH_SHARECODES", JD_CASH_SHARECODES);
console.log(`\n====👆👆👆他人助力码打印结束====\n`);

function logcode(name, codename, code) {
  console.log(
    `${name} : ${codename} = ${copytimes(code.join("@"), accountNum)}\n`
  );
}

function logTGcode(name, codename, code) {
  console.log(
    `${name}\n${codename} ${code.slice(0, tgaccountNum).join("&")}\n`
  );
}

function getCodeArr(lines, codeName) {
  var arr = [];
  lines.forEach((line) => {
    if (line.indexOf("】") >= 0) {
      if (line.indexOf(codeName) >= 0) {
        let reg = /[\s\S]*[】](\S*)$/;
        let resArr = line.match(reg);

        //去空格
        arr.push(resArr[1].replace(/\s*/g, ""));
      }
    }
  });
  //去重
  var x = new Set(arr);
  return [...x];
}

function copytimes(str, num) {
  return new Array(num).fill(str).join("&");
}
