'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/dashboard');
        } else {
            setMessage(data.error || 'Erreur de connexion');
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Mot de passe" value={credentials.password} onChange={handleChange} required />
                <button type="submit">Se connecter</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
