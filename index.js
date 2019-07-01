const fs = require('fs')
const Mercury = require('@postlight/mercury-parser');

const inFile = 'input.txt'
let lineCounter = 0

const lineReader = require('readline').createInterface({
    input: fs.createReadStream(inFile)
});

lineReader.on('line', function (url) {
    const filename = `${lineCounter}-${(new URL(url)).hostname}.json`
    lineCounter++
    console.log(`Now getting contents for ${url} ...`)

    Mercury.parse(url, { contentType: 'text'})
        .then((result) => {
            fs.writeFile(`out/${filename}`, JSON.stringify(result, {}, 2), 'utf8', (err) => {
                if (err) throw err
            })
        })
        .catch((err) => {
            console.log(`ERR: ${err}`)
        })
});
