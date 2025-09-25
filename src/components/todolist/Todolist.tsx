import {Button} from "../button/Button.tsx";
import {Tasks, TodoList} from "../../App.tsx";
import {FilterValues} from "../../App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../createItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../editableSpan/EditableSpan.tsx";

type TodolistProps = {
    todolistID: string
    todolists: TodoList
    task: Tasks[]
    deleteTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filter: FilterValues) => void
    createTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistProps) => {

    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolistID)
    }
    const createTaskHandler = (title: string) => {
        props.createTask(title, props.todolistID)
    }
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }


    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={props.todolists.title} onChange={changeTodolistTitleHandler} /></h3>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            {props.task.length === 0 ? (<p>'Todolist is empty'</p>) : (
                <ul>
                    {props.task.map(t => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(props.todolistID, t.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newStatusValue, props.todolistID)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolistID, t.id, title)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={t.title}  onChange={changeTaskTitleHandler}/>
                                <Button title='x' onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button
                    // className={filter === 'All' ? 'active-filter' : ''}
                    title={'All'} onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='All')}/>

                <Button title={'Active'} onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='Active')}/>

                <Button title={'Complete'} onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='Complete')}/>
            </div>
        </div>
    );
};
