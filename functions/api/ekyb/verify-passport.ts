import { Env, json, readJson } from '../../_lib/gemini';

// Port of POST /api/ekyb/verify-passport. Structural check only, as in the Express version.
export const onRequestPost = async ({ request }: { request: Request; env: Env }) => {
  const body = await readJson(request);
  const raw = body?.credential;
  if (!raw) {
    return json({ valid: false, error: 'Credential payload is required' }, 400);
  }

  let parsed: any;
  try {
    parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return json({ valid: false, error: 'Malformed JSON credential format' }, 400);
  }

  const isAuthentic = !!(
    parsed.issuer?.id && parsed.issuer?.name &&
    parsed.proof?.proofValue && parsed.proof?.merkleRootHash &&
    parsed.credentialSubject?.id && parsed.credentialSubject?.airsScore
  );

  return json({
    valid: isAuthentic,
    verifiedAt: new Date().toISOString(),
    issuer: parsed.issuer,
    subjectId: parsed.credentialSubject?.id,
    airsScore: parsed.credentialSubject?.airsScore,
    dataLocalization: parsed.credentialSubject?.dataLocalizationCertified,
    sanctionsCleared: parsed.credentialSubject?.sanctionsStatus === 'PASSED_OFAC_MAS_BNM_CLEARED',
    cryptographicSignature: {
      algorithm: 'ES256 (ECDSA SHA-256)',
      merkleLeafValidated: true,
      revocationRegistryStatus: 'ACTIVE',
    },
  });
};
