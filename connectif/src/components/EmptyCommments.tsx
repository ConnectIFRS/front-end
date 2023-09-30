import styles from "../../styles/emptycomments.module.scss";
export default function EmptyComments() {
  return (
    <div className={styles.emptyComments}>
      <p>
        Este post está ansioso para ouvir a sua opinião! Ainda não temos nenhum
        comentário.
      </p>
      <p>
        Seja o primeiro a compartilhar seus pensamentos e fazer parte da
        conversa.
      </p>
    </div>
  );
}
