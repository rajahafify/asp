import { ANALYZE_SYSTEM } from '../../_lib/prompts';
import { generateHeuristicExtraction } from '../../_lib/fallbacks';
import { Env, generate, json, readJson, resolveKey } from '../../_lib/gemini';

// Port of POST /api/ekyb/analyze.
export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const body = (await readJson(request)) ?? {};
  const { documentText, country, documentType, fileName } = body;
  if (!documentText || typeof documentText !== 'string') {
    return json({ error: 'documentText is required and must be a string' }, 400);
  }

  const key = resolveKey(request, env);
  if (key) {
    try {
      const text = await generate(key, 'gemini-3.8-flash', {
        system: ANALYZE_SYSTEM,
        json: true,
        prompt: `Country Target: ${country || 'ASEAN'}\nDocument Type: ${documentType || 'Corporate Registry / Tax'}\nFilename: ${fileName || 'filing.txt'}\n\nDocument Raw Content:\n${documentText}`,
      });
      if (text) {
        try {
          return json({ success: true, source: 'gemma_live_inference', data: JSON.parse(text) });
        } catch {
          // Fall through to the heuristic result.
        }
      }
    } catch (err) {
      console.error('Error in eKYB analysis:', err);
      return json({
        success: true,
        source: 'gemma_local_pipeline_fallback',
        data: generateHeuristicExtraction(documentText, country),
        notice: 'Processed via Gemma local parsing heuristics.',
      });
    }
  }

  return json({ success: true, source: 'gemma_local_pipeline', data: generateHeuristicExtraction(documentText, country) });
};
