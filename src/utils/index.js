import { useEffect } from "react";

export const cc_format = (value) => {
    if (value?.length <= 19) {
      const v = value?.replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];
  
    for (let i = 0; i < v?.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
  
    return parts.length > 1 ? parts.join(" ") : value;
    }
  }

  export const deepCloneData = (data) => JSON.parse(JSON.stringify(data));

  export function createSlug(title) {
    // Convert to lowercase
    let slug = title.toLowerCase();
  
    // Remove special characters and replace spaces with hyphens
    slug = slug.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric characters
    slug = slug.replace(/\s+/g, '-'); // Replace spaces with hyphens
  
    // Trim leading and trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');
  
    // Optionally limit the length of the slug
    const maxLength = 50; // Adjust as needed
    slug = slug.substring(0, maxLength);
  
    return slug + `-${new Date().getTime()}`;
  }

  export function useTitle(title) {
    useEffect(() => {
      const prevTitle = document.title
      document.title = title + " | GainLuxury"
      return () => {
        document.title = prevTitle
      }
    })
  }

  export function isValidPhone(text) {
    // From: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    return !!text.trim().match(/\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g);
  }

  export function validatePhone(rule, value, callback) {
    if (value) {
      const isValid = isValidPhone(value);
      if (isValid) {
        callback();
      } else if (!value.startsWith('+') && value.length === 10) {
        callback();
      } else {
        callback("Invalid mobile number");
      }
    } else {
      callback();
    }
  }