const fs = require('fs');
const readline = require('readline');

const file1 = process.argv[2];
const file2 = process.argv[3];
const output = process.argv[4];
const delimeter = process.argv[5];

const contetnLinks = `./results/${output}`
const damLinks = `./results/dam_${output}`

const inStream1 = fs.createReadStream(file1);
const inStream2 = fs.createReadStream(file2);

const outStream1 = fs.createWriteStream(contetnLinks);
const outStream2 = fs.createWriteStream(damLinks);

const rl1 = readline.createInterface(inStream1, outStream1);
const rl2 = readline.createInterface(inStream1, outStream2);

var orUrlArray = [];
var destUrlArray = [];
var hasBothValues = 0;

rl1.on("line", function(origUrl) {
  orUrlArray.push(origUrl);
});

rl2.on("line", function(destUrl) {
  destUrlArray.push(destUrl);
});

rl1.on("close", () => {
  hasBothValues++;
  concatFiles();
});

rl2.on("close", () => {
  hasBothValues++;
  concatFiles();
});


function concatFiles() {
  let str;
  if (hasBothValues === 2) {
    for (let i = 0; i < orUrlArray.length; i++) {
      str = `${orUrlArray[i]}${delimeter}${destUrlArray[i]}\n`;
      (str.indexOf('/dam/') > -1)? writeFile(damLinks,str) : writeFile(contetnLinks ,str);
    }
  }
}


function writeFile(location, line) {
  fs.appendFile(location, line, (err)=>{
    if (err) {
      console.log(err);
    }
  })
}
