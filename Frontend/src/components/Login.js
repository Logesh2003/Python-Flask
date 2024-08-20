import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/logo.png';
import '../components/Login.css';

function LoginForm() {
    const [validated, setValidated] = useState(false);
    const [userName, setUserName] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        userName: userName,
                        password: password,
                    }),
                });

                if (response.ok) {
                    const result = await response.text();
                    if (result === 'Login successful') {
                        navigate('/employees'); 
                    } else {
                        alert('Invalid username or password.');
                    }
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again later.');
            }
        }
        setValidated(true);
    };

    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <div className="login-container text-center">
                <img src={img1} alt="Login" className="login-logo" />
                <div className="card p-4">
                    <h5 className="card-title mb-2">Login</h5>
                    <p className="card-subtitle mb-4">Access to our dashboard</p>
                    <form
                        className={`needs-validation ${validated ? 'was-validated' : ''}`}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3 text-start">
                            <label htmlFor="validationCustomUsername" className="form-label">Username</label>
                            <input
                                type="email"
                                className="form-control"
                                id="validationCustomUsername"
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter your username.
                            </div>
                        </div>
                        <div className="mb-3 text-start">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="validationCustomPassword" className="form-label">Password</label>
                            </div>
                            <input
                                type="password"
                                className="form-control"
                                id="validationCustomPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                            />
                            <div className="invalid-feedback">
                                Password must be at least 6 characters long.
                            </div>
                        </div>
                        <button type="submit" className="btn btn-gradient btn-large w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default LoginForm;
