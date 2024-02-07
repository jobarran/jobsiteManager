'use client'

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { createProject } from "@/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectStatus } from "@/interfaces";
import { useCompanyStore } from "@/store";
import { useSession } from "next-auth/react";

type FormInputs = {
    name: string;
    status: ProjectStatus;
    description: string
}

export const RegisterProjectForm = () => {

    const { data: session } = useSession()
    const activeCompany = useCompanyStore((state) => state.activeCompany)
    const existingProjects = activeCompany.projects

    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')
        if ( activeCompany.projects.some(project => project.name === data.name ) ) {
            console.log('exist')
            setErrorMessage('You already have a project with this name')
        }

        const resp = await createProject(data)

        if (!resp.ok) {
            setErrorMessage('Cannot create project')
            return
        }
        window.location.replace('/project')
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Project Name</label>
                <input
                    type="name"
                    id="name"
                    placeholder="Project 01"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('name', {
                        required: true,
                    })
                    }
                />
            </div>
            <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Select project status</label>
                <select
                    // type="status"
                    id="status"
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
                    {...register('status', {
                        required: true,
                    })}
                >
                    <option value="ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Project description</label>
                <textarea 
                    rows={3}
                    id="description"
                    placeholder="Description..."
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block p-2.5 w-full text-sm "   
                    {...register('description')}
                ></textarea>
            </div>


            <button
                type="submit"
                className="btn-login"
            >
                Create
            </button>
        </form>

    )
}
