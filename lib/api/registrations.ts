import type {
  ConferenceRegistrationData,
  CreateRegistrationRequest,
  CreateRegistrationSuccess,
  RegistrationApiErrorBody,
  RegistrationFieldErrors,
} from "@/types/registration";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Some registration details are invalid. Please review the form and try again.",
  403: "We couldn't verify this email against the sponsored or discounted ticket list. Please check the email and register again, or contact the NGM Conference support team for assistance.",
  409: "This email has already been used to register for NGM Conference 5.0.",
  429: "Too many registration attempts. Please wait a while before trying again.",
  500: "We couldn't complete your registration right now. Your details have been preserved; please try again.",
};

export class RegistrationApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly fieldErrors: RegistrationFieldErrors;

  constructor({
    message,
    status,
    code,
    fieldErrors = {},
  }: {
    message: string;
    status: number;
    code?: string;
    fieldErrors?: RegistrationFieldErrors;
  }) {
    super(message);
    this.name = "RegistrationApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeFieldErrors(value: unknown): RegistrationFieldErrors {
  if (!isObject(value)) return {};

  return Object.fromEntries(
    Object.entries(value).flatMap(([field, messages]) => {
      if (typeof messages === "string") return [[field, [messages]]];
      if (!Array.isArray(messages)) return [];

      const strings = messages.filter(
        (message): message is string => typeof message === "string",
      );
      return strings.length > 0 ? [[field, strings]] : [];
    }),
  );
}

function parseErrorBody(value: unknown): RegistrationApiErrorBody {
  if (!isObject(value)) return {};

  const details = isObject(value.details) ? value.details : undefined;

  return {
    code: typeof value.code === "string" ? value.code : undefined,
    error: typeof value.error === "string" ? value.error : undefined,
    message: typeof value.message === "string" ? value.message : undefined,
    fieldErrors: normalizeFieldErrors(value.fieldErrors),
    details: details
      ? {
          fieldErrors: normalizeFieldErrors(details.fieldErrors),
          formErrors: Array.isArray(details.formErrors)
            ? details.formErrors.filter(
                (message): message is string => typeof message === "string",
              )
            : undefined,
        }
      : undefined,
  };
}

export async function createConferenceRegistration(
  formData: ConferenceRegistrationData,
): Promise<CreateRegistrationSuccess> {
  const request: CreateRegistrationRequest = { formData };
  const response = await fetch("/api/registrations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(request),
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = parseErrorBody(body);
    const detailsMessage = errorBody.details?.formErrors?.[0];
    const message =
      errorBody.message ??
      errorBody.error ??
      detailsMessage ??
      STATUS_MESSAGES[response.status] ??
      "We couldn't complete your registration. Please try again.";

    throw new RegistrationApiError({
      message,
      status: response.status,
      code: errorBody.code,
      fieldErrors: {
        ...errorBody.details?.fieldErrors,
        ...errorBody.fieldErrors,
      },
    });
  }

  if (
    !isObject(body) ||
    body.success !== true ||
    typeof body.registrationId !== "string" ||
    typeof body.publicReference !== "string" ||
    typeof body.message !== "string"
  ) {
    throw new RegistrationApiError({
      message: "The server returned an unexpected response. Please contact support before submitting again.",
      status: response.status,
    });
  }

  return body as unknown as CreateRegistrationSuccess;
}
