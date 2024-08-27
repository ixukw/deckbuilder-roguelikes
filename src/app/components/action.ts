import { Modifier } from './';

export type Action = {
  func: Function,
  modifiers: Modifier.Modifier[]
}

export const newAction = (func: Function, modifiers: Modifier.Modifier[]): Action => {
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

export const executeActionModifier = (act: Action, modifier: Modifier.Modifier, result?: any, params?: any): any => {
  let r = params ? modifier.func(params, result) : modifier.func(result);
  return r;
}