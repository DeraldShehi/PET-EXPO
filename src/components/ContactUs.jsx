const ContactUs = () => {
  return (
    <section className="contact-us">
      <div className="contact-info">
        <h2>CONTACT US</h2>
        <p>1001 Crooked Hill Rd, Brentwood, NY 11717, United States</p>
        <a href="tel:+1 631-423-0620">+1 631-423-0620</a>
      </div>
      <div className="contact-form">
        <form>
          <label htmlFor="Name">Name</label>
          <input type="text" name="Name" placeholder="Enter your name" />
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Enter a correct email"
          />
          <label htmlFor="Message">Message</label>
          <textarea
            name="Message"
            id="Message"
            placeholder="Message..."
          ></textarea>
        </form>
        <button className="send-btn-form">Send</button>
      </div>
    </section>
  );
};
export default ContactUs;
