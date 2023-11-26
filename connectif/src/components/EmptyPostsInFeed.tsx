export default function EmptyPostsInFeed() {
  return (
    <section
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Nunito",
        marginTop: "30px",
      }}
    >
      <strong>
        <span>
          Ainda não temos nenhum post registrado! Seja o primeiro a compartilhar
          uma recordação!
        </span>
      </strong>
    </section>
  );
}
