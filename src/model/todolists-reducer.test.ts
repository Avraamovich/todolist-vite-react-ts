import {v1} from "uuid";
import {test, expect} from "vitest";
import {TodoList} from "../App";
import {deleteTodolistAC, todolistsReducer} from "./todolistsReducer.ts";

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodoList[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const action = {
        type: 'delete_todolist',
        payload: {
            id: todolistId1,
        },
    } as const

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})