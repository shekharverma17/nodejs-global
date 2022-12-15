
import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath='./csv/sample.csv'

const readStream=fs.createReadStream(csvFilePath);
var writerStream = fs.createWriteStream('output.txt');

writerStream.on('error', (err) => {
  console.log(err);
});

readStream.pipe(csv()).pipe(writerStream);

readStream.on('error', (err) => {
  console.log(err);
});