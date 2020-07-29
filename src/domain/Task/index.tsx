import { Task } from '/screens/CreateTaskScreen';

/** 
 *
 * タスクリストのJSX構築のため、
 * キー：category、値：taskの配列 となるオブジェクトを生成する。
 *
 */
type TasksFormatted = {
  [key: string]: Array<Partial<Task>>;
};

type Formatted = {
  categories: Array<string>;
  tasksFormatted: TasksFormatted;
}

export const getFormattedTasks = (tasks: Array<Partial<Task>>): Formatted => {

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
