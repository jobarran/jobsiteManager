'use client'

import { ProjectSubTaskModalHeader, ProjectSubTaskRangeValue, ProjectSubTaskToDo } from "@/components";
import { useProjectStore } from "@/store";
import { useEffect, useState } from "react";
import { updateSubTask } from '../../../actions/task/update-subtask';
import { SubTask, Todo } from "@/interfaces";
import { createOrUpdateTodosBySubTask, deleteTodoById } from "@/actions";

export const ProjectSubTaskModalDetail = () => {

    const setSubTaskModalEditableFalse = useProjectStore(state => state.setSubTaskModalEditableFalse)
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const activeTaskId = useProjectStore(state => state.activeTaskId)
    const activeSubTaskId = useProjectStore(state => state.activeSubTaskId)
    const setProjectTasks = useProjectStore(state => state.setProjectTasks)
    const closeSubTaskModal = useProjectStore(state => state.closeSubTaskModal)

    const subTaskModalData = activeProjectTasks
        ?.find(task => task.id === activeTaskId)
        ?.subTasks.find(subtask => subtask.id === activeSubTaskId);

    const [progressValue, setProgressValue] = useState(parseInt(subTaskModalData ? subTaskModalData?.progress : '0'));
    const [todos, setTodos] = useState(subTaskModalData ? subTaskModalData?.todos : [])
    const [modifiedTodos, setModifiedTodos] = useState<Todo[]>([])
    const [deletedTodos, setDeletedTodos] = useState<string[]>([])

    useEffect(() => {
        console.log(deletedTodos)
    }, [deletedTodos])

    useEffect(() => {
        setProgressValue(parseInt(subTaskModalData ? subTaskModalData?.progress : '0'))
        setTodos(subTaskModalData ? subTaskModalData?.todos : [])
    }, [subTaskModalData])

    const updateProjectSubTask = (updatedSubTask: SubTask) => {
        if (activeProjectTasks) {
            const updatedProjectTasks = activeProjectTasks.map(task => {
                if (task.id === activeTaskId) {
                    const updatedSubTasks = task.subTasks.map(subtask => {
                        if (subtask.id === updatedSubTask.id) {
                            return updatedSubTask;
                        }
                        return subtask;
                    });
                    return { ...task, subTasks: updatedSubTasks };
                }
                return task;
            });
            setProjectTasks(updatedProjectTasks);
        }
    };

    const handleSaveSubTaskModal = () => {
        if (subTaskModalData && todos) {
            setSubTaskModalEditableFalse()
            const updatedSubTask = {
                ...subTaskModalData,
                progress: progressValue.toString(),
                todos: todos
            };
            updateSubTask(updatedSubTask, activeTaskId);
            updateProjectSubTask(updatedSubTask)
            createOrUpdateTodosBySubTask(modifiedTodos, activeSubTaskId)
                .then(() => {
                    setModifiedTodos([]);
                    setDeletedTodos([]);
                })
            deleteTodoById(deletedTodos)
                .then(() => {
                    setDeletedTodos([]);
                })
            closeSubTaskModal()

        }
    }


    return (
        <div>
            <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600">
                <ProjectSubTaskModalHeader
                    handleSaveSubTaskModal={handleSaveSubTaskModal}
                    setDeletedTodos={setDeletedTodos}
                />
            </div>
            <ProjectSubTaskRangeValue
                progressValue={progressValue}
                setProgressValue={setProgressValue}
            />
            <ProjectSubTaskToDo
                todos={todos ? todos : []}
                setTodos={setTodos}
                modifiedTodos={modifiedTodos}
                setModifiedTodos={setModifiedTodos}
                setDeletedTodos={setDeletedTodos}
                deletedTodos={deletedTodos}
            />
        </div>
    );
};