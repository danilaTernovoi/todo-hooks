import React, { useEffect, useState } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import { ACTIVE, COMPLETED, EDITING } from './constants';

const App = () => {
  

  const [state, setState] = useState({
    currentFilter: 'all',
    tasks: [],
  });

 

  useEffect(() => {
    setState({
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    });
  }, []);



  useEffect(() => {
    const { tasks } = state;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [state]);


  const getTask = (id) => {
    const { tasks } = state;
    return tasks.find((task) => task.id === id);
  };



  const toggleCompleted = (id) => {
    const { tasks } = state;
    const toggledTask = tasks.find((task) => task.id === id);
    toggledTask.mod = toggledTask.mod === ACTIVE ? COMPLETED : ACTIVE;
    setState(prev => ({ ...prev }));
  };



  const toggleEditing = (id) => {
    const { tasks } = state;
    const toggledTask = tasks.find((task) => task.id === id);
    toggledTask.mod = toggledTask.mod === ACTIVE ? EDITING : ACTIVE;
    setState(prev => ({ ...prev }));
  };



  const createTask = (desc) => {
    const newTask = {
      desc,
      id: `${Date.now()}-${desc}`,
      mod: ACTIVE,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  };

 


  const updateTasks = (id, newDescription) => {
    const taskToUpdate = getTask(id);
    taskToUpdate.desc = newDescription;
    taskToUpdate.mod = ACTIVE;
    setState(prev => ({ ...prev }));
  }



  const deleteTask = (id) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }));
  };



  const clearCompleted = () => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.mod !== COMPLETED),
    }));
  };

  const { tasks, currentFilter } = state;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTaskForm onCreate={createTask} list={tasks} />
      </header>

      <section className="main">
        <TaskList
          list={tasks.filter((task) => (currentFilter === 'all' ? task : task.mod === currentFilter))}
          onToggleCompleted={toggleCompleted}
          onToggleEditing={toggleEditing}
          onUpdateTask={updateTasks}
          onDeleteTask={deleteTask}
        />

        <Footer
          count={tasks.length}
          currentFilter={currentFilter}
          setCurrentFilter={(newFilter) => setState({ currentFilter: newFilter })}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}

export default App;
