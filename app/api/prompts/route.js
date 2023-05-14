import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import User from '@models/user';
import mongoose from 'mongoose';

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);

    const searchString = searchParams.get('search');

    let query = {};

    if (searchString) {
      query = {
        $or: [
          { prompt: { $regex: searchString, $options: 'i' } },
          { tag: { $regex: searchString, $options: 'i' } },
        ],
      };
    }

    await connectToDB();
    const prompts = await Prompt.find(query).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
