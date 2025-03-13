'use client';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage('Utilisateur créé avec succès');
            setFormData({ name: '', email: '', password: '' });
        } else {
            setMessage(data.error || 'Erreur lors de la création');
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
                <button type="submit">S'inscrire</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
