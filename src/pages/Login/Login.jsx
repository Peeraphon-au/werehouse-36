import { useRef } from 'react';
import Form from 'react-bootstrap/Form';

import { verifyUser } from "../../data/user";

import './Login.css';

function Login({ setToken, setRole }) {
    const userRef = useRef();
    const passRef = useRef();

    return (
        <div className="login-container">
            <span className='d-flex align-items-center badge bg-dark '>
                <Form.Label htmlFor="username" className='badge bg-dark user-text fs-6'><i class="bi bi-person"></i>&nbsp;Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    placeholder='Enter username'
                    style={{ textAlign: 'center' }}
                    ref={userRef}
                />
            </span>
            <span className='d-flex align-items-center badge bg-dark mt-3'>
                <Form.Label htmlFor="password" className='badge bg-dark user-text fs-6'><i class="bi bi-key"></i>&nbsp;Password&nbsp;</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder='Enter password'
                    style={{ textAlign: 'center' }}
                    ref={passRef}
                />
            </span>
            <div className='d-flex justify-content-center mt-3'>
                <button className='btn btn-danger me-5' onClick={() => { userRef.current.value = ''; passRef.current.value = ''; userRef.current.focus() }}>Clear</button>
                <button className='btn btn-success'
                    onClick={() => {
                        const username = userRef.current.value.trim()
                        const password = passRef.current.value.trim()
                        userRef.current.value = ''
                        passRef.current.value = ''
                        const userInfo = verifyUser(username, password)
                        if (userInfo === null) {
                            alert('Wrong username or password')
                            userRef.current.focus()
                        } else {
                            setToken(userInfo.token)
                            setRole(userInfo.role)
                        }
                    }}>Login</button>
            </div>
        </div>
    );
}

export default Login;