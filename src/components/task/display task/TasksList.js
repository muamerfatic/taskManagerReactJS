import SortFilterTasksCard from "../sort and filter task/SortFilterTasksCard";
import Task from "./Task";
import { useState } from "react";
import {
  ascSortFn,
  descSortFn,
  startDateSortFn,
  dueDateSortFn,
  prioritySortFn,
  statusSortFn,
} from "../sort and filter task/sort-tasks-fucntions";
const TasksList = (props) => {
  const [tasksSorts, setTasksSorts] = useState(props.tasks);
  const [taskFiltered, setTaskFiltered] = useState(props.tasks);
  const sortHandler = (typeOfSorting) => {
    const tempArray = [...tasksSorts];
    if (typeOfSorting === "ASC") {
      tempArray.sort(ascSortFn);
    } else if (typeOfSorting === "DESC") {
      tempArray.sort(descSortFn);
    } else if (typeOfSorting === "STARTDATE") {
      tempArray.sort(startDateSortFn);
    } else if (typeOfSorting === "DUEDATE") {
      tempArray.sort(dueDateSortFn);
    } else if (typeOfSorting === "PRIORITY") {
      tempArray.sort(prioritySortFn);
    } else if (typeOfSorting === "STATUS") {
      tempArray.sort(statusSortFn);
    }
    setTaskFiltered(tempArray);
  };

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...tasksSorts];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setTaskFiltered(updatedList);
  };
  return (
    <>
      <SortFilterTasksCard
        tasksForSorting={props.tasks}
        sortHandler={sortHandler}
        filterBySearch={filterBySearch}
      />

      {taskFiltered.map((task) => (
        <Task
          key={task.title}
          title={task.title}
          creator={task.creator}
          assignedUser={task.assignedUser}
          dueDate={task.dueDate}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </>
  );
};
export default TasksList;
