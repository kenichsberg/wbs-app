import * as React from 'react';
import 'react-native';
import 'jest-enzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';

import { ScheduleScreen } from './index'


const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

const TaskListView = jest.mock('./TaskListView');
const TaskCalendarView = jest.mock('./TaskCalendarView');

describe('ScheduleScreen', () => {
  let wrapper: ShallowWrapper;
  let props: any;
  beforeEach(() => {
    props = createTestProps({
      route: {}
    });
    wrapper = shallow(<ScheduleScreen {...props} />);
  });


  it("should navigate to CreateTaskScreen", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const simulateClick = async () => {
      await wrapper.find('[data-test="fab"]').simulate('click');
      expect(navigate).toBeCalledWith('CreateTask');
    };

    simulateClick();
  });

  it("should call TaskListView on default", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const simulateClick = async () => {
      await wrapper.find('[data-test="list-view-button"]').simulate('click');
      expect(TaskListView).toBeCalled();
    };

    simulateClick();
  });

  it("should call TaskCalendarView on click toggle-button", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const simulateClick = async () => {
      await wrapper.find('[data-test="calendar-view-button"]').simulate('click');
      expect(TaskCalendarView).toBeCalled();
    };

    simulateClick();
  });

  it("should call TaskListView on click toggle-button", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const simulateClick = async () => {
      await wrapper.find('[data-test="calendar-view-button"]').simulate('click');
      await wrapper.find('[data-test="list-view-button"]').simulate('click');
      expect(TaskListView).toBeCalled();
    };

    simulateClick();
  });
});
