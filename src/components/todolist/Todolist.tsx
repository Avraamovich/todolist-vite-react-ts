import {Button} from "../button/Button.tsx";
import {TasksProps} from "../../App.tsx";
import {FilterValues} from "../../App.tsx";
import {ChangeEvent, type KeyboardEvent, useState} from "react";

type TodolistProps = {
    title: string
    task: TasksProps[]
    deleteTask: (taskId: string) => void
    changeFilter:(filter: FilterValues) => void
    createTask: (taskTitle: string)=> void
}

export const Todolist = ({title, task, deleteTask, changeFilter, createTask}: TodolistProps) => {
    const [taskTitle, setTaskTitle] = useState("");

    const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
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
                <input value={taskTitle}
                       onChange={changeTaskHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
            </div>
            {task.length === 0 ? (<p>'Todolist is empty'</p>) : (
                <ul>
                    {task.map(t => {

                        const deleteTaskHandler = () => {
                            deleteTask(t.id)
                        }

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title='x' onClick={deleteTaskHandler}/>
                        </li>
                    })}
                </ul>
            )}
            <Button title={'All'} onClick={() => changeFilter('All')}/>
            <Button title={'Active'} onClick={() => changeFilter('Active')}/>
            <Button title={'Complete'} onClick={() => changeFilter('Complete')}/>
        </div>
    );
};
