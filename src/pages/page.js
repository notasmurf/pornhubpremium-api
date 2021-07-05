const cheerio = require('cheerio');
const content = require('../configs/content');

class Page {
  constructor(html) {
    this.html = html;
    this.dom = cheerio.load(html, {
      xml: {
        normalizeWhitespace: true,
      },
    });

    // Check auth.
    if (this.dom.text().includes(content.loginPageText)) {
      throw new Error('Auth failed.');
    }
  }
}

module.exports = Page;
