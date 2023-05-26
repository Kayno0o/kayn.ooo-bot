import path from 'node:path'
import dotenv from 'dotenv'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import type { Command, CustomClient } from '../types/types'
import { loadCommands } from './commands'

dotenv.config({ path: path.resolve(process.cwd(), './.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), './.env') })

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
}) as CustomClient

client.commands = new Map<string, Command>()

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand())
    return

  console.log(interaction)
})

client.login(process.env.DISCORD_TOKEN)

loadCommands(client)
