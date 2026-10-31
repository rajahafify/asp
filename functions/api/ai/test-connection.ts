import { Env, generate, json, keySource, readJson, resolveKey } from '../../_lib/gemini';

// Port of POST /api/ai/test-connection.
export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const body = (await readJson(request)) ?? {};
  const model = body.model || 'gemma-4-26b-a4b-it';
  const key = resolveKey(request, env, body.apiKey);
  const start = Date.now();

  if (!key) {
    return json({
      connected: false,
      message: 'No API key provided. Please enter your Google Gemini/Gemma API key in Settings (Demo Mode) or configure Secrets.',
      latencyMs: Date.now() - start,
    });
  }

  try {
    let testModel = model;
    let text: string;
    try {
      text = await generate(key, model, { prompt: 'Say "Gemma 4 engine connected and ready for ASEAN eKYB verification."' });
    } catch (err) {
      console.warn(`${model} test failed, trying gemini-3.8-flash`, err);
      testModel = 'gemini-3.8-flash';
      text = await generate(key, testModel, { prompt: 'Say "Gemma 4 / Gemini Flash engine connected and ready for ASEAN eKYB verification."' });
    }
    return json({
      connected: true,
      model: testModel,
      latencyMs: Date.now() - start,
      message: text.trim(),
      keySource: keySource(request, env, body.apiKey),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return json({ connected: false, error: err?.message || 'Connection test failed', latencyMs: Date.now() - start });
  }
};
