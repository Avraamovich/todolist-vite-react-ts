import './App.css'
import {Todolist} from "./components/todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Tasks = {
    id: string
    title: string
    isDone: boolean
}

export type TodoList = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'All' | 'Active' | 'Complete'

export function App() {

    const todolist1 = v1();
    const todolist2 = v1();

    const [todolists, setTodolists] = useState<TodoList[]>([
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ])
    const [tasks, setTasks] = useState({
        [todolist1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolist2]: [
            {id: v1(), title: 'HTML-1', isDone: true},
            {id: v1(), title: 'JS-1', isDone: true},
            {id: v1(), title: 'React-1', isDone: false}
        ]
    })

    const deleteTask = (taskId: string) => {
        // const filteredTasks = tasks.filter((task) => task.id !== taskId);
        // setTasks(filteredTasks);
    }

    const createTask = (title: string) => {
        // setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    // const changeFilter = (filter: FilterValues) => {
    //     setFilter(filter)
    // }

    // let filteredTasks = tasks
    // if (filter === 'Active') {
    //     filteredTasks = tasks.filter((task) => !task.isDone)
    // }
    // if (filter === 'Complete') {
    //     filteredTasks = tasks.filter((task) => task.isDone)
    // }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        // setTasks(newState)
    }


    return (
        <div className="app">
            {todolists.map(tl => {
                const filteredTasks = tasks[tl.id];
                // if (todolist.filter === 'Active') {
                //     filteredTasks = tasks.filter(task => !task.isDone)
                // }
                // if (todolist.filter === 'Completed') {
                //     filteredTasks = tasks.filter(task => task.isDone)
                // }

                return (
                    <Todolist key={tl.id}
                              todolists={tl}
                              task={filteredTasks}
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}
                              createTask={createTask}
                              changeTaskStatus={changeTaskStatus}/>
                )
            })}
        </div>
    )
}

