import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

function validateConfig<T extends object>(
  configClass: new () => T,
  config: Record<string, unknown>,
): { instance: T; errors: ValidationError[] } {
  const instance = plainToInstance(configClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(instance, {
    skipMissingProperties: false,
  });

  return { instance, errors };
}

function formatErrorMessages(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      const constraints = Object.values(error.constraints || {}).join(', ');
      return `\n${constraints}`;
    })
    .join('');
}

export function envValidator<T extends object[]>(
  ...configClasses: Array<new () => object>
) {
  return (config: Record<string, unknown>) => {
    const { instances, errors } = configClasses.reduce(
      (acc, configClass) => {
        const { instance, errors } = validateConfig(configClass, config);

        return {
          instances: acc.instances.concat(instance),
          errors: acc.errors.concat(errors),
        };
      },
      { instances: [], errors: [] },
    );

    if (errors.length > 0) {
      throw new Error(formatErrorMessages(errors));
    }

    const mergedConfig = instances.reduce<T[number]>(
      (acc, curr) => Object.assign(acc, curr),
      {},
    );

    return mergedConfig;
  };
}
