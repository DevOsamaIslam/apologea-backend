#!/usr/bin/env node

import { program } from 'commander'
import shell from 'shelljs'

program
	.version('0.1.0')
	.arguments('<moduleName>')
	.action(function (moduleName: string) {
		const baseDir = `src/api/${moduleName}`

		shell.mkdir('-p', [`${baseDir}/create`, `${baseDir}/delete`, `${baseDir}/fetch`, `${baseDir}/model`, `${baseDir}/update`])

		shell.touch([
			`${baseDir}/create/create.controller.ts`,
			`${baseDir}/create/create.service.ts`,
			`${baseDir}/delete/delete.controller.ts`,
			`${baseDir}/delete/delete.service.ts`,
			`${baseDir}/fetch/fetch.controller.ts`,
			`${baseDir}/fetch/fetch.service.ts`,
			`${baseDir}/model/${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}.Model.ts`,
			`${baseDir}/update/update.controller.ts`,
			`${baseDir}/update/update.service.ts`,
			`${baseDir}/${moduleName}.routes.ts`,
			`${baseDir}/${moduleName}.schemas.ts`,
		])
	})

program.parse(process.argv)
