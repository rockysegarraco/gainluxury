import { useState } from 'react';
import { decode } from 'html-entities';

const NewsletterForm = ({ status, message, onValidated }) => {

  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {

    setError(null);

    if (!email) {
      setError('Please enter a valid email address');
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  }

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split('-') ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  }

  return (
    <>
      <div className="w-full lg:col-span-4 lg:pt-2">
        <div className="flex">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            placeholder="Your email"
            className="min-w-0 flex-auto border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
        </div>
        <div className="py-3">
          <button
            onClick={handleFormSubmit}
            className="flex-none bg-gray-900 px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
          >
            Subscribe
          </button>
        </div>
        <p className="text-sm leading-6 text-gray-900">
          We care about your data. Read our{" "}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500">
            privacy&nbsp;policy
          </a>
          .
        </p>
        <div className="">
          {status === "sending" && <div>Sending...</div>}
          {status === "error" || error ? (
            <div
              className="text-red-500"
              dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
            />
          ) : null}
          {status === "success" && status !== "error" && !error && (
            <div className='text-green-800' dangerouslySetInnerHTML={{ __html: decode(message) }} />
          )}
        </div>
      </div>
    </>
  );
}

export default NewsletterForm