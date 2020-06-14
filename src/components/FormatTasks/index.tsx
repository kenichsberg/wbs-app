//import { Task } from '/screens/CreateTaskScreen';
import { PartialTask } from '/screens/ScheduleScreen';

/** 
 *
 * タスクリストのJSX構築のため、
 * キー：category、値：taskの配列 となるオブジェクトを生成する。
 *
 * @param tasks = [task1, task2, ...]
 * @return [
 *    categories ： categoryの配列,
 *    tasksFormatted = {[category1]: [taskA, ...], [category2]: [taskX, ...], ...}
 * ]
 *
 */
type TasksFormatted = {
  [key: string]: Array<PartialTask>;
};

type Formatted = {
  categories: Array<string>;
  tasksFormatted: TasksFormatted;
}

export const FormatTasks = (tasks: Array<PartialTask>): Formatted => {

  // categoryのセット(の配列)を取得
  const categories: Array<string> = Array.from(new Set(tasks.map(task => task.category)));


  // キー：category、値：taskの配列 となるオブジェクトを生成
  let tasksFormatted: TasksFormatted = {};

  categories.forEach(category => {
    tasksFormatted = {
      ...tasksFormatted,
      [category]: tasks.filter(task => task.category === category)
    }
  });

  return {
    categories: categories,
    tasksFormatted: tasksFormatted
  };
}
