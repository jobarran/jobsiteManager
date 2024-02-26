'use client'

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { createProject } from "@/actions";
import { useEffect, useState } from "react";
import { ProjectStatus } from "@/interfaces";
import { useCompanyStore } from "@/store";
import { getCompanyUsers } from "@/actions/company/get-company-users";

type FormInputs = {
    name: string;
    status: ProjectStatus;
    shortName: string;
    location: string;
    description: string;
    leaderId: string
}

type User = {
    id: string,
    name: string,
    lastName: string,
    role: string
}

export const RegisterProjectForm = () => {

    const activeCompanyProjects = useCompanyStore((state) => state.activeCompanyProjects)

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const resp = await getCompanyUsers()
                if (resp.ok) {
                    if (resp.users != undefined)
                        setUsers(resp.users);
                } else {
                    console.error("Error fetching users:", resp.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')
        if (activeCompanyProjects?.some(project => project.name === data.name)) {
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
                    type="text"
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
                <label htmlFor="shortName" className="block mb-2 text-sm font-medium text-gray-900">Project Short Name (4 characters max)</label>
                <input
                    type="text"
                    id="shortName"
                    placeholder="P01"
                    maxLength={4}
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('shortName', {
                        required: true,
                    })}
                />
            </div>
            <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Project Location</label>
                <input
                    type="text"
                    id="location"
                    placeholder="Location"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('location', {
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
                <label htmlFor="leaderId" className="block mb-2 text-sm font-medium text-gray-900">
                    Project Leader
                </label>
                {users && (
                    <select
                        id="leaderId"
                        className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
                        {...register("leaderId", {
                            required: true,
                        })}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} {user.lastName} ({user.role})
                            </option>
                        ))}
                    </select>
                )}
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
