export type Itoy = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export type ValueSettingType = string[] | number[] | boolean;

export type SelectAndDateType<T> = {
  func: (type: string, activeType: T) => void;
  resetState: boolean | null;
  dateStart: T;
};

export type CardToyType = {
  content: Itoy;
  toggleToy: (idToy: Itoy) => boolean;
}

export type selectToyType = {
  func: (type: string, activeType: string[] | boolean) => void;
};