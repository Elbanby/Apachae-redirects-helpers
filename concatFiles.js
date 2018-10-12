/*
This Script concats two files so it grabs a line from file1 and add
a delimeter, then it add the line from file2.

It is used with with txt files.
Files must not include any headers
Files must be included in a results folder specified in the path const variable

Delimeter is currently a single space.
// TODO: Change it to be more terminal interactive
*/

const fs = require("fs");
const readline = require("readline");

const file1 = process.argv[2];
const file2 = process.argv[3];
const output = process.argv[4];

const wStream = fs.createWriteStream(output);

const inStream1 = fs.createReadStream(file1);
const inStream2 = fs.createReadStream(file2);

const rl1 = readline.createInterface(inStream1, wStream);
const rl2 = readline.createInterface(inStream2, wStream);

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
      str = `${orUrlArray[i]} ${destUrlArray[i]}\n`;
      writeLine(str);
    }
  }
}

function writeLine(line) {
  wStream.write(line);
}
