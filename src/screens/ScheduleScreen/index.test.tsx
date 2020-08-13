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

const TaskListView = jest.mock('../TaskListView');
const TaskCalendarView = jest.mock('../TaskCalendarView');

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

    const fab: ShallowWrapper = wrapper.find('[data-test="fab"]');
    expect(fab).toHaveLength(1);

    fab.simulate('press');

    expect(navigate).toBeCalledWith('CreateTask');
  });

  /*
  it("should call TaskListView on default", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const listTabButton: ShallowWrapper = wrapper.find('[data-test="list-view-button"]');
    expect(listTabButton).toHaveLength(1);

    listTabButton.simulate('press');

    expect(navigate).toBeCalledWith('ListTab');
  });

  it("should call TaskCalendarView on click toggle-button", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const calendarTabButton: ShallowWrapper = wrapper.find('[data-test="calendar-view-button"]');
    expect(calendarTabButton).toHaveLength(1);

    calendarTabButton.simulate('press');

    expect(navigate).toBeCalledWith('CalendarTab');
  });

  it("should call TaskListView on click toggle-button", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const listTabButton: ShallowWrapper = wrapper.find('[data-test="list-view-button"]');
    expect(listTabButton).toHaveLength(1);

    listTabButton.simulate('press');

    expect(navigate).toBeCalledWith('ListTab');
  });
   */
});
