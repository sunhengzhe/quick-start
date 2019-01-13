const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')

module.exports = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Which kind of project do you want to start?',
      choices: [
        'sails-js',
        'es6-in-browser'
      ]
    },
    {
      type: 'input',
      name: 'dirname',
      message: 'Input your project name'
    }
  ]).then((answers) => {
    const { type, dirname } = answers

    if (fs.existsSync(dirname)) {
      return console.log(chalk.red(`Couldn't create template at ${path.join(__dirname, dirname)} because a non-empty directory already exists at that path.`))
    }

    const spinner = ora('downloading...')

    spinner.start()

    download(`sunhengzhe/quick-start-${type}`, dirname, (e) => {
      if (e) {
        spinner.fail()
        console.log(chalk.red(e))
      } else {
        spinner.succeed()

        console.log(chalk.green('success!'))
      }
    })
  })
}
