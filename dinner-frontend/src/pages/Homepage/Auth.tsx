import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = `http://localhost:5000/${isSignup ? "register" : "login"}`; // Chắc chắn backend có route này

        try {
            const payload = isSignup ? { username, email, password } : { email, password };
            const { data } = await axios.post(url, payload);

            if (!isSignup) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username); // Lưu username
                alert("Đăng nhập thành công!");
                navigate("/");
            } else {
                alert("Đăng ký thành công! Hãy đăng nhập.");
                setIsSignup(false);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                alert("Lỗi: " + err.response.data.message);
            } else {
                alert("Lỗi: " + err);
            }
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
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {isSignup ? "Đăng ký" : "Đăng nhập"}
                </button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)} className="mt-2 text-blue-500">
                {isSignup ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
            </button>
        </div>
    );
}
