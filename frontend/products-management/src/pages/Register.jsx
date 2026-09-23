import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 💡 Add your login / authentication logic here
        console.log("Form submitted:", { email, password });
        try {
            const response = await axios.post("http://localhost:3000/users/register", {
                email,
                password,
            });
            console.log("Register successful: ", response.data);
            alert("Register Successful!");
        } catch (error) {
            console.log("Register Error: ", error);
        }
    };

    return (
        <div className="register-wrapper">
            <form onSubmit={handleSubmit} className="register-card">
                <h2>Create Account</h2>

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
