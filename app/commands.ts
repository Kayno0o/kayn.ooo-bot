import fs from 'node:fs'
import path from 'node:path'
import type { Command, CustomClient } from '../types/types'

export function loadCommands(client: CustomClient) {
  const commandsPath = path.resolve(process.cwd(), './app/commands')
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

  for (const file of commandFiles) {
    const filePath = path.resolve(commandsPath, file)
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const command = require(filePath) as Command

    console.log(`Loading command ${command.data.name}...`)

    client.commands.set(command.data.name, command)
  }
}
