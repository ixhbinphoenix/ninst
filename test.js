const fs = require('fs');
const { ninst } = require('./dist/index');

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
})