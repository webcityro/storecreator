import camelCase from 'lodash/camelCase';

const requireModules = require.context('.', false, /\.js$/);
const modules = {};

requireModules.keys().forEach(fileName => {
    if (fileName === './index.js') {
        return false;
    }

    const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));

    modules[moduleName] = requireModules(fileName).default;
});

export default modules;
