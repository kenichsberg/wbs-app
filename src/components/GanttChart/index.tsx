import * as React from 'react';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { Container, Segment, Content, View, Body, Right, Button, List, ListItem, Separator, Icon, Fab } from 'native-base';
import moment from 'moment';
import Svg, { Line, Text } from 'react-native-svg';
import { FormatTasks } from '/components/FormatTasks/';
import { GanttRow } from '/components/GanttRow/';
import { PartialTask } from '/screens/ScheduleScreen/';
import * as consts from './consts';

type Props = {
  tasks: Array<PartialTask>;
};


export const GanttChart: React.FC<Props> = ({ tasks }) => {

  const { categories, tasksFormatted } = FormatTasks(tasks);

  let i: number = 0;

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
          <Svg height="1300" width={ consts.WINDOW_WIDTH * 2 }>
            {/* 縦線 */}
            { 
              [...Array(16).keys()].map(i => (
                <Line 
                  key={i}
                  x1={ consts.DAY_WIDTH * i } 
                  y1="0" 
                  x2={ consts.DAY_WIDTH * i } 
                  y2={ consts.CHART_HEIGHT } 
                  stroke="#3E6B57" 
                  strokeWidth="1" 
                />
              ))
            }
            {/* Gantt */}
            {
              categories.map(category => (
                tasksFormatted[category].map((task, taskIndex) => (
                  <GanttRow 
                    key={category + taskIndex} 
                    task={task} 
                    index={i++} 
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
