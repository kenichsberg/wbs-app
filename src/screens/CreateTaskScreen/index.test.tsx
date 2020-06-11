import * as React from 'react';
import 'react-native';
import 'jest-enzyme';
import { shallow, ShallowWrapper } from 'enzyme';
import renderer from 'react-test-renderer';

import { CreateTaskScreen } from './index'
import { CreateTaskProps, ScheduleStackParamList } from '/navigations/types.tsx';
import { StackNavigationProp } from '@react-navigation/stack';


type CrateTaskScreenRouteProp = StackNavigationProp<ScheduleStackParamList, 'CreateTask'>;

type CreateTaskNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'CreateTask'
>;

type Props = {
  route: CrateTaskScreenRouteProp;
  navigation: CreateTaskNavigationProp;
};


const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

const task = {
  id: 0,
  category: '開発',
  taskName: 'Hello World',
  startDatetimePlanned: '2020/4/1 9:00',
  endDatetimePlanned: '2020/4/2 18:00',
  startDatetimeResult: null,
  endDatetimeResult: null,
  selectedDocument: 4
};


describe('CreateTaskScreen', () => {
  let wrapper: ShallowWrapper;
  let props: any;
  beforeEach(() => {
    props = createTestProps({});
    wrapper = shallow(<CreateTaskScreen {...props} />);
  });

  it("should render correctly without params", () => {
    const tree = renderer.create(<CreateTaskScreen {...props}  />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with params", () => {
    props = createTestProps({
      route: {
        params: task
      }
    });
    const tree = renderer.create(<CreateTaskScreen {...props}  />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should navigate to ScheduleScreen", () => {
    const navigate = jest.spyOn(props.navigation, 'navigate');
    wrapper.find('[data-test="create-button"]').simulate('click');
    expect(navigate).toBeCalledWith('TaskList');
  });
});
