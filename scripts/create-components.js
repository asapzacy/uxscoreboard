#!/usr/bin/env node

/**
 * if you want to use it:
 *
 * -----------------------------
 *
 * 1. merge the branch `create-react-components-script`
 * 2. this creates `react/node/create.js` (should be in `react/scripts` but .gitignore wasn't letting scripts
 * dir get to gitlab last night)
 * 3. from command line in base `/react` run -- `node node/create.js NewComponent Core`
 * 4. first argument is the component name `NewComponent`
 * 5. second argument is where it should go `/Core`, if you tried a directory we currently don't have
 * (e.g. `Foo` this will fail, so it needs to be `Core`/`Utils`/etc.)
 *
 * -----------------------------
 *
 * it'll create:
 *
 * 1. two directories:
 *    - `components/Core/NewComponent`
 *    - `containers/Core/NewComponent`
 * 2. three files:
 *    - `NewComponent.js`
 *    - `NewComponent.scss`
 *    - `NewComponentContainer.js`
 *
 * -----------------------------
 *
 * files will all have the base setup, and 1 css property to prove the component exists and styled
 * note -- you'll manually need to update both `index.js` files to import correctly (this will be next to-do item)
 */

const fs = require('fs')
const path = require('path')

const capitalizeStr = str => str[0].toUpperCase() + str.slice(1)

const OPTS = {
  filename: capitalizeStr(process.argv[2]),
  standAloneFlag: process.argv.slice(2).filter(command => command === '--stand-alone' || command === '-s').length === 1
}

const PATHS = {
  components: path.join(__dirname, '../src/components'),
  containers: path.join(__dirname, '../src/containers')
}

const writeFile = (filename, text) => {
  fs.writeFileSync(filename, text, 'utf-8', (err) => {
    if (err) throw err
    console.log(`${filename} was successfully created!`) // eslint-disable-line
  })
}

const createRcJsText = filename => {
  return `import React from 'react'
import s from './${filename}.scss'

const ${filename} = () => (
  <section className={s.container}>
    {'${filename}'}
  </section>
)

export default ${filename}
`
}

const createRcScssText = filename => {
  return `
/* -------  ${filename}  ------- */

.container {
  background: mediumseagreen;
}
`
}

const createRccJsText = filename => {
  return `import React, { Component } from 'react'
import { ${filename} } from 'components'

class ${filename}Container extends Component {
  state = {}
  componentDidMount() {
    console.log('-- ${filename} has mounted --')
  }
  render() {
    return <${filename} {...this.state} />
  }
}

export default ${filename}Container
`
}

const logFileCreation = file => {
  console.log(`${file} was created!`) // eslint-disable
}

const init = () => {
  console.log('/*  ----------------------------------------------------------------------  */' + '\n')

  const relativePath = path.join(PATHS.components, OPTS.filename)
  fs.mkdirSync(relativePath)

  const rcFileJs = `${OPTS.filename}.js`
  const rcFileScss = `${OPTS.filename}.scss`

  const rcFileJsFullPath = path.join(relativePath, rcFileJs)
  const rcFileScssFullPath = path.join(relativePath, rcFileScss)

  writeFile(rcFileJsFullPath, createRcJsText(OPTS.filename))
  writeFile(rcFileScssFullPath, createRcScssText(OPTS.filename))
  logFileCreation(rcFileJs)
  logFileCreation(rcFileScss)

  // --stand-alone doesn't create container component
  if (!OPTS.standAloneFlag) {
    const relativePathContainers = path.join(PATHS.containers, OPTS.filename)
    fs.mkdirSync(relativePathContainers)

    const rccFileJs = `${OPTS.filename}Container.js`
    const rccFileJsFullPath = path.join(relativePathContainers, rccFileJs)

    writeFile(rccFileJsFullPath, createRccJsText(OPTS.filename))
    logFileCreation(rccFileJs)
  }
  console.log('\n' + '/*  ----------------------------------------------------------------------  */')
}

init()
