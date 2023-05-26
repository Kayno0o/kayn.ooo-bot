import type { Identifiable } from '../types/types'

export default class Api<T extends Identifiable = any> {
  constructor(public endpoint: string) { }

  async findAll() {
    const response = await fetch(this.endpoint)
    return await response.json() as T
  }

  async find(id: number) {
    const response = await fetch(`${this.endpoint}/${id}`)
    return await response.json() as T
  }

  async create(entity: T) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entity),
    })
    return await response.json() as T
  }

  async update(entity: T) {
    const response = await fetch(`${this.endpoint}/${entity.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entity),
    })
    return await response.json() as T
  }

  async delete(id: number) {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: 'DELETE',
    })
    return await response.json() as T
  }
}
