import {
  priorityReverseDataHandler,
  statusReverseDataHandler,
} from "../new task/TaskFormHelperFunctions";

export const ascSortFn = (p1, p2) =>
  p1.title < p2.title ? -1 : p1.title > p2.title ? 1 : 0;

export const descSortFn = (p1, p2) =>
  p1.title < p2.title ? 1 : p1.title > p2.title ? -1 : 0;

export const startDateSortFn = (p1, p2) =>
  p1.startDate < p2.startDate ? -1 : p1.startDate > p2.startDate ? 1 : 0;

export const dueDateSortFn = (p1, p2) =>
  p1.dueDate < p2.dueDate ? -1 : p1.dueDate > p2.dueDate ? 1 : 0;

export const prioritySortFn = (p1, p2) =>
  priorityReverseDataHandler(p1.priority) <
  priorityReverseDataHandler(p2.priority)
    ? 1
    : priorityReverseDataHandler(p1.priority) >
      priorityReverseDataHandler(p2.priority)
    ? -1
    : 0;

export const statusSortFn = (p1, p2) =>
  statusReverseDataHandler(p1.status) < statusReverseDataHandler(p2.status)
    ? 1
    : statusReverseDataHandler(p1.status) > statusReverseDataHandler(p2.status)
    ? -1
    : 0;
