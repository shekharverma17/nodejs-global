
const csvFilePath='./csv/sample.csv'
//const csvFilePath= './'
const csv=require('csvtojson')


const readStream=require('fs').createReadStream(csvFilePath);

const writeStream=request.put('http://mysite.com/obj.json');

readStream.pipe(csv()).pipe(writeStream);