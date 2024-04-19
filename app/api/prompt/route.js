import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (request) => {
  try {
    const db = await connectToDB()

    const updatePrompts = await Prompt.updateMany (
      { creator: { $exists: false } },
      { $set: { creator: '661da9c7bc03e2793825ff28' }

    })

    const prompts = await Prompt.find({}).populate('creator')


    return new Response(JSON.stringify(prompts), {
      status: 200 })

  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}