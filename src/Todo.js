import React, {useState} from 'react'
import { Button, ListItem, ListItemText,TextField, ListItemSecondaryAction, IconButton} from '@material-ui/core';
     import {  DeleteOutlineRounded, Edit,} from '@material-ui/icons';

import {  Dialog, DialogContent, DialogActions,} from '@material-ui/core';
import db from './firebase-config';

function Todo(props) {
      const [task, setTask] = useState(props.task);
      const[open,setOpen] = useState(false)
      const[update,setUpdate] = useState('')
      const [toUpdateId, setToUpdateId] = useState('');

     
      const openUpdateDialog = (todo) => {
        setOpen(true);
        setToUpdateId(task.id);
        setUpdate(task.title);
      }
      const deleteTodo = (id) => {
        db.collection('todos').doc(id).delete().then(res => {
          console.log('Deleted!', res);
          
        });
      }
      const handleClose = () => {
        setOpen(false);
      };

      const editTodo = () => {
        db.collection('todos').doc(toUpdateId).update({
          title: update
        });
        setOpen(false); 
      }
             
    return (
        <>
        <ListItem key={task.id} >

        <ListItemText
          primary={task.title}
          secondary={task.datetime}
        />

        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="Edit" onClick={() => openUpdateDialog(task)}>
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(task.id)}>
            <DeleteOutlineRounded />
          </IconButton>
        </ListItemSecondaryAction>

      </ListItem>
      <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Update Todo"
          type="text"
          fullWidth
          name="updateTodo"
          value={update}
          onChange={event => setUpdate(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={editTodo} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>

 </>
    )
}
export default Todo;