import Task from "../task/Task";
const MyTasksList = (props) => {
  return (
    <>
      {props.tasks.map((task) => (
        <Task
          title={task.title}
          creator={task.creator}
          dueDate={task.dueDate}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </>
  );
};
export default MyTasksList;
