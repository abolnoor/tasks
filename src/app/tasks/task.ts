export interface Task {
    id: number;
    description: string;
    sub_tasks: string[];
    created: string;
    deadline: string;
    categories: number[];
    location: {latidute: number, longidute: number};
}
