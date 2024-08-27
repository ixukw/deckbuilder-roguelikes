import {Modifier} from './modifier';

export type Action = {
  func: Function,
  modifiers: Modifier[]
}
export const newAction = (func: Function, modifiers: Modifier[]): Action => {
  return {
    func: func,
    modifiers: modifiers
  }
}
export const executeAction = (act: Action, params?: any): any => {
  let result = params ? act.func(params) : act.func();
  let history = [result];

  for (const mod of act.modifiers) {
    if (mod.active) {
      result = executeActionModifier(act, mod, result, params)
      history.push(result)
    }
  }

  console.log(history);
  return result;
}

export const executeActionModifier = (act: Action, modifier: Modifier, result?: any, params?: any): any => {
  let r = params ? modifier.func(params, result) : modifier.func(result);
  return r;
}
/*
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
}*/