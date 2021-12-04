export interface Pokemon {
  no: number;
  name: string;
  form: string;
  ranks: string[];
  evolutions: number[];
  types: string[];
  abilities: string[];
  hiddenAbilities: string[];
  stats: {
    [key: string]: number;
  };
  total?: number;
}
