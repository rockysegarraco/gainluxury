import React, { useEffect } from "react";

const MailchimpForm = () => {
  useEffect(() => {
    // Load Mailchimp script
    const script = document.createElement("script");
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup: remove the script when the component unmounts
    };
  }, []);

  return (
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        {/* Your form structure */}
        <form
          action="https://gainluxury.us21.list-manage.com/subscribe/post?u=1cc2a942d254b4e8bbf506610&amp;id=8ebf235101&amp;f_id=001be6e6f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <div class="indicates-required">
              <span class="asterisk">*</span> indicates required
            </div>
            <div class="mc-field-group">
              <label for="mce-EMAIL">
                Email Address <span class="asterisk">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                class="required email"
                id="mce-EMAIL"
                required=""
                value=""
              />
            </div>
            <div class="mc-field-group">
              <label for="mce-FNAME">First Name </label>
              <input
                type="text"
                name="FNAME"
                class=" text"
                id="mce-FNAME"
                value=""
              />
            </div>
            <div class="mc-field-group">
              <label for="mce-LNAME">Last Name </label>
              <input
                type="text"
                name="LNAME"
                class=" text"
                id="mce-LNAME"
                value=""
              />
            </div>
            <div class="mc-field-group">
              <label for="mce-PHONE">Phone Number </label>
              <input
                type="text"
                name="PHONE"
                class="REQ_CSS"
                id="mce-PHONE"
                value=""
              />
            </div>
            <div id="mce-responses" class="clear foot">
              <div
                class="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                class="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <div aria-hidden="true">
              <input
                type="text"
                name="b_1cc2a942d254b4e8bbf506610_8ebf235101"
                tabindex="-1"
                value=""
              />
            </div>
            <div class="optionalParent">
              <div class="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  class="button"
                  value="Submit"
                />
                <p>
                  <a
                    href="http://eepurl.com/iCFBMQ"
                    title="Mailchimp - email marketing made easy and fun"
                  >
                    <img
                      class="refferal_badge"
                      src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                      alt="Intuit Mailchimp"
                      style={{ width: 220, height: 40, display: "flex" }}
                    />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailchimpForm;
