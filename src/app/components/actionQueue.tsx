import { Action } from './';

export type ActionQueue = {
  actions: ActionQueueItem[],
  history: ActionQueueItem[],
}

type ActionQueueItem = {
  action: Action.Action,
  params: {}
}

const newActionQueueItem = (action: Action.Action, params: Object = {}): ActionQueueItem => {
  return {
    action: action,
    params: params,
  }
}

/**
 * ActionQueue: manages the queue of actions
 * @param actions actions to initialize queue with
 * @returns new action queue
 */
export const newActionQueue = (actions: ActionQueueItem[] = []): ActionQueue => {
  return {
    actions: actions,
    history: [],
  }
}

/**
 * Enqueue action
 * @param action action to enqueue
 * @param params action params
 * @returns 
 */
export const pushAction = (action: Action.Action, params: Object = {}): ActionQueue => {
  globalActionQueue = {...globalActionQueue, actions: [...globalActionQueue.actions, newActionQueueItem(action, params)]};
  return globalActionQueue;
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
      Action.executeAction(act.action, act.params);
    }
  }
  return newActionQueue(queue);
}

export const actionQueueToJSX = (actionQueue: ActionQueue): JSX.Element => {
  return <div>
    Enqueued: ({actionQueue.actions.length})<br/>
    {actionQueue.actions.map(a => 
      <div>
        {Action.actionToJSX(a.action)}
        Params: ({Object.keys(a.params).length})
        
      </div>
    )}
    History: ({actionQueue.history.length})<br/>
    {actionQueue.history.map(a => 
      <div>
        {Action.actionToJSX(a.action)}
        Params: ({Object.keys(a.params).length})
        
      </div>
    )}
  </div>
}

// create a new global object that this queue sits in, as well as all other global data
export let globalActionQueue = newActionQueue();