export interface Login {
  email: string;
  password: string;
}

export interface Nature {
  name: string;
  stats: {
    hp: number;
    attack: number;
    defence: number;
    spAttack: number;
    spDefence: number;
    speed: number;
  };
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

export interface Ranking {
  name: string;
}

export interface Stat {
  en: string;
  ja: string;
  abbreviation: string;
  individualValue: number | null;
  effortValue: number | null;
}

export interface User {
  nickname: string;
  username: string;
}
