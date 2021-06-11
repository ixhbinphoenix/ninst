# ninst
A nodejs Library for installing npm modules programatically

## Usage

First, install using npm

```sh
npm i ninst
```

Create a new ninst Instance using
```js
const inst = new ninst({
    path: ""
})
```

Install the dependencies of the project at the specified path.
Automatically gets dependencies from package.json in folder if no package is specified
```js
inst.install()
// OR to install specific package
inst.install("package@1.0.0")
```
