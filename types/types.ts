import type { Client, SlashCommandBuilder } from 'discord.js'

export interface Identifiable {
  id: number
}

export interface Command {
  data: SlashCommandBuilder
  execute: (interaction: any) => void
}

export interface CustomClient extends Client {
  commands: any
}
