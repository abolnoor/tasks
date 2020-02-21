export interface Task {
    id: number;
    description: string;
    sub_tasks: string[];
    created: string;
    deadline: string;
    categories: any[];
    location: {latitude: number, longitude: number};
}
