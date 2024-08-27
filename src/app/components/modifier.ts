import { v4 as uuid } from 'uuid';

export type Modifier = {
  id: string,
  name: string,
  description: string,
  func: Function,
  active: boolean
}

export const newModifier = (name: string, func: Function, active: boolean = false, desc: string = 'mod desc missing') => {
  return {
    id: uuid(),
    name: name,
    func: func,
    description: desc,
    active: active
  }
}