export type Task = {
  id: string | number | null;
  category: string;
  taskName: string;
  predecessorTaskId: string | number | null;
  startDatetimePlanned: string;
  manHour: number | undefined;
  endDatetimePlanned: string;
};


type TasksFormatted = {
  [key: string]: Array<Task>;
};

type FormattedList = {
  categories: Array<string>;
  tasksFormatted: TasksFormatted;
}


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


export const getTaskById = (
  taskId: string | number | null,
  tasks: Array<Task>
): Task | undefined => {

  if (taskId === null) return undefined;

  const targetTask = tasks.filter(task => task.id === taskId);

  return targetTask[0];
}
