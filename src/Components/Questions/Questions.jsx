import React, { useState } from "react";
import "./Questions.css";
import Accordion from "./Accordion";
import emailjs from "emailjs-com";

function Questions() {
  const [active, setActive] = useState("How does it work?");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email || !question) {
      alert("Please fill in both fields.");
      return;
    }

    const templateParams = {
      email: email,
      question: question,
    };

    emailjs.send(
      process.env.EMAIL_SERVICE_ID,
      process.env.TEMPLATE_ID,
      templateParams,
      process.env.EMAIL_USER_ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Your inquiry has been submitted successfully!");
        setEmail("");
        setQuestion("");
      })
      .catch((err) => {
        console.log('FAILED...', err);
        alert("There was an error submitting your inquiry. Please try again.");
      });
  };

  return (
    <div className="questions section container">
      <div className="secHeading">
        <h3>Frequently Asked Questions</h3>
      </div>

      <div className="secContainer grid">
        <div className="accordion grid">
          <Accordion
            title="How does it work?"
            desc="The system searches your chosen hotel across multiple meta-search websites using a VPN and incognito mode, compares prices, and returns the best deals."
            active={active}
            setActive={setActive}
          />
          <Accordion
            title="How much time does it take?"
            desc="The system can take up to about 5 minutes to provide a response."
            active={active}
            setActive={setActive}
          />
          <Accordion
            title="Why I don't get a result?"
            desc="Not all hotels are supported by the system. Try a different hotel or try again later."
            active={active}
            setActive={setActive}
          />
          <Accordion
            title="Why do I get different prices when I click the link?"
            desc="Prices are subject to change, we monitor the prices and update them regularly."
            active={active}
            setActive={setActive}
          />
          <Accordion
            title="Whey when I click the link I get a different hotel"
            desc="We try to match the hotel as best as we can, but sometimes the system may not find the exact hotel."
            active={active}
            setActive={setActive}
          />
          <Accordion
            title="Why when clicking the link, I get price in different currency"
            desc="The system searches for the hotel prices in different regions, the price is converted to your local currency on our website. You can change the currency to your preferred currency in the OTA website."
            active={active}
            setActive={setActive}
          />
        </div>

        <div className="form">
          <div className="secHeading">
            <h4>Do you have any specific question?</h4>
            <p>
              Please fill the form below and our dedicated team will get in
              touch with you as soon soon as possible.
            </p>
          </div>

          <div className="formContent grid">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-aos="fade-up"
            />
            <textarea
              placeholder="Enter your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              data-aos="fade-up"
            />
            <button className='btn' data-aos="fade-up" onClick={sendEmail}>Submit Inquiry</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
