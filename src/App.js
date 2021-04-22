import React, { useState, useEffect } from 'react';
import { Container, Button} from '@material-ui/core';

import {  TextField,List} from '@material-ui/core';

  import { AddCircleOutlineRounded} from '@material-ui/icons';


import Todo from './Todo';
import db from './firebase-config';
import firebase from "firebase";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    
   
useEffect(()=>{
db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>
    setTasks(snapshot.docs.map(doc => (
       { id: doc.id, title : doc.data().title , status : doc.data().status })))
    )} ,[]);

    const addTask = (event) => {
        event.preventDefault();
        db.collection('todos').add({
            title: input,
            status: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        tasks.push({
          title: input,
            status: false,
        })
        setInput('');
    }
    
    return (
        <Container maxWidth="sm">
        <form noValidate>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Enter ToDo"
          name="todo"
          autoFocus
          value={input}
          onChange={event => setInput(event.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          
          onClick={addTask}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Todo
      </Button>

      </form>

      <List dense={true}>
                {tasks.map(task => (
                    <Todo key={task.id} task={task} />
                ))}
            </List>
           
    
        </Container>
    );
};



export default App;
