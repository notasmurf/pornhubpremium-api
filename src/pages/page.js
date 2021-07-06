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
    const domText = this.dom.text();

    // Check auth.
    if (domText.includes(content.loginPageText)) {
      throw new Error('Auth failed');
    } else if (domText.includes(content.errorPage)) {
      throw new Error('Page not found');
    }
  }
}

module.exports = Page;
