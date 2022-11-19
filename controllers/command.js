import { sendToAll } from "../index.js"
import Command from "../models/command.js"

export async function wsUpdateCommands() {
  console.log("running wsUpdateCommands")
  let result = await Command.find({})
  sendToAll(result)
}