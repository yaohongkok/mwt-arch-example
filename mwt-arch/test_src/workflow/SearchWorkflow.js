const SearchPage  = require('../model/SearchPage.js');
const ModelHelper = require('../util/ModelHelper');

class SearchWorkflow {
    async visitPage (page) {
        return page.goto('https://play.grafana.org/d/000000014/elasticsearch-metrics?orgId=1&search=open&query=');
    }

    async search (page, searchTerm) {
        const searchInputSelector = ModelHelper.getSelector(SearchPage, 'searchInput');
        await page.waitForSelector(searchInputSelector, { visible: true });

        const searchInput = await page.$(searchInputSelector);
        await searchInput.type(searchTerm);
    }

    async getSearchResultHtml (page) {
        const searchResultSelector = ModelHelper.getSelector(SearchPage, 'tableRowGroup');
        await page.waitForSelector(searchResultSelector, { visible: true });

        return page.$eval(searchResultSelector, (element) => {
            return element.innerHTML
        })
    }
}

module.exports = SearchWorkflow;
