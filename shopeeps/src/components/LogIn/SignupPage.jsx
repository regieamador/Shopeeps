import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"

import "./SignupPage.css"
import userrr from "/user.webp"
import { getUser, signup } from '../../services/userServices';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
    const [profilePict, setProfilePict] = useState(null)
    const [formError, setFormError] = useState("")


    const schema = z.object({
        name: z.string().min(3, {message: "name should have 3 characters"}),
        email: z.string().email({message: "Invalid email"}),
        password: z.string().min(8, {message: "password should have atleast 8 characters"}),
        confirmPassword: z.string({message: "password does not match"}),
        address: z.string().min(15, {message: "address should have atleast 15 characters"})
    }).refine(data => data.password === data.confirmPassword, {
        path: ["confirmPassword"]
    })

    const onSubmit = async(formData) => {
        // setUsers(prev => [formData, ...prev])
        try {
            await signup(formData, profilePict) 

            window.location = "/"
        } catch (err) {
            if(err.response && err.response.status === 400){
                setFormError(err.response.data.message)
            }
        }
    }

    const {register, handleSubmit, formState : {errors}} = useForm({resolver: zodResolver(schema)})

    if(getUser()){
        return <Navigate to="/" />
    }

    return (        
        <div className='signup'>
            <form className='signupForm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='text-center'>Sign Up</h3>
                <div className="profile">
                    <img src={profilePict ? URL.createObjectURL(profilePict) : userrr} className="profilePic"/>
                    <label htmlFor="imageUpload">Upload Image</label>
                    <input type="file" id="imageUpload" onChange={e => setProfilePict(e.target.files[0])}/>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <div className="inputDiv">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            {...register('name')}
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder='Enter your name'
                        />
                        {errors.name && <em className='formErrors'>{errors.name.message}</em>}
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder='Enter your email address'
                        />
                        {errors.email && <em className='formErrors'>{errors.email.message}</em>}
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <div className="inputDiv">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            {...register('password')}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder='Enter your password'
                        />
                        {errors.password && <em className='formErrors'>{errors.password.message}</em>}
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder='Enter confirm password'
                        />
                        {errors.confirmPassword && <em className='formErrors'>{errors.confirmPassword.message}</em>}
                    </div>
                </div>

                <div className="textarea">
                    <label htmlFor="address">Delivery Address</label>
                    <textarea
                        {...register('address')}
                        className="form-control" placeholder="Enter delivery address" id="address" rows={4}></textarea>
                        {errors.address && <em className='formErrors'>{errors.address.message}</em>}
                        {formError && <em style={{ color: 'red' }} className='text-center'>{formError}</em>}
                    <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">Submit</button>
                </div>
                    
            </form>
        </div>
    );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
