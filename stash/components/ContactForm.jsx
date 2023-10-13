import "../styles/form.css";

function ContactForm({isSmall}) {
  const size = isSmall ? "small" : "big"; 
  return (
        <form className={`contact-form contact-form--${size}`}>

          <h2 className={`contact-form__title contact-form__title--${size}`}>Contact Us</h2>

          <label className="contact-form__field">
            <span className="contact-form__label">Your Name:</span>
            <input type="text" className="contact-form__input" />
          </label>

          <label className="contact-form__field">
            <span className="contact-form__label ">
              Your Phone Number:
            </span>
            <input type="tel" className="contact-form__input" />
          </label>

          <label className="contact-form__field">
            <span className="contact-form__label">
              Your Email Address:
            </span>
            <input type="email" className="contact-form__input" />
          </label>

          <button type="submit" className={`button contact-form__button contact-form__button--${size}`}>
            Submit
          </button>
        </form>
  )
}

export default ContactForm