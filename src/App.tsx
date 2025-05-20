import './App.css'
import {Todolist} from "./components/todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TasksProps = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'All' | 'Active' | 'Complete'

function App() {
    const [tasks, setTasks] = useState<TasksProps[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValues>('All')

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const createTask = (title: string) => {
        setTasks( [{id: v1(), title, isDone: false}, ...tasks] )
    }

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter((task) => !task.isDone)
    }
    if (filter === 'Complete') {
        filteredTasks = tasks.filter((task) => task.isDone)
    }
    return (
        <div>
            <Todolist title={'New Task'}
                      task={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
            />
        </div>
    )
}

export default App
