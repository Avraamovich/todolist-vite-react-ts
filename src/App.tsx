import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {Todolist} from "./components/todolist/Todolist.tsx";
import {CreateItemForm} from "./components/createItemForm/CreateItemForm.tsx";

export type Tasks = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValues = 'All' | 'Active' | 'Complete'
export type TodoList = {
    id: string
    title: string
    filter: FilterValues
}
export type TasksType = {
    [key: string]: Tasks[]
}

export function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<TodoList[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        const newTodolists = todolists.map(todolist => {
            return todolist.id === todolistId ? {...todolist, filter} : todolist
        })
        setTodolists(newTodolists)
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        const task = tasks[todolistId];
        const filtredTasks = task.filter(task => task.id !== taskId);
        tasks[todolistId] = filtredTasks;
        setTasks({...tasks})
    }
    const createTask = (title: string,todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        const task = tasks[todolistId];
        const newListTasks = [newTask, ...task];
        tasks[todolistId] = newListTasks;
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const task = tasks[todolistId]
        const newState = task.map(task => task.id == taskId ? {...task, isDone} : task)
        tasks[todolistId] = newState;
        setTasks({...tasks})
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId];
        setTasks({...tasks})
    }
    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodoList = {id: todolistId, title, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [todolistId]: [] })
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task)})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
    }

    return (
        <div className='app'>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map(todolist => {
                let filteredTasks = tasks[todolist.id];
                if (todolist.filter === 'Active') {
                    filteredTasks = filteredTasks.filter((task) => !task.isDone)
                }
                if (todolist.filter === 'Complete') {
                    filteredTasks = filteredTasks.filter((task) => task.isDone)
                }

                return (
                    <Todolist key={todolist.id}
                              todolistID={todolist.id}
                              todolists={todolist}
                              task={filteredTasks}
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}
                              createTask={createTask}
                              changeTaskStatus={changeTaskStatus}
                              deleteTodolist={deleteTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    )

}

