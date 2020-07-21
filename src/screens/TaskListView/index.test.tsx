import * as React from 'react';
import 'react-native';
import 'jest-enzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';

import { TaskListView } from './index';
import { PartialTask } from '/screens/ScheduleScreen/';


const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});


const task1 = {
  id: 0,
  category: '開発',
  taskName: 'Hello World',
  //startDatetimePlanned: '2020/4/1 9:00',
  //endDatetimePlanned: '2020/4/2 18:00',
  startDatetimePlanned: "\"2020-06-28T08:00:03.030Z\"",
  endDatetimePlanned: "\"2020-06-29T08:00:03.030Z\"",
  startDatetimeResult: null,
  endDatetimeResult: null,
  selectedDocument: 4
};

const task2 = {
  id: 1,
  category: '開発',
  taskName: 'ログイン機能開発',
  //startDatetimePlanned: '2020/4/3 9:00',
  //endDatetimePlanned: '2020/4/3 18:00',
  startDatetimePlanned: "\"2020-06-29T08:00:03.030Z\"",
  endDatetimePlanned: "\"2020-06-30T08:00:03.030Z\"",
  startDatetimeResult: null,
  endDatetimeResult: null,
  selectedDocument: 4
};

const tasks: Array<PartialTask>  = [task1, task2];


describe('TaskListView', () => {
  let wrapper: ShallowWrapper;
  let props: any;

  it("should render correctly without params", () => {
    props = createTestProps({
      tasks: []
    });

    const tree = renderer.create(<TaskListView {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with params", () => {
    props = createTestProps({
      tasks: tasks
    });

    const tree = renderer.create(<TaskListView {...props}  />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should navigate to edit task screen", () => {
    props = createTestProps({
      tasks: tasks
    });

    const navigate = jest.spyOn(props.navigation, 'navigate');

    const simulateClick = async () => {
      await wrapper.find('[data-test="edit-button"]').simulate('click');
      expect(navigate).toBeCalledWith('CreateTask');
    };

    simulateClick();
  });
});
