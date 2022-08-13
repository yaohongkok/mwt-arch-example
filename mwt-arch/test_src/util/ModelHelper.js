class ModelHelper {
    static getSelector (modelTree, component) {
        const firstFoundComponentPath = ModelHelper._getComponentPath(modelTree, component);
        return ModelHelper._getSelector(modelTree, firstFoundComponentPath);
    }

    static _getSelector (modelTree, componentPath) {
        let currentNode = { ...modelTree };
        let selector = '';

        for (const component of componentPath) {
            selector = selector + currentNode[component].selector + ' ';
            currentNode = currentNode[component].child;
        }

        if (selector === '') {
            throw new Error('Selector is empty. Smth went wrong.');
        } else {
            return selector;
        }
    }

    static _getComponentPath (modelTree, component) {
        const bfsPathQueue = [];

        for (const key of Object.keys(modelTree)) {
            bfsPathQueue.push([key]);
        }


        while (bfsPathQueue.length > 0) {
            const currentPath = bfsPathQueue.shift();
            const currentComponent = currentPath[currentPath.length - 1];

            if(currentComponent === component) {
                return currentPath
            } else {
                const newComponents = ModelHelper._getAdjacentNode(modelTree, currentPath);
                for (let newComponent of newComponents) {
                    const newPath = [...currentPath, newComponent];
                    bfsPathQueue.push(newPath);
                }
            }
        }

        throw new Error('Could not find component: ' + component);
    }

    static _getAdjacentNode(modelTree, path) {
        let currentNode = { ...modelTree };

        for (const component of path) {
            currentNode = currentNode[component].child;
        }

        if (currentNode) {
            return Object.keys(currentNode);
        } else {
            return [];
        }
    }

}

module.exports = ModelHelper;