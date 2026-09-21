import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/users/register", {
                name,
                email,
                password,
            });

            console.log("Register successful:", response.data);
            alert("Registration Successful!");
            navigate("/");
        } catch (error) {
            console.log("Register Error:", error);
            alert("Registration Failed!");
        }
    };

    return (
        <div className="register-wrapper">
            <form onSubmit={handleSubmit} className="register-card">
                <h2>Create Account</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                </div>

                <button type="submit" className="register-btn">
                    Register
                </button>

                <p className="login-link">
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
