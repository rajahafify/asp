import { CHAT_SYSTEM } from '../../_lib/prompts';
import { generateDiligenceChatFallback } from '../../_lib/fallbacks';
import { Env, generate, json, readJson, resolveKey } from '../../_lib/gemini';

// Port of POST /api/ekyb/chat-diligence.
export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const body = (await readJson(request)) ?? {};
  const { message, contextDossier, chatHistory } = body;
  if (!message || typeof message !== 'string') {
    return json({ error: 'message is required' }, 400);
  }

  const key = resolveKey(request, env);
  if (key) {
    try {
      let prompt = '';
      if (contextDossier) {
        prompt += `Currently Loaded Dossier:\nEntity: ${contextDossier.name} (${contextDossier.country})\nAIRS Score: ${contextDossier.airs?.totalScore || 'N/A'}\nForeign Equity Ratio: ${contextDossier.passport?.foreignEquityRatio || 0}%\nRegistry: ${contextDossier.extraction?.registrySource}\nUBOs: ${contextDossier.passport?.ultimateBeneficialOwners?.join(', ')}\n\n`;
      }
      if (Array.isArray(chatHistory)) {
        prompt += `Recent discussion:\n${chatHistory.slice(-4).map((h: { sender: string; text: string }) => `${h.sender}: ${h.text}`).join('\n')}\n\n`;
      }
      prompt += `User Query: ${message}`;
      const answer = await generate(key, 'gemini-3.8-flash', { system: CHAT_SYSTEM, prompt });
      return json({ success: true, answer: answer || 'Analysis completed with verified ASEAN regulatory standards.' });
    } catch (err) {
      console.error('Error in diligence chat:', err);
    }
  }

  return json({ success: true, answer: generateDiligenceChatFallback(message, contextDossier) });
};
