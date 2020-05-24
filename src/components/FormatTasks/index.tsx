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
export const FormatTasks: React.FC = tasks => {

  // categoryのセット(の配列)を取得
  const categories = Array.from(new Set(tasks.map(task => task.category)));


  // キー：category、値：taskの配列 となるオブジェクトを生成
  let tasksFormatted = {};

  categories.forEach(category => {
    tasksFormatted = {
      ...tasksFormatted,
      [category]: tasks.filter(task => task.category === category)
    }
  });

  return [categories, tasksFormatted];
}
