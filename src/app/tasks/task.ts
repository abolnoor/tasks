export interface Task {
    id: number;
    description: string;
    sub_tasks: string[];
    created: Date;
    deadline: Date;
    categories: number[];
}
