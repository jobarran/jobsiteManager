import { SubTask, Task, Todo } from "@/interfaces";


interface ExtendedTodo extends Todo {
    subTaskName: string;
    taskName: string
}

const findTaskNameById = (taskId: string, tasks: Task[]): string => {
    const foundTask = tasks.find(task => task.id === taskId);
    return foundTask ? foundTask.name : ""
}

export const getAllTodos = (activeProjectTasks: Task[] | null): ExtendedTodo[] => {
    let allTodos: ExtendedTodo[] = [];

    if (!activeProjectTasks) {
        return allTodos;
    }
    activeProjectTasks.forEach((task:Task) => {
        task.subTasks.forEach((subTask:SubTask) => {
            if (subTask.todos) {
                subTask.todos.forEach(todo => {
                    const taskName = findTaskNameById(subTask.taskId, activeProjectTasks);
                    const todoWithSubtaskName: ExtendedTodo = {
                        ...todo,
                        subTaskName: subTask.name,
                        taskName: taskName
                    };
                    allTodos.push(todoWithSubtaskName);
                });
            }
        });
    });

    return allTodos;
}