const SearchPage = {
    mainPage: {
        selector: '.main-view',
        child: {
            searchInput: {
                selector: 'input[placeholder^="Search"]'
            },
            tableRowGroup: {
                selector: 'div[role="rowgroup"]'
            }
        }
    }
}

module.exports = SearchPage;