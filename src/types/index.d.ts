export interface AuthUser extends User {
  email: string;
  email_verified_at: string;
}

export interface Card {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
}

export interface LazyValue {
  lazyValue: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface Nature {
  name: string;
  stats: number[];
}

export interface Pokemon {
  id: number;
  lv: number;
  name: string;
  nature: string;
  stats: string;
  sum_effort_value: number;
  user: User;
}

export interface PokemonData {
  no: number;
  name: string;
  form: string;
  ranks: string[];
  evolutions: number[];
  types: string[];
  abilities: string[];
  hiddenAbilities: string[];
  stats: number[];
  total?: number;
}

export interface Ranking {
  name: string;
}

export interface Stat {
  name: string;
  initial: string;
  individualValue: number | null;
  effortValue: number | null;
}

export interface Signature {
  expires: string;
  signature: string;
}

export interface Tip {
  price: number;
  token: string;
}

export interface User {
  nickname: string;
  username: string;
}
