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
const TaskChartView = jest.mock('../TaskChartView');

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

  it("should call TaskChartView on click toggle-button", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');

    const chartTabButton: ShallowWrapper = wrapper.find('[data-test="chart-view-button"]');
    expect(chartTabButton).toHaveLength(1);

    chartTabButton.simulate('press');

    expect(navigate).toBeCalledWith('ChartTab');
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
