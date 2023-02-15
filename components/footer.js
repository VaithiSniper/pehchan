import styles from "../styles/Home.module.css"

export default function footer() {
  return (
    <>
      <footer className={styles.footer}>
        <em>
          Made with ❤️  by
          <a
            href="https://github.com/VaithiSniper"
            className="text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vaithi Sniper
          </a>
        </em>
      </footer>
    </>
  )
}
