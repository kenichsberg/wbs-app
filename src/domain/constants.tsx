import { Dimensions } from 'react-native';
import { Moment } from 'moment';

const moment = require('moment');

// 定数
export const WINDOW_WIDTH: number = Dimensions.get('window').width;
export const WINDOW_HEIGHT: number = Dimensions.get('window').height;

export const PADDING_X = 20;
export const PADDING_Y = 30;

// グラフ領域のサイズ
export const CHART_WIDTH: number = WINDOW_WIDTH - PADDING_X * 2;
export const CHART_HEIGHT: number = WINDOW_HEIGHT - PADDING_Y * 2;

// １日あたりの幅
export const DAY_WIDTH: number = CHART_WIDTH / 7;

// 営業時間
export const OPEN_TIME = '09:00:00';
export const CLOSE_TIME = '18:00:00';

// 休憩時間
type Term = {
  start: string;
  end: string;
}
export const BREAK_TIMES: Array<Term> = [
  { start: '12:00:00', end: '13:00:00' }
];

// 祝日
export const PUBLIC_HOLIDAYS: Array<Moment> = [
  moment('2020-07-23'),
  moment('2020-07-24'),
];

// ユーザー設定の休日
export const ADDITIONAL_HOLIDAYS: Array<Moment> = [
  moment('2020-07-22'),
  moment('2020-07-27'),
];

// ユーザー設定の営業日
export const ADDITIONAL_WORKING_DAYS: Array<Moment> = [
  moment('2020-07-18'),
  moment('2020-07-19'),
];
