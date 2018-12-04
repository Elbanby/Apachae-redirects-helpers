/*
This scripts append any specified file to any file you specify
This script will also add a time stamp with the # sign infront of it

if you are using it to append to any other file make sure to change the # sign
*/

const fs = require("fs");
const readline = require("readline");

const file1 = process.argv[2];
const file2 = process.argv[3];

const path = `./results/`;

const inStream = fs.createReadStream(`${path}${file1}`);

const rl = readline.createInterface(inStream);

var date = new Date(Date.now());

const header = `\n\n# DATE CREATED: ${date.getMonth()}/${date.getDay()}/${date.getYear()} @${date.getHours()}:${date.getMinutes()}:${date.getSeconds()};\n\n`;

append(header);

rl.on("line", function(line) {
  append(line + "\n");
});

function append(line) {
  fs.appendFile(file2, line, err => {
    if (err) {
      console.log(err);
    }
  });
}
