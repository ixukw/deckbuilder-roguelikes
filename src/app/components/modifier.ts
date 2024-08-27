import { v4 as uuid } from 'uuid';

export type Modifier = {
  id: String,
  name: String,
  description: String,
  func: Function,
  active: boolean
}

export const newModifier = (name: String, func: Function, active: boolean = false, desc: String = 'mod desc missing') => {
  return {
    id: uuid(),
    name: name,
    func: func,
    description: desc,
    active: active
  }
}
/*
export default class Modifier {
  name: String;
  description: String;
  func: Function;
  active: boolean;

  constructor(name: String, func: Function, active?: boolean, desc?: String) {
    this.name = name;
    this.description = "this is a modifier";
    this.func = func;
    this.active = active ? active : false;
  }
}*/
