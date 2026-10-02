export async function onRequestPost({ request, env }) {
  if (!env.GEMINI_API_KEY) return Response.json({ error: 'gemini_not_configured' }, { status: 503 });
  const input = await request.json();
  const prompt = ['Actúa como especialista en SEO y Pinterest para modelos 3D.', 'Devuelve únicamente JSON válido con las claves: title, description, pinterest_text, hashtags, keywords.', 'Escribe en español, con tono claro y comercial. No inventes características.', JSON.stringify({ name: input.name || '', description: input.description || '', tags: input.tags || [], url: input.url || '' })].join('\n');
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.7 } }) });
  if (!response.ok) return new Response(await response.text(), { status: 502, headers: { 'Content-Type': 'application/json' } });
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return new Response(text, { headers: { 'Content-Type': 'application/json' } });
}
