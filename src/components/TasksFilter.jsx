import React from 'react';
import PropTypes from 'prop-types';

import { ACTIVE, COMPLETED } from '../constants';
import upperFirstLetter from '../upperFirstLetter';

const filters = ['all', ACTIVE, COMPLETED];

const TasksFilter = ({ currentFilter, setCurrentFilter }) => (
  <ul className="filters">
    {/* selected */}
    {filters.map((filter) => (
      <li key={filter}>
        <button
          type="button"
          onClick={() => setCurrentFilter(filter)}
          className={filter === currentFilter ? 'selected' : ''}
        >
          {upperFirstLetter(filter)}
        </button>
      </li>
    ))}
  </ul>
);

TasksFilter.propTypes = {
  setCurrentFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default TasksFilter;
