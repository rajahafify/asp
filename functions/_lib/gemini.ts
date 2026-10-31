// Calls the Gemini REST API directly, so the functions need no Node SDK.
// The key comes from the request header or body (Settings, BYOK), else the
// GEMINI_API_KEY Pages secret.

export interface Env {
  GEMINI_API_KEY?: string;
}

// A base64 image or video frame sent alongside the prompt.
export interface InlineMedia {
  label: string;
  mimeType: string;
  data: string;
}

export function resolveKey(request: Request, env: Env, bodyKey?: string): string | null {
  return request.headers.get('x-gemini-api-key')?.trim() || bodyKey?.trim() || env.GEMINI_API_KEY?.trim() || null;
}

export function keySource(request: Request, env: Env, bodyKey?: string): string {
  if (request.headers.get('x-gemini-api-key')) return 'Request Header';
  if (bodyKey) return 'Direct Client Input (Demo)';
  return env.GEMINI_API_KEY ? 'Environment Variable' : 'None';
}

export async function generate(
  apiKey: string,
  model: string,
  { system, prompt, json = false, media = [] }: { system?: string; prompt: string; json?: boolean; media?: InlineMedia[] },
): Promise<string> {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            ...media.map((m) => ({ inlineData: { mimeType: m.mimeType, data: m.data } })),
          ],
        },
      ],
      ...(json ? { generationConfig: { responseMimeType: 'application/json' } } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`Gemini ${res.status} for ${model}: ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? '').join('');
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function readJson(request: Request): Promise<Record<string, any> | null> {
  try {
    return (await request.json()) as Record<string, any>;
  } catch {
    return null;
  }
}
