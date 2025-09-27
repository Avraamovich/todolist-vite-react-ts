import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {Todolist} from "./components/todolist/Todolist.tsx";
import {CreateItemForm} from "./components/createItemForm/CreateItemForm.tsx";
import {AppBar, Paper, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {containerSx} from "./components/todolist/Todolist.styles.ts";
import {NavButton} from "./components/button/NavButton.ts";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';


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
type ThemeMode = 'dark' | 'light'

export function App() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

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
    const createTask = (title: string, todolistId: string) => {
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
        setTasks({...tasks, [todolistId]: []})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
    }
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton >Sign in</NavButton>
                            <NavButton >Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode} />
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>

                    {todolists.map(todolist => {
                        let filteredTasks = tasks[todolist.id];
                        if (todolist.filter === 'Active') {
                            filteredTasks = filteredTasks.filter((task) => !task.isDone)
                        }
                        if (todolist.filter === 'Complete') {
                            filteredTasks = filteredTasks.filter((task) => task.isDone)
                        }

                        return (
                            <Grid key={todolist.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
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
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )

}

