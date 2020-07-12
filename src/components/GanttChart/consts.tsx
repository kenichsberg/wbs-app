import { Dimensions } from 'react-native';

// 定数
export const WINDOW_WIDTH: number = Dimensions.get('window').width;
export const WINDOW_HEIGHT: number = Dimensions.get('window').height;

export const PADDING_X: number = 20;
export const PADDING_Y: number = 30;

// グラフ領域のサイズ
export const CHART_WIDTH: number = WINDOW_WIDTH - PADDING_X * 2;
export const CHART_HEIGHT: number = WINDOW_HEIGHT - PADDING_Y * 2;

// １日あたりの幅
export const DAY_WIDTH: number = CHART_WIDTH / 7;

// 左端日付
export const ORIGIN_DATE: Date = new Date();

// 営業時間
export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 18;

// 休憩時間
type Term = {
  start: number;
  end: number;
}
export const BREAK_TIMES: Array<Term> = [
  {start: 12, end: 13}
];