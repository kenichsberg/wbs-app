import * as React from 'react';
import 'react-native';
import 'jest-enzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';

import { TaskListView } from './index';
import { Task } from '/domain/Task/';


/*
const parentProps = {
  navigation: {
    navigate: jest.fn()
  },
};
 */

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
  startDatetimePlanned: "\"2020-06-28T08:00:03.030Z\"",
  endDatetimePlanned: "\"2020-06-29T08:00:03.030Z\"",
  manHour: 8,
  //startDatetimeResult: null,
  //endDatetimeResult: null,
  selectedDocument: 4
};

const task2 = {
  id: 1,
  category: '開発',
  taskName: 'ログイン機能開発',
  startDatetimePlanned: "\"2020-06-29T08:00:03.030Z\"",
  endDatetimePlanned: "\"2020-06-30T08:00:03.030Z\"",
  manHour: 8,
  //startDatetimeResult: null,
  //endDatetimeResult: null,
  selectedDocument: 4
};

const tasks: Array<Task>  = [task1, task2];


describe('TaskListView', () => {
  let props: any;

  it("should render correctly without params", () => {
    props = createTestProps({
      tasks: []
    });

    //props = {...props, parentProps};

    const tree = renderer.create(<TaskListView {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with params", () => {
    props = createTestProps({
      tasks: tasks
    });

    //props = {...props, parentProps};

    const tree = renderer.create(<TaskListView {...props}  />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should navigate to edit task screen", () => {
    props = createTestProps({
      tasks: tasks
    });

    const wrapper: ShallowWrapper = shallow(<TaskListView {...props} />);
    const buttons: ShallowWrapper = wrapper.find('[data-test="edit-button"]');
    expect(buttons).toHaveLength(2);

    //const navigate = jest.spyOn(parentProps.navigation, 'navigate');
    const navigate = jest.spyOn(props.navigation, 'navigate');

    /*
    const simulateClick = async (target: ShallowWrapper) => {
      await target.simulate('click');

      return expect(navigate).toBeCalledWith('EditTask');
    };

    simulateClick(button.at(0));
     */
    buttons.at(0).simulate('press');

    expect(navigate).toBeCalledWith(
      'EditTask', expect.objectContaining({ task: task1 })
    );
  });
});
