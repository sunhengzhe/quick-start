#!/usr/bin/env node

const program = require('commander')

program.version('1.0.0')

program
  .command('help')
  .description('help')
  .action(function () {
    program.outputHelp()
  })

program
  .command('init')
  .description('init quick-start')
  .action(
    require('../lib/init')
  )

program.parse(process.argv)
