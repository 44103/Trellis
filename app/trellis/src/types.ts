export interface Auth {
  apiKey: string;
  token: string;
}

export type WebhookItem = {
  active: boolean;
  callbackURL: string;
  consecutiveFailures: number;
  description: string;
  firstConsecutiveFailDate: null;
  id: string;
  idModel: string;
}

export type FormModel = {
  id: string;
  callbackURL: string;
  description: string;
  idModel: string;
}

export type SnackbarState = {
  open: boolean;
  type: "success" | "info" | "warning" | "error";
  message: string;
}