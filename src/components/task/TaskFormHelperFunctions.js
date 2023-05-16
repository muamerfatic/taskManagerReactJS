export const priorityDataHandler = (priority) => {
    if (priority === 0) {
      return "LOW";
    } else if (priority === 1) {
      return "MEDIUM";
    } else if (priority === 2) {
      return "HIGH";
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