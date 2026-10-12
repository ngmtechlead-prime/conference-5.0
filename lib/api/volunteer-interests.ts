import type {
  CreateVolunteerInterestRequest,
  CreateVolunteerInterestSuccess,
  VolunteerInterestData,
  VolunteerInterestFieldErrors,
} from "@/types/volunteer-interest";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Some details are invalid. Please review the highlighted fields and try again.",
  409: "An expression of interest has already been submitted with this email address.",
  413: "This submission is larger than the server can accept. Please shorten your responses and try again.",
  429: "Too many submission attempts have been made. Please wait a while before trying again.",
  500: "We couldn't submit your expression of interest right now. Your answers have been preserved; please try again.",
};

export class VolunteerInterestApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly fieldErrors: VolunteerInterestFieldErrors;

  constructor({
    message,
    status,
    code,
    fieldErrors = {},
  }: {
    message: string;
    status: number;
    code?: string;
    fieldErrors?: VolunteerInterestFieldErrors;
  }) {
    super(message);
    this.name = "VolunteerInterestApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeFieldErrors(value: unknown): VolunteerInterestFieldErrors {
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

interface ParsedErrorBody {
  code?: string;
  error?: string;
  message?: string;
  fieldErrors?: VolunteerInterestFieldErrors;
  details?: {
    fieldErrors?: VolunteerInterestFieldErrors;
    formErrors?: string[];
  };
}

function parseErrorBody(value: unknown): ParsedErrorBody {
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

export async function createVolunteerInterest(
  formData: VolunteerInterestData,
): Promise<CreateVolunteerInterestSuccess> {
  const request: CreateVolunteerInterestRequest = { formData };
  const response = await fetch("/api/volunteer-interests", {
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
      "We couldn't submit your expression of interest. Your answers have been preserved; please try again.";

    throw new VolunteerInterestApiError({
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
    typeof body.interestId !== "string" ||
    typeof body.message !== "string"
  ) {
    throw new VolunteerInterestApiError({
      message:
        "The server returned an unexpected response. Please contact the NGM team before submitting again.",
      status: response.status,
    });
  }

  return body as unknown as CreateVolunteerInterestSuccess;
}
