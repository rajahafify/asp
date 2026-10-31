import { Env, json } from '../_lib/gemini';

export const onRequestGet = async ({ env }: { env: Env }) =>
  json({
    status: 'ok',
    aiConfigured: !!env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
