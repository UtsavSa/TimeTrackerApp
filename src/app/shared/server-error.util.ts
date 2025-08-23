// src/app/shared/server-error.util.ts
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails, ValidationProblemDetails } from '../../models/problem-details';

export function extractServerErrors(httpErr: HttpErrorResponse): {
  general?: string;
  fields: Record<string, string>;
} {
  const out = { general: undefined as string | undefined, fields: {} as Record<string, string> };

  const body = httpErr?.error as ValidationProblemDetails | ProblemDetails | any;

  // Network/CORS: status 0 means the browser couldn’t reach or read the response
  if (httpErr.status === 0) {
    out.general = 'Network error. Please check your connection or CORS.';
    return out;
  }

  // Field-specific validation errors from ASP.NET (400)
  if (body && body.errors) {
    // errors: { "Email": ["..."], "Password": ["..."] }
    Object.entries(body.errors).forEach(([serverField, msgs]) => {
      const key = serverField.charAt(0).toLowerCase() + serverField.slice(1); // "Password" -> "password"
      out.fields[key] = (msgs as string[]).join(' ');
    });
    return out;
  }

  // ProblemDetails (e.g., 401, 409)
  if (body && (body.title || body.detail)) {
    out.general = body.detail || body.title;
    return out;
  }

  // String or unknown
  if (typeof body === 'string') {
    out.general = body;
  } else if (body?.message) {
    out.general = body.message;
  } else {
    out.general = 'Request failed. Please try again.';
  }

  return out;
}
