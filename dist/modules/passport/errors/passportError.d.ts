export declare enum PassportErrorType {
    AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
    INVALID_CONFIGURATION = "INVALID_CONFIGURATION",
    WALLET_CONNECTION_ERROR = "WALLET_CONNECTION_ERROR",
    NOT_LOGGED_IN_ERROR = "NOT_LOGGED_IN_ERROR"
}
type ErrorType = {
    type: PassportErrorType;
    message?: string;
};
export declare class PassportError extends Error {
    type: PassportErrorType;
    constructor(message: string, type: PassportErrorType);
}
export declare const withPassportError: <T>(fn: () => Promise<T>, customError: ErrorType) => Promise<T>;
export {};
