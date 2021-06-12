const { ninst } = require('.');
const test = require('./test/index.js');

const nin = new ninst({
    path: './test'
})
nin.install()
.catch((err) => {
    console.error(`[test] Install failed`);
    console.error(err);
    process.exit(1);
})
.then(() => {
    console.info(`[test] Install finished`);
    test.test();
})