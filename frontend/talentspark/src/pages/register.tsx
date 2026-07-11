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
        <div className="auth-screen">
            <div className="auth-box">
                <div className="auth-mark">TS</div>

                <h1 className="auth-heading">Create your account</h1>
                <p className="auth-sub">Set up your workspace to start managing hires.</p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="name">Full name</label>
                        <input
                            id="name"
                            className="auth-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="email">Email address</label>
                        <input
                            id="email"
                            className="auth-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="role">Role</label>
                        <select
                            id="role"
                            className="auth-input auth-select"
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

                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <button className="auth-link" type="button" onClick={onSwitchToLogin}>
                        Sign in
                    </button>
                </p>
            </div>

            <p className="auth-footer">© 2026 TalentSpark. All rights reserved.</p>
        </div>
    )
}

export default Register;