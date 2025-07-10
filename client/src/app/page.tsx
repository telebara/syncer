"use client";

import styles from "./page.module.css";
import { useAuth } from "./context/AuthContext";
import { Home, Auth, Sidebar } from "./components";

const Page = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>Загрузка...</main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {user && <Sidebar />}
      <main className={styles.main}>
        {user ? <Home user={user} /> : <Auth />}
      </main>
    </div>
  );
};

export default Page;
