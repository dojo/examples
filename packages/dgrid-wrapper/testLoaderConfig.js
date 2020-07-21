const globalObj = typeof window !== 'undefined' ? window : global;
globalObj.dojoConfig = {
    baseUrl: '../../output/test/unit',
    packages: [
        { name: 'dojo', location: 'externals/dojo' },
        { name: 'dijit', location: 'externals/dijit' },
        { name: 'dgrid', location: 'externals/dgrid' },
        { name: 'dstore', location: 'externals/dstore' }
    ],
    has: {
        highcontrast: 0
    },
    async: true
};
