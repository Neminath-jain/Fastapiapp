import { useState } from "react";
import { login } from "../Services/AuthService";

type Props = {
    onLogin: (token: string) => void;
    onSwitchToRegister: () => void;
}

function Login({ onLogin, onSwitchToRegister }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await login({ email, password });
            onLogin(response.access_token);
        } catch (error) {
            console.error("Error during login:", error);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-screen">
            <div className="auth-box">
                <div className="auth-mark">TS</div>

                <h1 className="auth-heading">Sign in to TalentSpark</h1>
                <p className="auth-sub">Enter your credentials to access your workspace.</p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
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
                        <div className="auth-label-row">
                            <label className="auth-label" htmlFor="password">Password</label>
                            <button className="auth-forgot" type="button">Forgot?</button>
                        </div>
                        <input
                            id="password"
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <button className="auth-link" type="button" onClick={onSwitchToRegister}>
                        Create one
                    </button>
                </p>
            </div>

            <p className="auth-footer">© 2026 TalentSpark. All rights reserved.</p>
        </div>
    )
}

export default Login;