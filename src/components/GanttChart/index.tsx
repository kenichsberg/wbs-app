import * as React from 'react';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
//import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';
import { FormatTasks } from '/components/FormatTasks/';
import { getLeftEndDate, getRightEndDate, getWeekCount } from '/components/getTaskWidth/dateCounter'; 
import { GanttRow } from '/components/GanttRow/';
import { PartialTask } from '/screens/ScheduleScreen/';
import * as consts from './consts';
import { Moment } from 'moment';

const moment = require('moment');

type Props = {
  tasks: Array<PartialTask>;
};


export const GanttChart: React.FC<Props> = ({ tasks }) => {

  const { categories, tasksFormatted } = FormatTasks(tasks);

  const startDates: Array<Moment> = tasks.map(task => (
    moment(JSON.parse(task.startDatetimePlanned))
  ));

  const endDates: Array<Moment>  = tasks.map(task => (
    moment(JSON.parse(task.endDatetimePlanned))
  ));


  const now: Moment = moment();

  const leftEndDate: Moment = tasks.length === 0
    ? now.clone().subtract(now.day(), 'days')
    : getLeftEndDate(startDates); 

  const rightEndDate: Moment  = tasks.length === 0
    ? now.clone().add(6 - now.day(), 'days')
    : getRightEndDate(endDates); 

    const weekCount: number = getWeekCount(leftEndDate, rightEndDate) ?? 1;

  let ganttRowIndex: number = 0;


  // JSX
  return (
    <>
      <View style={{
        backgroundColor: '#051B26', 
        paddingLeft: consts.PADDING_X, 
        paddingRight: consts.PADDING_X, 
        paddingTop: consts.PADDING_Y, 
        paddingBottom: consts.PADDING_Y 
      }}>
        <ScrollView horizontal={true}>
          <Svg height="1300" width={ consts.WINDOW_WIDTH * weekCount }>
            {/* 縦線 */}
            { 
              [...Array(7 * weekCount).keys()].map(index => (
                <React.Fragment 
                  key={ leftEndDate.clone().add(index, 'days').format('MM/DD') }
                >
                  <Text 
                    x={ consts.DAY_WIDTH * index }
                    y="10" 
                    fill="white"
                  >
                    { leftEndDate.clone().add(index, 'days').format('MM/DD') }
                  </Text>
                  <Line 
                    x1={ consts.DAY_WIDTH * index } 
                    y1="20" 
                    x2={ consts.DAY_WIDTH * index } 
                    y2={ consts.CHART_HEIGHT } 
                    stroke="#3E6B57" 
                    strokeWidth="1" 
                  />
                </React.Fragment>
              ))
            }
            {
              <Line 
                x1={ consts.WINDOW_WIDTH * weekCount - consts.PADDING_X * 2 } 
                y1="20" 
                x2={ consts.WINDOW_WIDTH * weekCount - consts.PADDING_X * 2 } 
                y2={ consts.CHART_HEIGHT } 
                stroke="#3E6B57" 
                strokeWidth="1" 
              />
            }
            {/* Gantt */}
            {
              categories.map(category => (
                tasksFormatted[category].map(task => (
                  <GanttRow 
                    key={ task.id } 
                    task={ task } 
                    index={ ganttRowIndex++ } 
                    leftEndDate={ leftEndDate }
                  />
                ))
              ))
            }
          </Svg>
        </ScrollView>
      </View>
    </>
  );

}
