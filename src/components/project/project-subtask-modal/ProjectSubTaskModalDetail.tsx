'use client'

import { ProjectSubTaskModalHeader, ProjectSubTaskRangeValue, ProjectSubTaskToDo } from "@/components";
import { useProjectStore } from "@/store";
import { useEffect, useState } from "react";
import { updateSubTask } from '../../../actions/task/update-subtask';
import { SubTask } from "@/interfaces";
import { createOrUpdateTodosBySubTask } from "@/actions";

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

    useEffect(() => {
        setProgressValue(parseInt(subTaskModalData ? subTaskModalData?.progress : '0'))
    }, [subTaskModalData])
    
    const updateProjectSubTask = (updatedSubTask: SubTask) => {
        if (activeProjectTasks) {
            const updatedProjectTasks = activeProjectTasks.map(task => {
                if (task.id === activeTaskId) {
                    const updatedSubTasks = task.subTasks.map(subtask => {
                        if (subtask.id === updatedSubTask.id) {
                            return updatedSubTask; // Update the specific subtask
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
        if (subTaskModalData) {
            setSubTaskModalEditableFalse()
            const updatedSubTask = {
                ...subTaskModalData,
                progress: progressValue.toString(),
                todos: todos
            };
            updateSubTask(updatedSubTask, activeTaskId);
            createOrUpdateTodosBySubTask(todos, activeSubTaskId)
            updateProjectSubTask(updatedSubTask)
            closeSubTaskModal()
        }
    }
    

    return (
        <div>
            <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600">
                <ProjectSubTaskModalHeader
                    handleSaveSubTaskModal={handleSaveSubTaskModal}
                />
            </div>
            <ProjectSubTaskRangeValue
                progressValue={progressValue}
                setProgressValue={setProgressValue}
            />
            <ProjectSubTaskToDo
                todos={todos}
                setTodos={setTodos}
            />
        </div>
    );
};