import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { role, scenario } = req.body;

  const prompt = `Act as a ${role}. Simulate a ${scenario} scenario in a GRC training context. Provide instructions and ask for a response.`;

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a professional GRC trainer using real-world scenarios.' },
      { role: 'user', content: prompt },
    ],
  });

  const reply = completion.data.choices[0]?.message?.content || 'No response generated.';
  res.status(200).json({ reply });
}
