import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './NewsletterForm';

export default function Newsletter() {
  const MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL;
  return (
    <div className="pt-8 pb-16">
      <div className="mx-auto grid max-w-[90%] grid-cols-1 gap-10 px-0 lg:grid-cols-12 lg:gap-8 border-t pt-8">
        <div className="max-w-full text-3xl font-bold text-gray-900 sm:text-4xl lg:col-span-8">
          <p className="inline sm:block lg:inline xl:block fancy">
            Sign up for our newsletter.
          </p>
          <p className="text-base font-normal mt-2 max-w-lg text-slate-700">
            Discover a thoughtfully curated collection of the latest luxury
            trends, accompanied by exclusive insights and expert tips to enhance
            your experience.
          </p>
        </div>
        <MailchimpSubscribe
          url={ MAILCHIMP_URL }
          render={ ( props ) => {
            const { subscribe, status, message } = props || {};
            return (
              <NewsletterForm
                status={ status }
                message={ message }
                onValidated={ formData => subscribe( formData ) }
              />
            );
          } }
        />
      </div>
    </div>
  );
}
