import { Task } from './task';

export const TasksData: Task[] = [
    {
        id: 1,
        description: 'test task',
        sub_tasks: ['sub task1', 'sub task 2'],
        created: new Date().toDateString(),
        deadline: new Date().toDateString(),
        location: {latitude: 33.5090536, longitude: 36.2798887},
        categories: [1, 2, 3]
    },
    {
        id: 2,
        description: 'test task 2',
        sub_tasks: ['sub task11', 'sub task 22'],
        created: new Date().toDateString(),
        deadline: new Date().toDateString(),
        location: {latitude: 33.5090536, longitude: 36.2798887},
        categories: [1]
    }
];
