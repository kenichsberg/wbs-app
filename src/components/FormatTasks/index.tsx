import { Task } from '/screens/CreateTaskScreen';

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
type Props = {
  tasks: Array<Task>;
  children?: never;
};

type Categories = {
  categories: Array<string>;
};

type TasksFormatted = {
  [key: string]: Array<Task>;
};

type Formatted = {
  categories: Array<string>;
  tasksFormatted: TasksFormatted;
}

export const FormatTasks = (tasks: Array<Task>): Formatted => {

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
