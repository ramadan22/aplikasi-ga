/* eslint-disable @typescript-eslint/no-explicit-any */

import { parse, safeParse, ValiError, type BaseSchema, type InferInput } from 'valibot';

/**
 * Example common validation
 * 
 * import {
    object,
    string,
    number,
    boolean,
    date,
    array,
    optional,
    minLength,
    maxLength,
    min,
    max,
    email,
    url,
    regex,
    pipe,
  } from 'valibot';

  // Validasi string biasa dengan opsi min dan max length
  export const validateString = (minLen = 1, maxLen = 255) =>
    pipe(
      string(),
      minLength(minLen, Minimum length is ${minLen}),
      maxLength(maxLen, Maximum length is ${maxLen})
    );

  // Validasi email
  export const validateEmail = pipe(
    string(),
    email('Invalid email format')
  );

  // Validasi number dengan opsi min dan max
  export const validateNumber = (minVal?: number, maxVal?: number) => {
    let base = number();
    if (minVal !== undefined) base = pipe(base, min(minVal, Minimum value is ${minVal}));
    if (maxVal !== undefined) base = pipe(base, max(maxVal, Maximum value is ${maxVal}));
    return base;
  };

  // Validasi boolean
  export const validateBoolean = boolean();

  // Validasi tanggal (Date object)
  export const validateDate = date();

  // Validasi URL
  export const validateUrl = pipe(string(), url('Invalid URL format'));

  // Validasi array dengan tipe item dan min/max length
  export const validateArray = (itemSchema: any, minLen = 0, maxLen = 100) =>
    pipe(
      array(itemSchema),
      minLength(minLen, Minimum array length is ${minLen}),
      maxLength(maxLen, Maximum array length is ${maxLen})
    );

  // Contoh validasi pola regex khusus (misal: hanya angka)
  export const validateNumericString = pipe(
    string(),
    regex(/^\d+$/, 'Must be numeric string')
  );
*/

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
