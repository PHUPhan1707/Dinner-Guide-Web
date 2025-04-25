import React, { useState, useEffect } from 'react';
import twitterLogo from "@/assets/twitterlogo.png";
import fbLogo from "@/assets/fblogo.png";
import insLogo from "@/assets/inslogo.png";

const ContactUs: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const allFilled = firstName.trim() && lastName.trim() && email.trim() && subject.trim() && message.trim();
        setIsValid(!!allFilled);
    }, [firstName, lastName, email, subject, message]);

    // Set background color of body and html to match container
    useEffect(() => {
        document.body.style.backgroundColor = '#1e2328';
        document.documentElement.style.backgroundColor = '#1e2328';

        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Message sent!');
    };

    return (
        <div style={styles.container}>
            <div style={styles.infoSection}>
                <h1 className="text-5xl font-newsreader font-medium mt-2">Contact us</h1>
                <p className="text-gray-300 leading-relaxed">
                    For the first time, a dedicated platform brings together honest reviews, expert insights,
                    and exclusive features, all tailored for those who seek the most delightful meals in Ho Chi Minh
                    City.
                </p>
                <p className="text-2xl text-yellow-400 font-bonheur"><em>Phone</em></p>
                <p style={styles.detail}>+84 - 012 345 6789</p>
                <p className="text-2xl text-yellow-400 font-bonheur"><em>Email</em></p>
                <p style={styles.detail}>diningning@mail.com</p>
                <p className="text-gray-300 leading-relaxed">Follow us </p>
                <div className="flex space-x-6 mt-6">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                       className="hover:opacity-80 transition-opacity">
                        <img src={twitterLogo} alt="Twitter" className="h-6 md:h-8" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                       className="hover:opacity-80 transition-opacity">
                        <img src={fbLogo} alt="Facebook" className="h-6 md:h-8" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                       className="hover:opacity-80 transition-opacity">
                        <img src={insLogo} alt="Instagram" className="h-6 md:h-8" />
                    </a>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.formSection}>
                <h2 className="text-3xl font-newsreader font-medium mt-2">Send a message</h2>

                <label>Name *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First"
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last"
                        required
                        style={styles.input}
                    />
                </div>

                <label>Email *</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <label>Subject *</label>
                <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    required
                    style={styles.input}
                />

                <label>Comment or Message *</label>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    style={styles.textarea}
                />

                <button type="submit" disabled={!isValid} style={isValid ? styles.button : styles.disabledButton}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '40px',
        backgroundColor: '#1e2328',
        color: 'white',
        minHeight: '100vh',
        margin: "96px 0 0 0"
    },
    infoSection: {
        flex: '1',
        marginRight: '40px'
    },
    formSection: {
        backgroundColor: 'white',
        color: 'black',
        padding: '30px',
        borderRadius: '10px',
        flex: '1'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        height: '100px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    button: {
        backgroundColor: 'black',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        textDecoration: 'underline'
    },
    disabledButton: {
        backgroundColor: '#ccc',
        color: '#666',
        padding: '10px 20px',
        border: 'none',
        cursor: 'not-allowed',
        borderRadius: '5px'
    },
    label: {
        fontStyle: 'italic',
        color: '#ffb300',
        marginTop: '20px'
    },
    detail: {
        borderBottom: '1px solid #ffb300',
        paddingBottom: '5px',
        marginBottom: '10px',
        maxWidth: '250px',
        fontWeight: 'bold'
    },
};

export default ContactUs;
