const fs = require("fs");
const csv = require("csv-parser");

function processCsvFile(csvFilePath, outputFilePath) {
  const addressesArray = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const addresses = Object.values(row);
      addressesArray.push(...addresses);
    })
    .on("end", () => {
      const jsContent = `${JSON.stringify(addressesArray)};`;
      fs.writeFileSync(outputFilePath, jsContent);
      console.log(`Array written to ${outputFilePath}`);
    });
}

const csvFilePath = "./addresses.csv";
const outputFilePath = "addresses.js";
processCsvFile(csvFilePath, outputFilePath);
