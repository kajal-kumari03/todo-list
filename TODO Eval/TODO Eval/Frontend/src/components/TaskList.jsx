import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import TaskForm from './TaskForm';

const socket = io('http://localhost:4000', {
  auth: {
    token: localStorage.getItem('token')
  }
});

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.on('init', (initialTasks) => {
      setTasks(initialTasks);
    });

    socket.on('updateTasks', (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off('init');
      socket.off('updateTasks');
    };
  }, []);

  const addTask = (taskContent) => {
    const task = { id: Date.now(), content: taskContent, status: 'pending' };
    socket.emit('addTask', task);
  };

  const updateTask = (taskId, status) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    updatedTask.status = status;
    socket.emit('updateTask', updatedTask);
  };

  const deleteTask = (taskId) => {
    socket.emit('deleteTask', taskId);
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.content} - {task.status}
            <button onClick={() => updateTask(task.id, 'in-progress')}>In Progress</button>
            <button onClick={() => updateTask(task.id, 'completed')}>Completed</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
