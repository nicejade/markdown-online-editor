const express = require('express')
const chalk = require('chalk')
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const opn = require('opn')

const app = express()

const resolveRealPath = (dir) => {
  return path.join(__dirname, dir)
}

const entryFilePath = resolveRealPath('../dist/index.html')

const openStaticServer = () => {
  app.use('/js', express.static(resolveRealPath('../dist/js/')))
  app.use('/css', express.static(resolveRealPath('../dist/css/')))
  app.use('/img', express.static(resolveRealPath('../dist/img/')))
  app.use('/fonts', express.static(resolveRealPath('../dist/fonts/')))

  app.get('*', function (req, res) {
    const content = fs.readFileSync(entryFilePath, 'utf8')
    res.send(content)
  })

  app.listen(3000, function () {
    console.log(chalk.cyan('Example app listening on port 3000!\n'))
    console.log(chalk.yellow('You Can Visit: ') + chalk.green('http://localhost:3000/'))
    opn('http://localhost:3000')
  })
}

const main = () => {
  const isExist = fs.existsSync(entryFilePath)
  if (isExist) {
    openStaticServer()
  } else {
    const commandStr = `vue-cli-service build`
    const output = childProcess.execSync(commandStr, {
      cwd: process.cwd(),
      timeout: 60000,
      encoding: 'utf8'
    })
    openStaticServer()
    console.log(output)
  }
}

main()
