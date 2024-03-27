import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"

import './LogIn.css'
import { getUser, login } from '../../services/userServices'
import { Navigate } from 'react-router-dom'

const LogIn = () => {
    const [formError, setFormError] = useState("")

    const schema = z.object({
        email: z.string().min(3),
        password: z.string().min(8, {message: "Password should have atleast 8 characters"})
    })
    

    const { register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(schema)})
    const [passwordVisible, setPasswordVisible] = useState(false)

    const showPassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    const Submit = async(formData) => {
        try {
            await login(formData)

            window.location = "/"
        } catch (err) {
            if(err.response && err.response.status === 400){
                setFormError(err.response.data.message)
            }
        }
    }

    if(getUser()){
        return <Navigate to="/" />
    }

    return (
        <div className='login'>
            <form className='loginForm' onSubmit={handleSubmit(Submit)}>
                <h3 className='text-center'>LogIn</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="form-control"
                        id="email"
                        placeholder='Enter email'
                    />
                    {errors.email && <em className='formErrors'>{errors.email.message}</em>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        {...register('password')}
                        type={passwordVisible ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        placeholder='Enter password'
                    />
                    {errors.password && <em className='formErrors'>{errors.password.message}</em>}
                </div>
                <div className="mb-3 form-check">
                    <input
                        onChange={showPassword}
                        type="checkbox"
                        className="form-check-input"
                        id="showPass"
                    />
                    <label className="form-check-label" htmlFor="showPass">Show Password</label>
                </div>

                {formError && <em style={{ color: 'red' }} className='text-center'>{formError}</em>}
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    )
}

export default LogIn
