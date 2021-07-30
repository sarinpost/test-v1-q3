const Browser = require('zombie');
const cheerio = require('cheerio');
const url = 'https://codequiz.azurewebsites.net/';

const name = process.argv[2]

let browser = new Browser();
browser.visit(url).then(() => {
    browser.pressButton('input').then(() => {
        const $ = cheerio.load(browser.html());
        var list = [];
        $('table tr').each(function () {
            var row = {};
            $(this).children().each(function (ind) {
                row['prop' + (ind + 1)] = $(this).text().trim();
            })
            list.push(row);
        });
        let keys = Object.values(list[0])
        list.shift()
        list.forEach(el => {
            let i = 0
            for (const [key, value] of Object.entries(el)) {
                el[keys[i]] = value
                delete el[`prop${i + 1}`]
                i++;
            }
        })
        let x = list.find(el => el['Fund Name'] == name)
        console.log(x['Nav']);
    })
}).catch(error => {
    console.error(`Error occurred visiting ${url}`);
});