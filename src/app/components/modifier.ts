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
}