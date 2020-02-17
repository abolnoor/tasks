import { Task } from './task';

export const TasksData: any[] = [

    {
        id: 1,
        description: 'test task',
        sub_tasks: ['sub task1', 'sub task 2'],
        created: new Date().toDateString(),
        deadline: new Date().toDateString(),
        categories: [
            {
                id: 1,
                name: 'cat1',
                color: 'blue'
            },
            {
                id: 2,
                name: 'cat2',
                color: 'red'
            },
            {
                id: 3,
                name: 'cat3',
                color: 'green'
            }
        ]
    },
    {
        id: 2,
        description: 'test task 2',
        sub_tasks: ['sub task11', 'sub task 22'],
        created: new Date().toDateString(),
        deadline: new Date().toDateString(),
        categories: [
            {
                id: 1,
                name: 'cat1',
                color: 'blue'
            }
        ]
    }
];
