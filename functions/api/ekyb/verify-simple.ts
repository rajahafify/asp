import { VERIFY_SYSTEM } from '../../_lib/prompts';
import { Env, InlineMedia, generate, json, readJson, resolveKey } from '../../_lib/gemini';

const DEFAULT_MODEL = 'gemma-4-26b-a4b-it';

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
    parsed.modelUsed = modelToUse;
    return json({ success: true, result: parsed });
  } catch (err) {
    console.error('Error in verify-simple:', err);
    return json({ success: false, error: `Gemini could not verify the documents: ${(err as Error).message}` }, 502);
  }
};
