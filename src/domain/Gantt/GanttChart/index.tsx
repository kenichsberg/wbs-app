import * as React from 'react';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { View  } from 'native-base';
import Svg, { Line, Text } from 'react-native-svg';
import { getFormattedTasks } from '/domain/Task/';
import { parseJsonToMoment } from '/services/Date/'; 
import { getLeftEndDate, getRightEndDate, getWeekCount } from '/services/Gantt/'; 
import { GanttRow } from '/domain/Gantt/GanttRow/';
import { Task } from '/domain/Task/';
import * as constants from '/domain/constants';
import { Moment } from 'moment';

const moment = require('moment');

type Props = {
  tasks: Array<Task>;
};


export const GanttChart: React.FC<Props> = ({ tasks }) => {

  const { categories, tasksFormatted } = getFormattedTasks(tasks);

  const startDates: Array<Moment> = tasks.map(task => (
    parseJsonToMoment(task.startDatetimePlanned)
  ));

  const endDates: Array<Moment>  = tasks.map(task => (
    parseJsonToMoment(task.startDatetimePlanned)
  ));


  const now: Moment = moment();

  const leftEndDate: Moment = tasks.length === 0
    ? now.clone().subtract(now.day(), 'days')
    : getLeftEndDate(startDates); 

  const rightEndDate: Moment  = tasks.length === 0
    ? now.clone().add(6 - now.day(), 'days')
    : getRightEndDate(endDates); 

    const weekCount: number = getWeekCount(leftEndDate, rightEndDate) ?? 1;

  let ganttRowIndex = 0;


  // JSX
  return (
    <>
      <View style={{
        backgroundColor: '#051B26', 
        paddingLeft: constants.PADDING_X, 
        paddingRight: constants.PADDING_X, 
        paddingTop: constants.PADDING_Y, 
        paddingBottom: constants.PADDING_Y 
      }}>
        <ScrollView horizontal={true}>
          {/*<Svg height="1300" width={ constants.WINDOW_WIDTH * weekCount }>*/}
          <Svg height="1300" width={ (constants.WINDOW_WIDTH - constants.PADDING_X * 2) * weekCount }>
            {/* 縦線 */}
            { 
              [...Array(7 * weekCount).keys()].map(index => (
                <React.Fragment 
                  key={ leftEndDate.clone().add(index, 'days').format('MM/DD') }
                >
                  <Text 
                    x={ constants.DAY_WIDTH * index }
                    y="10" 
                    fill="white"
                  >
                    { leftEndDate.clone().add(index, 'days').format('MM/DD') }
                  </Text>
                  <Line 
                    x1={ constants.DAY_WIDTH * index } 
                    y1="20" 
                    x2={ constants.DAY_WIDTH * index } 
                    y2={ constants.CHART_HEIGHT } 
                    stroke="#3E6B57" 
                    strokeWidth="1" 
                  />
                </React.Fragment>
              ))
            }
            {
              <Line 
                x1={ (constants.WINDOW_WIDTH - constants.PADDING_X * 2) * weekCount } 
                y1="20" 
                x2={ (constants.WINDOW_WIDTH - constants.PADDING_X * 2) * weekCount } 
                y2={ constants.CHART_HEIGHT } 
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
