// ポケモンのレベル
export const DEFAULT_LEVEL = 50;
export const MAX_LEVEL = 100;
export const MIN_LEVEL = 1;

export const GIFTS = [
  { id: 1, name: "--- 金額を選択 ---", value: 0 },
  { id: 2, name: "120円", value: 120 },
  { id: 3, name: "980円", value: 980 },
  { id: 4, name: "2,820円", value: 2820 },
  { id: 5, name: "5,740円", value: 5740 },
  { id: 6, name: "10,000円", value: 10_000 },
];

export const RANKS = [
  { id: 1, magnification: 6, percent: 400 },
  { id: 2, magnification: 5, percent: 350 },
  { id: 3, magnification: 4, percent: 300 },
  { id: 4, magnification: 3, percent: 250 },
  { id: 5, magnification: 2, percent: 200 },
  { id: 6, magnification: 1, percent: 150 },
  { id: 7, magnification: 0, percent: 100 },
  { id: 8, magnification: -1, percent: 67 },
  { id: 9, magnification: -2, percent: 50 },
  { id: 10, magnification: -3, percent: 40 },
  { id: 11, magnification: -4, percent: 33 },
  { id: 12, magnification: -5, percent: 29 },
  { id: 13, magnification: -6, percent: 25 },
];

export const SPEED_ITEMS = [
  { id: 1, name: "スピードパウダー (×2)", value: 20 },
  { id: 2, name: "こだわりスカーフ (×1.5)", value: 15 },
  { id: 3, name: "--- 道具を選択 ---", value: 10 },
  { id: 4, name: "くろいてっきゅう (×0.5)", value: 5 },
];

export const SPEED_ABILITIES = [
  { id: 1, name: "すいすい・ようりょくそ (×2)", value: 20 },
  { id: 2, name: "はやあし・かるわざ (×2)", value: 2 },
  { id: 3, name: "--- 特性を選択 ---", value: 10 },
  { id: 4, name: "スロースタート (×0.5)", value: 5 },
];

// HTTPステータスコード
export const HTTP_CONTINUE = 100;
export const HTTP_SWITCHING_PROTOCOLS = 101;
export const HTTP_PROCESSING = 102;
export const HTTP_EARLY_HINTS = 103;
export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_ACCEPTED = 202;
export const HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
export const HTTP_NO_CONTENT = 204;
export const HTTP_RESET_CONTENT = 205;
export const HTTP_PARTIAL_CONTENT = 206;
export const HTTP_MULTI_STATUS = 207;
export const HTTP_ALREADY_REPORTED = 208;
export const HTTP_IM_USED = 226;
export const HTTP_MULTIPLE_CHOICES = 300;
export const HTTP_MOVED_PERMANENTLY = 301;
export const HTTP_FOUND = 302;
export const HTTP_SEE_OTHER = 303;
export const HTTP_NOT_MODIFIED = 304;
export const HTTP_USE_PROXY = 305;
export const HTTP_RESERVED = 306;
export const HTTP_TEMPORARY_REDIRECT = 307;
export const HTTP_PERMANENTLY_REDIRECT = 308;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_PAYMENT_REQUIRED = 402;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_METHOD_NOT_ALLOWED = 405;
export const HTTP_NOT_ACCEPTABLE = 406;
export const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
export const HTTP_REQUEST_TIMEOUT = 408;
export const HTTP_CONFLICT = 409;
export const HTTP_GONE = 410;
export const HTTP_LENGTH_REQUIRED = 411;
export const HTTP_PRECONDITION_FAILED = 412;
export const HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
export const HTTP_REQUEST_URI_TOO_LONG = 414;
export const HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
export const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
export const HTTP_EXPECTATION_FAILED = 417;
export const HTTP_I_AM_A_TEAPOT = 418;
export const HTTP_MISDIRECTED_REQUEST = 421;
export const HTTP_UNPROCESSABLE_ENTITY = 422;
export const HTTP_LOCKED = 423;
export const HTTP_FAILED_DEPENDENCY = 424;
export const HTTP_TOO_EARLY = 425;
export const HTTP_UPGRADE_REQUIRED = 426;
export const HTTP_PRECONDITION_REQUIRED = 428;
export const HTTP_TOO_MANY_REQUESTS = 429;
export const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
export const HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_NOT_IMPLEMENTED = 501;
export const HTTP_BAD_GATEWAY = 502;
export const HTTP_SERVICE_UNAVAILABLE = 503;
export const HTTP_GATEWAY_TIMEOUT = 504;
export const HTTP_VERSION_NOT_SUPPORTED = 505;
export const HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506;
export const HTTP_INSUFFICIENT_STORAGE = 507;
export const HTTP_LOOP_DETECTED = 508;
export const HTTP_NOT_EXTENDED = 510;
export const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;
