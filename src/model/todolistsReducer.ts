import type {TodoList} from '../App'

const initialState: TodoList[] = []
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
type Actions = DeleteTodolistAction

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: { id }} as const
}

export const todolistsReducer = (state: TodoList[] = initialState, action: Actions): TodoList[] => {
    //...
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        default:
            return state
    }
}