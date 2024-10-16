// import React, { useState } from 'react';
// import './ContactUs.css';

// const ContactUs = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add form submission logic here (e.g., sending data to the backend)
//     alert('Thank you for your message!');
//   };

//   return (
//     <div className="contactus-wrapper">
      
//       <div className="contactus-container">
//         <h1>Contact Us</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <textarea
//             placeholder="Your Message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           ></textarea>
//           <button type="submit">Send Message</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;




import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., sending data to the backend)
    alert('Thank you for your message!');
  };

  return (
    <div className="contactus-wrapper">
      <div className="contactus-background" /> {/* Background image will be here */}
      <div className="contactus-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;