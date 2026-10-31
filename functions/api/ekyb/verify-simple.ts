import { VERIFY_SYSTEM } from '../../_lib/prompts';
import { Env, InlineMedia, generate, json, readJson, resolveKey } from '../../_lib/gemini';

const DEFAULT_MODEL = 'gemma-4-26b-a4b-it';
// Each item is scored out of its maxScore; the three maxima add up to 100.
const ITEMS = [
  { id: 'ssm', label: 'SSM business registration certificate', maxScore: 30 },
  { id: 'identity', label: 'Director identification (IC or passport)', maxScore: 30 },
  { id: 'address', label: 'Address walk-in video', maxScore: 40 },
];
// An item passes at 70% of its maximum. The application is approved at 70 of 100 with every item passing.
const PASS_RATIO = 0.7;
const APPROVAL_TOTAL = 70;

// Port of POST /api/ekyb/verify-simple. The uploaded documents are sent to
// Gemini as images, so the verdict is based on the files themselves. There is
// no offline approval: if Gemini cannot check the documents, the error is returned.
export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const body = (await readJson(request)) ?? {};
  const { companyProfile, businessRegistration, identification, addressVideo, preferredModel } = body;
  const modelToUse = preferredModel || DEFAULT_MODEL;
  const key = resolveKey(request, env, body.apiKey);
  const documents: InlineMedia[] = Array.isArray(body.documents) ? body.documents : [];

  if (!key) {
    return json({ success: false, error: 'Add a Gemini API key in Settings to run document verification.' }, 400);
  }
  if (documents.length === 0) {
    return json({ success: false, error: 'Upload the SSM certificate, the IC or passport, and the address video first.' }, 400);
  }

  const prompt = `Perform instant eKYB verification for this enterprise.
Company Profile: ${JSON.stringify(companyProfile || {})}
Business Registration: ${JSON.stringify(businessRegistration || {})}
Identification: ${JSON.stringify(identification || {})}
Address Video Proof: ${JSON.stringify(addressVideo || {})}

Attached files, in this order:
${documents.map((d, i) => `${i + 1}. ${d.label}`).join('\n')}

Read the attached files and check them against the company profile above. For any proof whose file is missing or unreadable, set its verified flag to false and say so in auditSummary.`;

  try {
    const text = await generate(key, modelToUse, { system: VERIFY_SYSTEM, json: true, prompt, media: documents });
    const parsed = JSON.parse(text);
    // The server does the scoring: clamp each item, then add up the total.
    const items = ITEMS.map((item) => {
      const modelItem = (Array.isArray(parsed.items) ? parsed.items : []).find((i: any) => i?.id === item.id) ?? {};
      const score = Math.max(0, Math.min(item.maxScore, Math.round(Number(modelItem.score) || 0)));
      return { ...item, score, passed: score >= item.maxScore * PASS_RATIO, notes: String(modelItem.notes || '') };
    });
    const totalScore = items.reduce((sum, item) => sum + item.score, 0);
    parsed.items = items;
    parsed.totalScore = totalScore;
    parsed.maxScore = 100;
    parsed.isApproved = totalScore >= APPROVAL_TOTAL && items.every((item) => item.passed);
    parsed.modelUsed = modelToUse;
    return json({ success: true, result: parsed });
  } catch (err) {
    console.error('Error in verify-simple:', err);
    return json({ success: false, error: `Gemini could not verify the documents: ${(err as Error).message}` }, 502);
  }
};
