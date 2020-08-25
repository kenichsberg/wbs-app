export type Task = {
  id: string | number | null;
  category: string;
  taskName: string;
  startDatetimePlanned: string;
  manHour: number | undefined;
  endDatetimePlanned: string;
  //startDatetimeResult: string;
  //endDatetimeResult: string;
  //selectedDocument: number | null;
};


type TasksFormatted = {
  [key: string]: Array<Task>;
};

type FormattedList = {
  categories: Array<string>;
  tasksFormatted: TasksFormatted;
}


/** 
 *
 * タスクリストのJSX構築のため、
 * キー：category、値：Taskの配列 となるオブジェクトを生成する。
 *
 */
export const getFormattedTasks = (tasks: Array<Task>): FormattedList => {

  // categoryのセット(の配列)を取得
  const categories: Array<string> = Array.from(
    new Set(tasks.map(task => task.category || 'null'))
  );


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
