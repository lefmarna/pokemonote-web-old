export interface Login {
  email: string;
  password: string;
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

export interface User {
  nickname: string;
  username: string;
}
