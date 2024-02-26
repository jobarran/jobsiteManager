'use client'

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "@/actions";
import { useState } from "react";
import { useCompanyStore } from "@/store";

type FormInputs = {
    name: string,
    lastName: string,
    email: string,
    password: string,
    image: string
}

export const RegisterUserForm = () => {

    const activeCompanyUsers = useCompanyStore((state) => state.activeCompanyUsers)

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        
        const { name, lastName, email, password } = data

        setErrorMessage('')
        if (activeCompanyUsers?.some(user => user.email === email)) {
            console.log('exist')
            setErrorMessage('You already have a user with this email')
        }


        const resp = await registerUser({
            name,
            lastName,
            email,
            password,
            role: 'user'
        })

        if (!resp.ok) {
            setErrorMessage(resp.message)
            return
        }
           
        window.location.replace('/admin')
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">User Name</label>
                <input
                    type="name"
                    id="name"
                    placeholder="John"
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
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">User Last Name</label>
                <input
                    type="lastName"
                    id="lastName"
                    placeholder="Doe"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('lastName', {
                        required: true,
                    })
                    }
                />
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">User Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="jdoe@companyname.com"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })
                    }
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">User Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('password', { required: true, minLength: 6 })}
                />
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
