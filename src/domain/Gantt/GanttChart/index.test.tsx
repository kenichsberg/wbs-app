import { GanttChart } from './index';


const task1 = {
  id: 0,
  category: '開発',
  taskName: 'Hello World',
  startDatetimePlanned: '2020/4/1 9:00',
  endDatetimePlanned: '2020/4/2 18:00',
  startDatetimeResult: null,
  endDatetimeResult: null,
  selectedDocument: 4
};

const task2 = {
  id: 1,
  category: '開発',
  taskName: 'ログイン機能開発',
  startDatetimePlanned: '2020/4/3 9:00',
  endDatetimePlanned: '2020/4/3 18:00',
  startDatetimeResult: null,
  endDatetimeResult: null,
  selectedDocument: 4
};

const tasksFormatted = {
  '開発': [task1, task2]
};

describe('GanttChart', () => {
  it('not implemented', () => {
  });
});
