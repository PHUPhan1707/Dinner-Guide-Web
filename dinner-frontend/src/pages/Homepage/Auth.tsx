import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "@/api/UserApi";

export default function Auth() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignup) {
                await registerUser(username, email, password);
                alert("Đăng ký thành công! Hãy đăng nhập.");
                setIsSignup(false);
            } else {
                const { data } = await loginUser(email, password);
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.user.username);
                alert("Đăng nhập thành công!");
                navigate("/");
            }
        } catch (err: any) {
            alert("Lỗi: " + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold">{isSignup ? "Đăng ký" : "Đăng nhập"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                {isSignup && (
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2"
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? "Đang xử lý..." : (isSignup ? "Đăng ký" : "Đăng nhập")}
                </button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)} className="mt-2 text-blue-500">
                {isSignup ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
            </button>
        </div>
    );
}
