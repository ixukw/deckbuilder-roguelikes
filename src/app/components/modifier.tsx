import { v4 as uuid } from 'uuid';

export type Modifier = {
  id: string,
  name: string,
  description: string,
  func: Function,
  isActive: boolean
}

export const newModifier = (name: string, func: Function, isActive: boolean = false, desc: string = 'mod desc missing') => {
  return {
    id: uuid(),
    name: name,
    func: func,
    description: desc,
    isActive: isActive
  }
}

export const modifierToJSX = (modifier: Modifier): JSX.Element => {
  return <div><strong>{modifier.name}</strong>: {modifier.description} (isActive: {modifier.isActive.toString()})</div>
}