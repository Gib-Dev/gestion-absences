import styles from '@/styles/Dashboard.module.css';
import { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineDownload } from 'react-icons/ai';

// initiation de l'API

export default function Dashboard() {
  const [user] = useState({ name: 'Severine Da silva' });
  const bulletins = [
    { month: 'décembre 2023' },
    { month: 'novembre 2023' },
    { month: 'octobre 2023' },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Menu</h2>
        <nav>
          <ul>
            <li className={styles.active}>Accueil</li>
            <li>Agenda</li>
            <li>Absences et congés</li>
            <li>Documents</li>
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Bonjour {user.name}</h1>
          <p>Bienvenue sur votre espace personnel</p>
        </header>

        <section className={styles.absences}>
          <button className={styles.absenceBtn}>+ Absence</button>
        </section>

        <section className={styles.compteurs}>
          <h3>Mes compteurs absences et congés</h3>
          <div className={styles.compteurGrid}>
            <div className={styles.compteur}><span>0</span><p>CP N-1</p></div>
            <div className={styles.compteur}><span>-2</span><p>CP N</p></div>
            <div className={styles.compteur}><span>2</span><p>RTT</p></div>
          </div>
        </section>

        <section className={styles.bulletins}>
          <h3>Mes derniers bulletins</h3>
          <ul>
            {bulletins.map((bulletin, index) => (
              <li key={index} className={styles.bulletinItem}>
                <FaFilePdf className={styles.pdfIcon} />
                Bulletin - {bulletin.month}
                <AiOutlineEye className={styles.icon} />
                <AiOutlineDownload className={styles.icon} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
