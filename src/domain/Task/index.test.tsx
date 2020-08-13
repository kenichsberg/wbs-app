import { getFormattedTasks } from './index'
import { Task } from '/screens/CreateTaskScreen';


const task1: Task = {
  id: 0,
  category: '開発',
  taskName: 'Hello World',
  startDatetimePlanned: '2020-4-1 9:00',
  endDatetimePlanned: '2020-4-2 18:00',
  manHour: undefined,
  //startDatetimeResult: null,
  //endDatetimeResult: null,
  selectedDocument: 4
};

const task2: Task = {
  id: 1,
  category: '開発',
  taskName: 'ログイン機能開発',
  startDatetimePlanned: '2020-4-3 9:00',
  endDatetimePlanned: '2020-4-3 18:00',
  manHour: undefined,
  //startDatetimeResult: null,
  //endDatetimeResult: null,
  selectedDocument: 4
};

const tasks = [task1, task2];

describe('FormatTasks function', () => {
  it('should join the same category', () => {
    const ret = getFormattedTasks(tasks);
    const categories = ['開発'];
    const taskFormatted = {
      '開発': [task1, task2]
    };

    expect(ret).toEqual({
      categories: categories, 
      tasksFormatted: taskFormatted
    });
  });
});
