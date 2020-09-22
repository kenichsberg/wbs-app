import * as React from 'react';
import { Task } from '/domain/Task/';

type Tasks = Array<Task>;

type AppState = {
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
};


type Props = {
  children: React.ReactNode 
};


const InitialState = {
  tasks: [],
  setTasks: (() => [])
};


export const AppStateContext = React.createContext<AppState>(InitialState);


export const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = React.useState<Tasks>([]);

  return (
    <AppStateContext.Provider value={{ tasks, setTasks }}>
      { children }
    </AppStateContext.Provider>
  );
};

