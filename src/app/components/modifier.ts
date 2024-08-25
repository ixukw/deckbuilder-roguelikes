export default class Modifier {
  name: String;
  func: Function;
  active: boolean;

  constructor(name: String, func: Function, active?: boolean) {
    this.name = name;
    this.func = func;
    this.active = active ? active : false;
  }
}