import type {TodoList} from '../App'

const initialState: TodoList[] = []
type Actions = {
    type: string
    payload: any
}

export const todolistsReducer = (state: TodoList[] = initialState, action: Actions): TodoList[] => {
    //...
    switch (action.type) {
        case 'delete_todolist': {
            return state
        }
        default:
            return state
    }
}