import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { COMPLETED, EDITING } from '../constants';

const Task = (props) => {
  // constructor(props) {
  //   super(props);

  //   interval = null;
  //   task = props.task;
  //   inputRef = createRef();
  //   changeH = changeH.bind(this);
  //   keydownH = keydownH.bind(this);
  //   state = {
  //     created: '',
  //     localDesc: task.desc,
  //   };
  // }

  const { task } = props;
  const inputRef = useRef(null);
  const [state, setState] = useState({
    created: '',
    localDesc: task.desc,
  });

  // componentDidMount() {
  //   const { task } = props;

  //   setState({
  //     created: formatDistanceToNow(task.timestamp, {
  //       addSuffix: true,
  //       includeSeconds: true,
  //     }),
  //   });

  //   interval = setInterval(() => {
  //     setState({
  //       created: formatDistanceToNow(task.timestamp, {
  //         addSuffix: true,
  //         includeSeconds: true,
  //       }),
  //     });
  //   }, 1000);
  // }

  const intervalRef = useRef(null);

  useEffect(() => {
    const { task: $task } = props;

    setState(prev => ({
      ...prev,
      created: formatDistanceToNow($task.timestamp, {
        addSuffix: true,
        includeSeconds: true,
      }),
    }));

    intervalRef.current = setInterval(() => {
      setState(prev => ({
        ...prev,
        created: formatDistanceToNow($task.timestamp, {
          addSuffix: true,
          includeSeconds: true,
        }),
      }));
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // componentDidUpdate() {
  //   const input = inputRef.current;

  //   if (input) input.focus();
  // }

  useEffect(() => {
    const input = inputRef.current;
    if (input) input.focus();
  });

  // componentWillUnmount() {
  //   clearInterval(interval);
  // }

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const changeH = (event) => {
    setState(prev => ({ ...prev, localDesc: event.target.value }))
  };

  const keydownH = (event) => {
    if (event.key === 'Enter') {
      const { task: $task } = props;
      const { id } = $task;
      const { updateSelf } = props;
      const { localDesc } = state;

      updateSelf(id, localDesc);
    }
  };

  const {
    toggleCompletedSelf,
    toggleEditingSelf,
    deleteSelf,
  } = props;
  const { mod, id } = task;
  const { created, localDesc } = state;

  return (
    <li className={mod}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={toggleCompletedSelf}
          checked={mod === COMPLETED}
        />

        <label>
          <span className="description">{localDesc}</span>
          <span className="created">{created}</span>
        </label>

        <button
          type="button"
          aria-label="изменить задачу"
          className="icon icon-edit"
          onClick={() => toggleEditingSelf(id)}
        />

        <button
          type="button"
          aria-label="удалить задачу"
          className="icon icon-destroy"
          onClick={deleteSelf}
        />
      </div>
      {
        mod === EDITING &&
        <input
          type="text"
          className="edit"
          ref={inputRef}
          value={localDesc}
          onChange={changeH}
          onKeyDown={keydownH}
        />
      }
    </li>
  );
}

Task.propTypes = {
  toggleCompletedSelf: PropTypes.func.isRequired,
  toggleEditingSelf: PropTypes.func.isRequired,
  updateSelf: PropTypes.func.isRequired,
  deleteSelf: PropTypes.func.isRequired,

  task: PropTypes.exact({
    timestamp: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    mod: PropTypes.string.isRequired,
  }).isRequired,
};

export default Task;
