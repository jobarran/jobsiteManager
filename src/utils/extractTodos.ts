import { Task, Todo } from "@/interfaces";

interface ExtendedTodo extends Todo {
    subTaskName: string;
    taskName: string
}

export const extractTodos = (tasks: Task[]): ExtendedTodo[] => {
    let todos: ExtendedTodo[] = [];

    // Check if tasks is not null or undefined
    if (tasks) {
        // Iterate through each task
        tasks.forEach(task => {
            // Check if task has subTasks
            if (task.subTasks && task.subTasks.length > 0) {
                // Iterate through subTasks
                task.subTasks.forEach(subTask => {
                    const subTaskName = subTask.name || ""; // Get subTask name, default to empty string if undefined
                    // Check if subTask has todos
                    if (subTask.todos && subTask.todos.length > 0) {
                        // Filter todos with favourite = true
                        const favoriteUndoneTodos = subTask.todos.filter(todo => todo.favourite && !todo.done);
                        // Iterate through filtered todos
                        favoriteUndoneTodos.forEach(todo => {
                            // Add todos to the todos array with subTaskName and taskName
                            todos.push({ ...todo, subTaskName, taskName: task.name });
                        });
                    }
                });
            }
        });
    }

    return todos;
};