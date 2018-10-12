const fs = require("fs");
const readline = require("readline");
const http = require("http");

const input = process.argv[2];
const output = process.argv[3];
const outputError = "error_" + output;

const inStream = fs.createReadStream(input);
const wStream = fs.createWriteStream(output);

const rl = readline.createInterface(inStream, wStream);

//Domain isn't always the same. So make sure you add a variable for that
const domain = "http://docker.quadrusinvestmentservices.com";

var origUrlArray = [];
var destUrlArray = [];

let numberOfLinks = 1;

rl.on("line", line => {
  splitCommas(line);
});

rl.on("close", () => {
  // console.log(origUrlArray);
  // console.log(destUrlArray);

  if (origUrlArray.length != destUrlArray.length) {
    console.error(
      "bouth original urls and destination urls must have the same amount of links"
    );
    console.log(`Orignial links number: ${origUrlArray.length}`);
    console.log(`Destination links number: ${destUrlArray.length}`);
    return 0;
  }

  sendRequests();
});

function splitCommas(line) {
  let link = line.split(",");
  origUrlArray.push(domain + link[0]);
  destUrlArray.push(domain + link[1]);
}

function sendRequests() {
  let data = "";

  for (let i = 0; i < origUrlArray.length; i++) {
    http
      .get(origUrlArray[i], res => {
        if (
          res.headers.location === destUrlArray[i] &&
          res.statusCode === 301
        ) {
          console.log("true");
        } else {
          console.log(`[${res.headers.location} >>> ${destUrlArray[i]}]`);
          console.log(res.statusCode);
          console.log(`number of links tested: ${numberOfLinks}`);
          console.log(origUrlArray.length);
          console.log("\n");
        }

        if (res.statusCode === 404) {
          console.log(
            `${origUrlArray[i]} has an error, might need a rule to fix \n`
          );
        }

        res.on("data", () => {
          numberOfLinks++;
        });
      })
      .on("error", err => {
        console.log(err);
        numberOfLinks++;

        if (err.code == "ETIMEDOUT") {
          //  Here we should report it in the error file as Connection time out
          data = `${origUrlArray[i]}, Time Out\n`;
        } else if (err.code == "ECONNRESET") {
          //TCP conversation abruptly closed its end of the connection
          data = `${origUrlArray[i]}, TCP conversation closed \n`;
        } else if (err.code == "ENOTFOUND") {
          //This means DNS errors, specifically, Node can't resolve a hostname "www.mysite.com" to an IP-address.
          data = `${origUrlArray[i]}, DNS error\n`;
        } else {
          data = `${origUrlArray[i]}, ${err.code}\n`;
        }
        fs.appendFile(output, data, err => {
          if (err) {
            console.log(` CAUSED BY: ${link} \n${err}`);
          }
        });
      });
  }
}
