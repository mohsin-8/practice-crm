import React from 'react';

const Register = () => {
    return (
        <div>
            <form>
                <input type='text' placeholder='Please Enter Full Name' />
                <input type='email' placeholder='Please Enter Email Address' />
                <input type='password' placeholder='Please Enter Password' />
                <input type='text' placeholder='Please Enter User Role' />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register;