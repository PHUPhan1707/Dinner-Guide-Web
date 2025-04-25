import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, verifyEmail } from "@/api/UserApi";
import loginBg from "@/assets/login-bg.jpg";

export default function Auth() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignup) {
                const response = await registerUser(username, email, password);
                if (response.data.requiresVerification) {
                    setShowVerification(true);
                    alert(response.data.message);
                }
            } else {
                const { data } = await loginUser(email, password);
                if (data.requiresVerification) {
                    setShowVerification(true);
                    alert(data.message);
                    return;
                }
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.user.username);
                alert("Successfully log in!");
                navigate("/");
            }
        } catch (err: any) {
            alert("Error: " + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await verifyEmail(email, verificationCode);
            alert("Email verified successfully! Please log in.");
            setShowVerification(false);
            setIsSignup(false);
            setVerificationCode("");
        } catch (err: any) {
            alert("Error: " + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center">
            {/* Background Image */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `url(${loginBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            
            {/* Glass Effect Container */}
            <div className="relative w-full max-w-[400px] mx-4">
                <div className="backdrop-blur-md bg-black/40 p-12 rounded-lg shadow-lg border border-white/20 min-h-[420px] flex flex-col">
                    {/* Form Header */}
                    <h1 className="text-4xl font-[Newsreader] text-white text-center mb-10">
                        {showVerification ? "Verify Email" : (isSignup ? "Sign Up" : "Login")}
                    </h1>
                    
                    {/* Auth Form */}
                    {showVerification ? (
                        <form onSubmit={handleVerification} className="space-y-6 flex-grow flex flex-col">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Verification Code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-full pb-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors font-[Inter] font-normal"
                                    required
                                />
                            </div>

                            <div className="flex-grow"></div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white hover:bg-white/90 text-black font-[Newsreader] py-3 px-4 rounded-full transition-colors duration-200 disabled:opacity-50"
                            >
                                {isLoading ? "Processing..." : "Verify Email"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
                            {isSignup && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pb-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors font-[Inter] font-normal"
                                        required
                                    />
                                </div>
                            )}
                            
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pb-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors font-[Inter] font-normal"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pb-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors font-[Inter] font-normal"
                                    required
                                />
                            </div>

                            <div className="flex-grow"></div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white hover:bg-white/90 text-black font-[Newsreader] py-3 px-4 rounded-full transition-colors duration-200 disabled:opacity-50"
                            >
                                {isLoading ? "Processing..." : (isSignup ? "Sign Up" : "Login")}
                            </button>
                        </form>
                    )}

                    {/* Toggle Auth Mode */}
                    {!showVerification && (
                        <button 
                            onClick={() => setIsSignup(!isSignup)} 
                            className="mt-4 text-white/90 hover:text-white transition-colors w-full text-center font-[Inter] font-normal"
                        >
                            {isSignup 
                                ? "Already have an account? Login" 
                                : <span>Don't have an account? <span className="text-white">Register</span></span>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
