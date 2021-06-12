import pacote = require('pacote');
import fs = require('fs');

export interface ninstopts {
    path: string
}

export class ninst {
    constructor(opts: ninstopts) {
        this.opts = opts;
    }
    opts: ninstopts
    async install(pkg?: string): Promise<void> {
        if (!this.opts.path) {
            console.error("[ninst] No path defined!");
            return;
        }
        if (pkg) {
            let pathpkg = pkg.split("@")[0];
            if (!fs.existsSync(this.opts.path + "/node_modules/" + pathpkg)) pacote.extract(pkg, this.opts.path + "/node_modules/" + pathpkg).then(async () => {
                console.debug(`[ninst](debug) Installed ${pkg}`);
                if (fs.existsSync(this.opts.path + "/node_modules/" + pathpkg + "/package.json")) {
                    let json = JSON.parse(fs.readFileSync(this.opts.path + "/node_modules/" + pathpkg + "/package.json").toString());
                    if (json.dependencies) {
                        let deps = json.dependencies;
                        let keys = Object.keys(deps);
                        let vers = Object.values(deps);
                        let i = 0;
                        let promises: Array<Promise<void>> = [];
                        for (i = 0; i < keys.length; i++) {
                            let pack = keys[i] + "@" + vers[i];
                            let promise = new Promise<void>((resolve) => {
                                this.install(pack).then(() => {
                                    resolve();
                                });
                            })
                            promises.push(promise)
                        }
                        while(keys.length != promises.length) {}
                        Promise.all(promises).then(() => {
                            return;
                        })
                    } else {
                        console.debug(`[ninst](debug) Package ${pkg} has no dependencies`);
                    }
                } else {
                    console.warn(`[ninst] Package ${pkg} has no package.json and seems invalid`);
                }
            })
        } else {
            let json = JSON.parse(fs.readFileSync(this.opts.path + "/package.json").toString());
            if (json) {
                if (json.dependencies) {
                    let deps = json.dependencies;
                    let keys = Object.keys(deps);
                    let vers = Object.values(deps);
                    let i = 0;
                    let promises: Array<Promise<void>> = [];
                    for (i = 0; i < keys.length; i++) {
                        let pack = keys[i] + "@" + vers[i];
                        let promise = new Promise<void>((resolve) => {
                            this.install(pack).then(() => {
                                resolve();
                            });
                        })
                        promises.push(promise);
                    }
                    Promise.all(promises).then(() => {
                        return;
                    })
                } else {
                    console.error(`[ninst] Path has no dependencies. Cannot install.`);
                    return;
                }
            } else {
                console.error(`[ninst] Path has no package.json. Cannot install dependencies.`);
                return;
            }
        }
    }
}