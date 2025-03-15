import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Gestion Absences</div>
        <ul className={styles.navLinks}>
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Fonctionnalités</a></li>
          <li><a href="#">Contact</a></li>
          <li><button className={styles.loginButton}>Connexion</button></li>
        </ul>
      </nav>

      {/* Section Hero */}
      <header className={styles.hero}>
        <h1>Gérez vos absences facilement</h1>
        <p>Suivez et gérez vos absences en toute simplicité avec notre application.</p>
        <button className={styles.ctaButton}>Commencer</button>
      </header>

      {/* Section Infos */}
      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>Gestion simplifiée</h2>
          <p>Suivez les absences en temps réel et obtenez des statistiques détaillées.</p>
        </div>
        <div className={styles.feature}>
          <h2>Notifications instantanées</h2>
          <p>Recevez des rappels et alertes pour rester informé.</p>
        </div>
        <div className={styles.feature}>
          <h2>Accès sécurisé</h2>
          <p>Vos données sont protégées grâce à un système de sécurité avancé.</p>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className={styles.testimonials}>
        <h2>Ce que disent nos utilisateurs</h2>
        <div className={styles.testimonial}>
          <p>"L'application m'a permis de mieux gérer mes absences et d'éviter les oublis !"</p>
          <span>- Jean Dupont</span>
        </div>
        <div className={styles.testimonial}>
          <p>"Super intuitive et efficace pour le suivi des présences."</p>
          <span>- Marie Leclerc</span>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Gestion Absences. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

