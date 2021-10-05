import React, { useState } from 'react';
import PropTypes from 'prop-types';
import upperFirstLetter from '../upperFirstLetter';

const NewTaskForm = (props) => {
  const [state, setState] = useState({
    value: ''
  });

  const changeHandler = (event) => {
    setState({ value: event.target.value });
  };

  const keydownHandler = (event) => {
    if (event.key === 'Enter') {
      const { onCreate: createTask } = props;
      const { value } = state;
      createTask(upperFirstLetter(value));
      setState({ value: '' });
    }
  };

  const { list } = props;
  const { value } = state;
  const isClone = !!list.find((task) => task.desc === upperFirstLetter(value).trim());
  const isVoid = !value;
  const isValid = !isClone && !isVoid;

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={value}
      onChange={changeHandler}
      onKeyDown={isValid ? keydownHandler : () => { }}
      style={{ outline: isValid ? '' : '1px solid crimson' }}
    />
  );
}

NewTaskForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTaskForm;
