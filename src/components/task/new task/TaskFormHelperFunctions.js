export const priorityDataHandler = (priority) => {
  if (priority === 0) {
    return "LOW";
  } else if (priority === 1) {
    return "MEDIUM";
  } else if (priority === 2) {
    return "HIGH";
  }
};

export const priorityReverseDataHandler = (priority) => {
  if (priority === "LOW") {
    return 0;
  } else if (priority === "MEDIUM") {
    return 1;
  } else if (priority === "HIGH") {
    return 2;
  }
};

export const priorityColorHandler = (priority) => {
  if (priority === "LOW") {
    return "green";
  } else if (priority === "MEDIUM") {
    return "blue";
  } else if (priority === "HIGH") {
    return "red";
  }
};

export const statusReverseDataHandler = (status) => {
  if (status === "NOT ACTIVE") {
    return 0;
  } else if (status === "ACTIVE") {
    return 1;
  } else if (status === "COMPLETED") {
    return 2;
  }
};

export const statusDataHandler = (status) => {
  if (status === 0) {
    return "NOT ACTIVE";
  } else if (status === 1) {
    return "ACTIVE";
  } else if (status === 2) {
    return "COMPLETED";
  }
};

export const statusColorHandler = (status) => {
  if (status === "NOT ACTIVE") {
    return "red";
  } else if (status === "ACTIVE") {
    return "blue";
  } else if (status === "COMPLETED") {
    return "green";
  }
};

export const makeDateString = (date) => {
  return (
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear()
  );
};
