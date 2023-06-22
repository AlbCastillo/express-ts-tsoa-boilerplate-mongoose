import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

/**
 * It sanitizes a string by removing special characters commonly used in MongoDB queries.
 * @param {string} value - a string that may contain special characters that need to be sanitized for use in a MongoDB query.
 * @returns a sanitized string where any occurrence of the characters `$`, `{`, `}`, and `.` have been replaced with an empty string.
 */
function sanitizeMongo(value: string): string {
  const specialChars: { [key: string]: string } = {
    $: '',
    '{': '',
    '}': '',
    '.': '',
  };

  const sanitizedValue = value.replace(/[${}.]/g, char => specialChars[char]);

  return sanitizedValue;
}

function sanitizeValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === 'string') {
    const xssValue = xss(value);

    return sanitizeMongo(xssValue);
  }
  return value;
}

function sanitizeObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const sanitizedObj: any = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      sanitizedObj[key] = sanitizeValue(obj[key]);
    }
  }

  return sanitizedObj;
}

export function sanitizeRequest(req: Request, response: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  next();
}
