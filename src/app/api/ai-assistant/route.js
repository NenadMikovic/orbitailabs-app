import { NextResponse } from 'next/server';

export async function POST(req) {
  const { messages, pageContext } = await req.json();

  const contextPrompt = `You are a helpful assistant. Only answer questions about: ${pageContext}. Do not answer anything else.`;

  const fullMessages = [
    { role: 'system', content: contextPrompt },
    ...messages
  ];

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: fullMessages,
      temperature: 0.5,
    }),
  });

  const data = await openaiRes.json();

  const reply = data.choices?.[0]?.message?.content || 'Sorry, I couldn’t respond.';

  return NextResponse.json({ response: reply });
}
