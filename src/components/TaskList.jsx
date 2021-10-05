import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

const TaskList = ({
  list,
  onToggleCompleted,
  onToggleEditing,
  onUpdateTask,
  onDeleteTask
}) => (
  <ul className="todo-list">
    {list.map((task) => (
      <Fragment key={task.id}>
        <Task
          task={task}
          toggleCompletedSelf={() => onToggleCompleted(task.id)}
          toggleEditingSelf={onToggleEditing}
          updateSelf={onUpdateTask}
          deleteSelf={() => onDeleteTask(task.id)}
        />
      </Fragment>
    ))}
  </ul>
)

TaskList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
