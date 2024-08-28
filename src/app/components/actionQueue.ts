import { Action } from './';

export type ActionQueue = {
  actions: Action.Action[],
  history: Action.Action[],
}

/**
 * ActionQueue: manages the queue of actions
 * @param actions actions to initialize queue with
 * @returns new action queue
 */
export const newActionQueue = (actions: Action.Action[] = []): ActionQueue => {
  return {
    actions: actions,
    history: [],
  }
}

/**
 * Enqueue action
 * @param actionQueue queue to enqueue on
 * @param action action to enqueue
 * @returns 
 */
export const pushAction = (action: Action.Action): ActionQueue => {
  globalActionQueue = {...globalActionQueue, actions: [...globalActionQueue.actions, action]};
  return {...globalActionQueue, actions: [...globalActionQueue.actions, action]}
}

/**
 * Processes n items and returns the new queue afterward
 * @param actionQueue queue to process
 * @param n number of actions to process, default all
 * @returns new queue after processing
 */
export const processQueue = (actionQueue: ActionQueue, n?: number): ActionQueue => {
  const queue = [...actionQueue.actions]
  for (let i=0; i<(n ? n : queue.length); i++) {
    const act = queue.shift();
    if (act) {
      Action.executeAction(act);
    }
  }
  return newActionQueue(queue);
}

export let globalActionQueue = newActionQueue();