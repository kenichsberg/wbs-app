import * as React from 'react';
import 'react-native';
import 'jest-enzyme';
//import { shallow, ShallowWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import MockDate from 'mockdate';

import { CreateTaskScreen } from './index'
//import { CreateTaskProps, ScheduleStackParamList } from '/navigations/types.tsx';
//import { StackNavigationProp } from '@react-navigation/stack';


/*
type CrateTaskScreenRouteProp = StackNavigationProp<ScheduleStackParamList, 'CreateTask'>;

type CreateTaskNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'CreateTask'
>;

type Props = {
  route: CrateTaskScreenRouteProp;
  navigation: CreateTaskNavigationProp;
};
 */

/*
type DateComponents = [number, number, number, number, number, number, number] 
  | [number, number, number, number, number, number] 
  | [number, number, number, number, number] 
  | [number, number, number, number] 
  | [number, number, number] 
  | [number, number]
  | [string];
 */
/*
  | [];
 */


const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn()
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
  //let now: Date;
  //let spiedDate: any;
  
  beforeAll(() => {
    /*
    const OriginalDate = Date; // 退避
    now = new OriginalDate('2020-6-14 14:00:00');

    // Date.now() と new Date() のみmocking
    //Date.now = jest.fn(() => Date.parse('2020/6/14 14:00:00'));
    spiedDate = jest.spyOn(global, 'Date').mockImplementation(
      (...arg: DateComponents | []): any => {
        //if (arg.length === 0) return now;
        //if (arg.length > 7) return;

        //return new OriginalDate(...arg);

        if (arg.length === 0) return now;
        
        if (arg.length === 1) return new OriginalDate(arg[0]);

        if (arg.length === 2) return new OriginalDate(arg[0], arg[1]);

        if (arg.length === 3) return new OriginalDate(arg[0], arg[1], arg[2]);

        if (arg.length === 4) return new OriginalDate(arg[0], arg[1], arg[2], arg[3]);

        if (arg.length === 5) return new OriginalDate(arg[0], arg[1], arg[2], arg[3], arg[4]);

        if (arg.length === 6) return new OriginalDate(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5]);

        if (arg.length === 7) return new OriginalDate(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5], arg[6]);
      }
    );
    Date.now = jest.fn().mockReturnValue(now.valueOf());
    console.log(new Date());
     */
    MockDate.set('2020/6/14 14:00:00');
  });


  //let wrapper: ShallowWrapper;
  let props: any;
  /*
  beforeEach(() => {
    props = createTestProps({
      route: {}
    });
    wrapper = shallow(<CreateTaskScreen {...props} />);
  });
   */


  afterAll(() => {
    //spiedDate.mockRestore();
    MockDate.reset();
  });



  it("should render correctly without params", () => {
    props = createTestProps({
      route: {}
    });
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


//  it("should navigate to ScheduleScreen", () => {
//    const navigate = jest.spyOn(props.navigation, 'navigate');
//
//    /*
//    const simulateClick = async () => {
//      await wrapper.find('[data-test="create-button"]').simulate('click');
//      expect(navigate).toBeCalledWith('TaskList');
//    };
//
//    simulateClick();
//     */
//    /*
//    props = createTestProps({
//      tasks: tasks
//    });
//     */
//    props = createTestProps({
//      route: {
//        params: task
//      }
//    });
//
//    const wrapper: ShallowWrapper = shallow(<CreateTaskScreen {...props} />);
//    const buttons: ShallowWrapper = wrapper.find('[data-test="edit-button"]');
//    expect(buttons).toHaveLength(1);
//
//    buttons.at(0).simulate('press');
//
//    expect(navigate).toBeCalledWith(
//      'TaskList', expect.objectContaining({ task: task })
//    );
//  });
});
