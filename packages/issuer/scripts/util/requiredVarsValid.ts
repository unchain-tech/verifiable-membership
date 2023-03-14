import env from 'dotenv';

/**
 * 環境変数が定義されているかチェッカー
 * @param requiredVars
 * @returns
 */
export function validateRequiredEnvVarsType(requiredVars: string[]): any {
  env.config();

  const envVars = {};
  const errors: string[] = [];

  for (const key of requiredVars) {
    if (!process.env[key]) {
      errors.push(`${key} is not defined.`);
      continue;
    }

    if (typeof process.env[key] !== 'string') {
      errors.push(`${key} must be a string.`);
      continue;
    }

    envVars[key] = process.env[key];
  }
  if (errors.length > 0) throw new Error(errors.join('\n'));

  return envVars;
}