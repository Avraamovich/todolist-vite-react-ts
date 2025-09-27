import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {Tasks, TodoList} from "../../App.tsx";
import {FilterValues} from "../../App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../createItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../editableSpan/EditableSpan.tsx";
import Button from "@mui/material/Button";
import {Box, Checkbox, List, ListItem} from "@mui/material";
import {containerSx, getListItemSx} from "./Todolist.styles.ts";

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
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            {props.task.length === 0 ? (<p>'Todolist is empty'</p>) : (
                <List>
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
                            <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
                                <div>
                                    <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} />
                                    <EditableSpan value={t.title}  onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={containerSx}>{/*...*/}
                <Button variant={props.todolists.filter === 'All' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='All')}>
                    All
                </Button>
                <Button variant={props.todolists.filter === 'Active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='Active')}>
                    Active
                </Button>
                <Button variant={props.todolists.filter === 'Complete' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='Complete')}>
                    Complete
                </Button>


                {/*<Button*/}
                {/*    // className={filter === 'All' ? 'active-filter' : ''}*/}
                {/*    title={'All'} onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='All')}/>*/}

                {/*<Button title={'Active'} onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='Active')}/>*/}

                {/*<Button title={'Complete'} onClick={() => props.changeFilter(props.todolistID, props.todolists.filter='Complete')}/>*/}
            </Box>
            </div>
    );
};
