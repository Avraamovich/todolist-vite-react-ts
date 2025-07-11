import {Button} from "../button/Button.tsx";
import {Tasks, TodoList} from "../../App.tsx";
import {FilterValues} from "../../App.tsx";
import {ChangeEvent, type KeyboardEvent, useState} from "react";

type TodolistProps = {
    todolists:TodoList
    task: Tasks[]
    deleteTask: (taskId: string) => void
    changeFilter:(filter: FilterValues) => void
    createTask: (taskTitle: string)=> void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({todolists:{title, filter},
                             task,
                             deleteTask,
                             changeFilter,
                             createTask,
                             changeTaskStatus,}: TodolistProps) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {task.length === 0 ? (<p>'Todolist is empty'</p>) : (
                <ul>
                    {task.map(t => {
                        const deleteTaskHandler = () => {
                            deleteTask(t.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(t.id, newStatusValue)

                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <Button title='x' onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <Button
                //className={filter === 'all' ? 'active-filter' : ''}
                title={'All'} onClick={() => changeFilter('All')}/>

            <Button title={'Active'} onClick={() => changeFilter('Active')}/>

            <Button title={'Complete'} onClick={() => changeFilter('Complete')}/>
        </div>
    );
};
