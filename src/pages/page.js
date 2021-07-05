const cheerio = require('cheerio');

class Page {
    constructor(html) {
        this.html = html;
        this.dom = cheerio.load(html, {
            xml: {
                normalizeWhitespace: true,
            }
        });
    }
}

module.exports = Page;
