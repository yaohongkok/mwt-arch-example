const SideMenu  = require('../model/SideMenu.js');
const ModelHelper = require('../util/ModelHelper');

class SideMenuWorkflow {
    async isVisible (page) {
        const sideMenuSelector = ModelHelper.getSelector(SideMenu, 'sidemenu');
        return page.waitForSelector(sideMenuSelector, { visible: true });
    }
}

module.exports = SideMenuWorkflow;