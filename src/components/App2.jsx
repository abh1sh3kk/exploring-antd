import "../styles/temp-global.css";
import ContactForm from "./ContactForm";
function App2() {
  return (
    <>
      <main>
        <section className="form-area">
          <div className="form-container--big">
            <ContactForm isSmall={false} />
          </div>
        </section>
      </main>
      <footer>
        <section className="form-container--small">
          <ContactForm isSmall={true} />
        </section>
      </footer>
    </>
  );
}

export default App2;
