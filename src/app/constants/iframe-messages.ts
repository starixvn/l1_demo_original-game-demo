export const IFRAME_MESSAGES = {
  BACK_TO_ORIGINAL_PAGE: "backToOriginalPage",
  BALANCE_UPDATE: "balanceUpdate",
  NICKNAME_UPDATE: "nicknameUpdate",
} as const;

export interface BalanceUpdatePayload {
  balance: number;
  currency: string;
}

export interface NicknameUpdatePayload {
  nickname: string;
}