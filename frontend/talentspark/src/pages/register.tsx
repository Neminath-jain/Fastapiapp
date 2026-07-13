import { useState } from "react";
import { register } from "../Services/AuthService";

type Props = {
    onSwitchToLogin: () => void;
}

function Register({ onSwitchToLogin }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register({ name, email, password, role });
            onSwitchToLogin();
        } catch (error) {
            console.error("Error during registration:", error);
            setError("Registration failed. Please check your details and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="ts-auth-screen">
            <div className="ts-auth-box">
                <div className="ts-auth-mark">TS</div>

                <h1 className="ts-auth-heading">Create your account</h1>
                <p className="ts-auth-sub">Set up your workspace to start managing hires.</p>

                {error && <div className="ts-auth-error">{error}</div>}

                <form className="ts-auth-form" onSubmit={handleSubmit}>
                    <div className="ts-auth-field">
                        <label className="ts-auth-label" htmlFor="name">Full name</label>
                        <input
                            id="name"
                            className="ts-auth-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="ts-auth-field">
                        <label className="ts-auth-label" htmlFor="email">Email address</label>
                        <input
                            id="email"
                            className="ts-auth-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="ts-auth-field">
                        <label className="ts-auth-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="ts-auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="ts-auth-field">
                        <label className="ts-auth-label" htmlFor="role">Role</label>
                        <select
                            id="role"
                            className="ts-auth-input ts-auth-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="hiring_manager">Hiring Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="m-stripe" style={{ margin: "4px 0 16px" }} />
                    <button className="ts-auth-submit" type="submit" disabled={loading}>
                    
                        {loading ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <p className="ts-auth-switch">
                    Already have an account?{" "}
                    <button className="ts-auth-link" type="button" onClick={onSwitchToLogin}>
                        Sign in
                    </button>
                </p>
            </div>

            <p className="ts-auth-footer">© 2026 TalentSpark. All rights reserved.</p>
        </div>
    )
}

export default Register;