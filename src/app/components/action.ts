import Modifier from './modifier';

export default class Action {
  func: Function;
  modifiers: Modifier[];

  constructor(func: Function, modifiers: Modifier[]) {
    this.func = func;
    this.modifiers = modifiers;
  }

  addModifier(modifier: Modifier): void {
    this.modifiers = [...this.modifiers, modifier];
  }

  execute(params?: any): any {
    let result = params ? this.func(params) : this.func();
    let history = [result];

    for (const mod of this.modifiers) {
      if (mod.active) {
        result = this.executeModifier(mod, result, params)
        history.push(result)
      }
    }

    console.log(history);
    return result;
  }
  executeModifier(modifier: Modifier, result?: any, params?: any): any {
    let r = params ? modifier.func(params, result) : modifier.func(result);
    return r;
  }
}