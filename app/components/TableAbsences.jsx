'use client';
import { useEffect, useState } from 'react';

export default function TableAbsences() {
    const [absences, setAbsences] = useState([]);

    useEffect(() => {
        fetch('/api/absences')
            .then(res => res.json())
            .then(data => setAbsences(data));
    }, []);

    return (
        <div>
            <h3>Liste des absences</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Date</th>
                        <th>Raison</th>
                    </tr>
                </thead>
                <tbody>
                    {absences.map((absence, index) => (
                        <tr key={index}>
                            <td>{absence.name}</td>
                            <td>{absence.date}</td>
                            <td>{absence.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
