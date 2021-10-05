import React, { useEffect, useState } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import { ACTIVE, COMPLETED, EDITING } from './constants';

const App = () => {
  // state = {
  //   currentFilter: 'all',
  //   tasks: [],
  // };

  const [state, setState] = useState({
    currentFilter: 'all',
    tasks: [],
  });

  // componentDidMount() {
  //   this.setState({
  //     tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  //   });
  // }

  useEffect(() => {
    setState({
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    });
  }, []);

  // componentDidUpdate() {
  //   const { tasks } = this.state;
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  useEffect(() => {
    const { tasks } = state;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [state]);

  // getTask = (id) => {
  //   const { tasks } = this.state;
  //   return tasks.find((task) => task.id === id);
  // }

  const getTask = (id) => {
    const { tasks } = state;
    return tasks.find((task) => task.id === id);
  };

  // toggleCompleted = (id) => {
  //   const { tasks } = this.state;
  //   const toggledTask = tasks.find((task) => task.id === id);
  //   toggledTask.mod = toggledTask.mod === ACTIVE ? COMPLETED : ACTIVE;
  //   this.forceUpdate();
  // };

  const toggleCompleted = (id) => {
    const { tasks } = state;
    const toggledTask = tasks.find((task) => task.id === id);
    toggledTask.mod = toggledTask.mod === ACTIVE ? COMPLETED : ACTIVE;
    setState(prev => ({ ...prev }));
  };

  // toggleEditing = (id) => {
  //   const { tasks } = this.state;
  //   const toggledTask = tasks.find((task) => task.id === id);
  //   toggledTask.mod = toggledTask.mod === ACTIVE ? EDITING : ACTIVE;
  //   this.forceUpdate();
  // };

  const toggleEditing = (id) => {
    const { tasks } = state;
    const toggledTask = tasks.find((task) => task.id === id);
    toggledTask.mod = toggledTask.mod === ACTIVE ? EDITING : ACTIVE;
    setState(prev => ({ ...prev }));
  };

  // createTask = (desc) => {
  //   const newTask = {
  //     desc,
  //     id: `${Date.now()}-${desc}`,
  //     mod: ACTIVE,
  //     timestamp: Date.now(),
  //   };

  //   this.setState((state) => ({
  //     tasks: [...state.tasks, newTask],
  //   }));
  // };

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

  // updateTasks = (id, newDescription) => {
  //   const taskToUpdate = this.getTask(id);
  //   taskToUpdate.desc = newDescription;
  //   taskToUpdate.mod = ACTIVE;
  //   this.forceUpdate();
  // }


  const updateTasks = (id, newDescription) => {
    const taskToUpdate = getTask(id);
    taskToUpdate.desc = newDescription;
    taskToUpdate.mod = ACTIVE;
    setState(prev => ({ ...prev }));
  }

  // deleteTask = (id) => {
  //   this.setState((state) => ({
  //     tasks: state.tasks.filter((task) => task.id !== id),
  //   }));
  // };

  const deleteTask = (id) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }));
  };

  // clearCompleted = () => {
  //   this.setState((state) => ({
  //     tasks: state.tasks.filter((task) => task.mod !== COMPLETED),
  //   }));
  // };

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
