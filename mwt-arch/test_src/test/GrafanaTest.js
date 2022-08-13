const puppeteer = require('puppeteer');
const { expect } = require('chai');
const SearchWorkflow  = require('../workflow/SearchWorkflow.js');
const SideMenuWorkflow  = require('../workflow/SideMenuWorkflow.js');

const searchWorkflow = new SearchWorkflow();
const sideMenuWorkflow = new SideMenuWorkflow();

// puppeteer options
const opts = {
    headless: false,
    slowMo: 100,
    timeout: 60000
};


let browser, page;

before (async function () {
    this.timeout(10000);
    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
});

after (function () {
    this.timeout(10000);
    page.close();
    browser.close();
});

describe('MWT for Grafana', function () {
    it('should work', async function () {
        await searchWorkflow.visitPage(page);

        await sideMenuWorkflow.isVisible(page);

        await searchWorkflow.search(page, 'binary');

        const searchResultHtml = await searchWorkflow.getSearchResultHtml(page);

        expect(searchResultHtml).to.contain('binary');

        await new Promise((resolve) => { setTimeout(resolve, 10000);});
    }).timeout(60000);
});