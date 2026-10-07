import { plainToInstance } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsOptional()
  @IsIn(['development', 'production', 'test'])
  NODE_ENV?: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  FRONTEND_ORIGIN!: string;

  @IsString()
  @IsNotEmpty()
  MAIL_HOST!: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  MAIL_PORT!: number;

  @IsOptional()
  @IsString()
  MAIL_USER?: string;

  @IsOptional()
  @IsString()
  MAIL_PASSWORD?: string;

  @IsEmail()
  MAIL_FROM!: string;

  @IsEmail()
  CONTACT_EMAIL!: string;

  @IsOptional()
  @IsInt()
  @Min(1000)
  THROTTLE_TTL_MS?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  THROTTLE_LIMIT?: number;

  @IsOptional()
  @IsString()
  TRUST_PROXY?: string;
}

function assertProductionRules(config: EnvironmentVariables) {
  if (config.NODE_ENV !== 'production') {
    return;
  }

  const issues: string[] = [];

  const origins = config.FRONTEND_ORIGIN.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    issues.push('FRONTEND_ORIGIN must list at least one origin in production');
  }

  for (const origin of origins) {
    if (/localhost|127\.0\.0\.1/i.test(origin)) {
      issues.push('FRONTEND_ORIGIN must not use localhost in production');
      break;
    }

    if (!origin.startsWith('https://')) {
      issues.push('FRONTEND_ORIGIN must use HTTPS in production');
      break;
    }
  }

  if (!config.MAIL_USER?.trim()) {
    issues.push('MAIL_USER is required in production');
  }

  if (!config.MAIL_PASSWORD?.trim()) {
    issues.push('MAIL_PASSWORD is required in production');
  }

  if (/example\.com|smtp\.example/i.test(config.MAIL_HOST)) {
    issues.push('MAIL_HOST must be a real SMTP host in production');
  }

  if (/example\.com|noreply@example/i.test(config.MAIL_FROM)) {
    issues.push('MAIL_FROM must be a verified sender in production');
  }

  if (/example\.com|team@example/i.test(config.CONTACT_EMAIL)) {
    issues.push('CONTACT_EMAIL must be a real destination inbox in production');
  }

  if (issues.length > 0) {
    throw new Error(
      `Invalid production environment configuration: ${issues.join('; ')}`,
    );
  }
}

export function validateEnv(config: Record<string, unknown>) {
  const nodeEnv = (config.NODE_ENV as string | undefined) ?? 'development';

  const candidate = {
    NODE_ENV: nodeEnv,
    PORT: config.PORT ? Number(config.PORT) : 3001,
    FRONTEND_ORIGIN: config.FRONTEND_ORIGIN,
    MAIL_HOST: config.MAIL_HOST,
    MAIL_PORT: config.MAIL_PORT ? Number(config.MAIL_PORT) : undefined,
    MAIL_USER: config.MAIL_USER || undefined,
    MAIL_PASSWORD: config.MAIL_PASSWORD || undefined,
    MAIL_FROM: config.MAIL_FROM,
    CONTACT_EMAIL: config.CONTACT_EMAIL,
    THROTTLE_TTL_MS: config.THROTTLE_TTL_MS
      ? Number(config.THROTTLE_TTL_MS)
      : 60_000,
    THROTTLE_LIMIT: config.THROTTLE_LIMIT ? Number(config.THROTTLE_LIMIT) : 5,
    TRUST_PROXY: config.TRUST_PROXY || undefined,
  };

  const validated = plainToInstance(EnvironmentVariables, candidate, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
    whitelist: true,
  });

  if (errors.length > 0) {
    const messages = errors
      .flatMap((error) => Object.values(error.constraints ?? {}))
      .join('; ');
    throw new Error(`Invalid environment configuration: ${messages}`);
  }

  assertProductionRules(validated);

  return validated;
}
