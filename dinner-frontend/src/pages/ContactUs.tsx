import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';

const ContactUs = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const allFilled = firstName.trim() && lastName.trim() && email.trim() && subject.trim() && message.trim();
        setIsValid(!!allFilled);
    }, [firstName, lastName, email, subject, message]);

    useEffect(() => {
        document.body.style.backgroundColor = '#1e2328';
        document.documentElement.style.backgroundColor = '#1e2328';

        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setSubject('');
            setMessage('');
        }, 3000);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between p-6 md:p-10 bg-gray-900 text-white min-h-screen mt-24">
            <div className="lg:w-2/5 mb-10 lg:mb-0 lg:mr-12 animate-fadeIn">
                <div className="relative mb-8">
                    <h1 className="text-5xl font-newsreader font-medium">Contact us</h1>
                    <div className="absolute -bottom-3 left-0 h-1 w-24 bg-yellow-400"></div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                    <div className="flex items-center mb-6">
                        <div className="bg-yellow-500 p-3 rounded-full mr-4">
                            <Phone size={20} className="text-gray-900" />
                        </div>
                        <div>
                            <p className="text-lg text-yellow-400 font-bonheur mb-1"><em>Phone</em></p>
                            <p className="font-medium text-white">+84 - 012 345 6789</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="bg-yellow-500 p-3 rounded-full mr-4">
                            <Mail size={20} className="text-gray-900" />
                        </div>
                        <div>
                            <p className="text-lg text-yellow-400 font-bonheur mb-1"><em>Email</em></p>
                            <p className="font-medium text-white">diningning@mail.com</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-gray-300 mb-4 font-medium">Follow us on social media</p>
                    <div className="flex space-x-4">
                        <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                            <Twitter size={20} className="text-yellow-400" />
                        </a>
                        <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                            <Facebook size={20} className="text-yellow-400" />
                        </a>
                        <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                            <Instagram size={20} className="text-yellow-400" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="lg:w-3/5 animate-fadeIn">
                <div className="bg-white text-gray-900 p-8 rounded-lg shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                                <Send size={32} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-medium mb-2">Message Sent!</h2>
                            <p className="text-gray-600 text-center">Thank you for reaching out. We'll get back to you soon.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center mb-6">
                                <h2 className="text-3xl font-newsreader font-medium">Send a message</h2>
                                <div className="ml-4 h-px flex-grow bg-gray-200"></div>
                            </div>

                            <div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                placeholder="First"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                                placeholder="Last"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={e => setSubject(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment or Message <span className="text-red-500">*</span></label>
                                    <textarea
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!isValid}
                                    className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 ${isValid ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                >
                                    Send Message
                                    {isValid && <ArrowRight size={18} className="ml-2" />}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;