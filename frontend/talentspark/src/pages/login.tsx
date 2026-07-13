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

        <div className="ts-auth-screen">
            <div className="ts-auth-box">
                <div className="ts-auth-mark">TS</div>

                <h1 className="ts-auth-heading">Welcome back</h1>
                <p className="ts-auth-sub">Sign in to your TalentSpark workspace.</p>

                {error && <div className="ts-auth-error">{error}</div>}

                <form className="ts-auth-form" onSubmit={handleSubmit}>
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
                        <div className="ts-auth-label-row">
                            <label className="ts-auth-label" htmlFor="password">Password</label>
                            <button className="ts-auth-forgot" type="button">Forgot password?</button>
                        </div>
                        <input
                            id="password"
                            className="ts-auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <div className="m-stripe" style={{ margin: "4px 0 16px" }} />
                    <button className="ts-auth-submit" type="submit" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="ts-auth-switch">
                    Don't have an account?{" "}
                    <button className="ts-auth-link" type="button" onClick={onSwitchToRegister}>
                        Create one
                    </button>
                </p>
            </div>

            <p className="ts-auth-footer">© 2026 TalentSpark. All rights reserved.</p>
        </div>
    )
}

export default Login;