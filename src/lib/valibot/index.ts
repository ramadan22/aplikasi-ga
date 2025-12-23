/* eslint-disable @typescript-eslint/no-explicit-any */

import { parse, safeParse, ValiError, type BaseSchema, type InferInput } from 'valibot';

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Partial<Record<keyof T, string>> };

export function ValidationForm<TSchema extends BaseSchema<any, any, any>>(schema: TSchema) {
  type FormType = InferInput<TSchema>;

  const validateForm = (form: FormType): ValidationResult<FormType> => {
    try {
      const data = parse(schema, form);
      return { success: true, data };
    } catch (error) {
      if (error instanceof ValiError) {
        const fieldErrors: Partial<Record<keyof FormType, string>> = {};
        for (const issue of error.issues) {
          const path = issue.path?.[0]?.key;
          if (path) fieldErrors[path as keyof FormType] = issue.message;
        }
        return { success: false, errors: fieldErrors };
      }
      return { success: false, errors: {} };
    }
  };

  const validateField = (form: FormType, field: string): string | undefined => {
    const result = safeParse(schema, form);

    if (!result.success) {
      const issue = result.issues.find(i => i.path?.[0]?.key === field);
      return issue?.message;
    }
    return undefined;
  };

  return { validateForm, validateField };
}
