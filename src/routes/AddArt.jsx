import React, { useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

// MUI
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import Paper from "@mui/material/Paper";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";

// components
import Heading from "../components/Heading";
import Form from "../components/form";
import TextInput from "../components/form/TextInput";
import Select from "../components/form/Select";
import {
  ARTSUBJECT,
  CATEGORY,
  ARTCATEGORY,
  COUNTRY,
  PRICE_TYPE,
  US_STATE,
  PHOTOS_MAX_LENGTH,
} from "../utils/constants";
import { uploadImages } from "../firebase";
import { createSlug, deepCloneData, validatePhone } from "../utils";
import { useEffect } from "react";
import PhoneInput from "../components/form/PhoneInput";

const { FormItem } = Form;

const AddArt = ({ form }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [category] = useState(CATEGORY[4]);
  const [isPrice, setPrice] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const inputGallery = useRef(null);
  const [gallaryImage, setGallaryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addressValue, setValue] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasError, setHasError] = useState(null);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  // In case the user signs out while on the page.
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setFieldsValue({
      agentName:
        user?.firstName != null ? user?.firstName + " " + user?.lastName : "",
      email: user?.emailAddresses[0]?.emailAddress,
      phone: user?.phoneNumbers[0]?.phoneNumber,
    });
  }, [user]);

  const checkout = async () => {
    setHasError(addressValue === null);
    return validateFields()
      .then(async (values) => {
        if (gallaryImage) {
          setIsLoading(true);
          const slug = createSlug(values.title);
          if (values.price) {
            values.price = Number(values.price);
          }
          values.yearModel = Number(values.yearModel);
          values.country = {
            value: values.country.value,
            label: values.country.label,
          };
          const obj = {
            gallery: gallaryImage,
            ...values,
            userId: user.id,
            address: addressValue.label,
            slug,
            category,
            location,
            avatar: user.imageUrl,
          };
          if (addressValue !== null) {
            return await axios
              .post(
                "https://us-central1-gain-luxury-e7fee.cloudfunctions.net/cloudAPI/checkout",
                {
                  post: {
                    priceId: category.priceId,
                    success_url: window.location.origin + "/success",
                    cancel_url: window.location.origin + "/cancel",
                  },
                }
              )
              .then((res) => {
                if (res.data.url) {
                  setIsLoading(false);
                  localStorage.setItem("userPost", JSON.stringify(obj));
                  window.location.assign(res.data.url);
                }
              });
          } else {
            setIsLoading(false);
          }
        } else {
          alert("Please add at least 5 photos.");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  const handleGalleryFile = async (e) => {
    const files = Array.from(e.target.files);
    if (files?.length > 0) {
      if (files?.length <= PHOTOS_MAX_LENGTH) {
        const maxSize = 5 * 1024 * 1024;
        const validFiles = files.filter((file) => file.size <= maxSize);
        if (validFiles.length !== files.length) {
          alert("Some files exceed the maximum size limit (5MB).");
        } else {
          setGalleryLoading(true);
          const result = await uploadImages(e.target.files);
          setGallaryImages((prev) => [...prev, ...result]);
          setGalleryLoading(false);
        }
      } else {
        e.preventDefault();
        alert(`Cannot upload files more than ${PHOTOS_MAX_LENGTH}`);
      }
    }
  };

  const getAddressValue = (value) => {
    axios
      .post(
        "https://us-central1-gain-luxury-e7fee.cloudfunctions.net/cloudAPI/get-place-data",
        { placeId: value?.value?.place_id }
      )
      .then((res) => {
        const addressData = res.data.result.address_components;
        const zipcode = addressData.filter(
          (a) => a.types[0] === "postal_code"
        )[0];
        const country = addressData.filter((a) => a.types[0] === "country")[0];
        const state = addressData.filter(
          (a) => a.types[0] === "administrative_area_level_1"
        )[0];
        setFieldsValue({
          zipcode: zipcode ? zipcode.long_name : "",
          country: country
            ? { label: country.long_name, value: country.long_name }
            : "",
          state: state
            ? { label: state.long_name, value: state.long_name }
            : "",
        });
        setLocation(res.data.result.geometry?.location);
      })
      .catch((e) => {
        console.log(e);
      });
    setValue(value);
    setHasError(false);
  };

  const handleImageDelete = (index) => {
    const data = deepCloneData(gallaryImage);
    data.splice(index, 1);
    setGallaryImages(data);
  };

  return (
    <div>
      <div className="mx-auto max-w-8xl lg:p-6 p-3">
        <Heading title="Sell Art">
          <div className="mx-auto max-w-full grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4">
              {" "}
              <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:px-6 font-bold bg-slate-50">
                  Listing Details
                </div>
                <div className="p-6">
                  <Stack spacing={0}>
                    <Stack gap={2}>
                      <div className="0">
                        <FormItem>
                          {getFieldDecorator("title", {
                            initialValue: "",
                            rules: [{ required: true }],
                          })(<TextInput label="Listing Title" />)}
                        </FormItem>
                      </div>
                      <FormItem>
                        {getFieldDecorator("description", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(<TextInput multiline label="Features" />)}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("video", {
                          initialValue: "",
                          rules: [{ required: false }],
                        })(
                          <TextInput
                            label="Video Url"
                            hint="ex. https://www.youtube.com/watch?v=ysz5S6PUM-U"
                          />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("yearModel", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(<TextInput label="Year" type="number" />)}
                      </FormItem>
                      <Stack
                        gap={2}
                        sx={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <FormItem>
                          {getFieldDecorator("pricingType", {
                            initialValue: "",
                            rules: [{ required: true }],
                          })(
                            <Select
                              fullWidth
                              label="Price Type"
                              options={PRICE_TYPE}
                              onChange={(data) =>
                                setPrice(() =>
                                  data.value === "Fixed" ? false : true
                                )
                              }
                            />
                          )}
                        </FormItem>

                        <FormItem>
                          {getFieldDecorator("price", {
                            initialValue: "",
                            rules: [
                              { required: !isPrice },
                              {
                                validator: (rule, value, callback) => {
                                  if (value < 1000) {
                                    callback("Price must be greater than 1000");
                                  } else {
                                    callback();
                                  }
                                },
                              },
                            ],
                          })(
                            <TextInput
                              name="price"
                              disabled={isPrice}
                              label="Price $"
                              type="number"
                              pattern={true}
                            />
                          )}
                        </FormItem>
                      </Stack>
                      <FormItem>
                        {getFieldDecorator("artsubject", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(
                          <Select
                            label="Subject"
                            fullWidth
                            options={ARTSUBJECT}
                          />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("artcategory", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(
                          <Select
                            label="Category"
                            fullWidth
                            options={ARTCATEGORY}
                          />
                        )}
                      </FormItem>
                    </Stack>
                    <Stack gap={3}>
                      <div className="mt-6">
                        <label
                          className={`block mb-2 font-medium leading-6 text-gray-700 ${
                            hasError && "text-red-500"
                          } `}
                        >
                          Address
                        </label>
                        <GooglePlacesAutocomplete
                          selectProps={{
                            placeholder: "search your place",
                            value: addressValue,
                            onChange: getAddressValue,
                          }}
                          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                        />
                        {hasError && (
                          <FormHelperText className="text-red-500">
                            Address is required
                          </FormHelperText>
                        )}
                      </div>

                      <FormItem>
                        {getFieldDecorator("state", {
                          initialValue: "",
                        })(
                          <Select options={US_STATE} fullWidth label="State" />
                        )}
                      </FormItem>

                      <Stack
                        gap={2}
                        sx={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <FormItem>
                          {getFieldDecorator("country", {
                            initialValue: "",
                            rules: [{ required: true }],
                          })(
                            <Select
                              fullWidth
                              label="Country"
                              options={COUNTRY}
                            />
                          )}
                        </FormItem>

                        <FormItem>
                          {getFieldDecorator("zipcode", {
                            initialValue: "",
                          })(<TextInput label="Zipcode" type="number" />)}
                        </FormItem>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              {" "}
              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:px-6 font-bold bg-slate-50">
                  Gallery
                  {/* We use less vertical padding on card headers on desktop than on body sections */}
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <Stack spacing={0}>
                    <Stack gap={2}>
                      <div className="col-span-full">
                        <label
                          for="cover-photo"
                          className="block font-medium leading-6 text-gray-700"
                        >
                          Photos
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-300"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center">
                              <label
                                for="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span className="self-center text-blue-700 text-lg">
                                  {galleryLoading ? "Loading..." : "Add Images"}
                                </span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  max={5}
                                  type="file"
                                  className="sr-only"
                                  ref={inputGallery}
                                  multiple
                                  accept="image/png, image/jpg, image/jpeg"
                                  onChange={handleGalleryFile}
                                />
                              </label>
                            </div>
                            <p className="text-lg leading-5 text-gray-600">
                              PNG, JPG up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex overflow-x-auto gap-2 flex-row whitespace-nowrap">
                        {gallaryImage.map((image, index) => (
                          <Paper
                            key={index}
                            sx={{
                              backgroundImage: `url(${image})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              height: 150,
                              width: 150,
                              flexShrink: 0,
                              marginTop: "10px",
                            }}
                          >
                            <IconButton
                              sx={{
                                m: 1,
                                height: "22px",
                                width: "22px",
                                bgcolor: "white",
                              }}
                              onClick={() => handleImageDelete(index)}
                            >
                              <CloseOutlined />
                            </IconButton>
                          </Paper>
                        ))}
                      </div>
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              {" "}
              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow col-span-12 lg:col-span-12">
                <div className="px-4 py-5 sm:px-6 font-bold bg-slate-50">
                  Contact Details
                  {/* We use less vertical padding on card headers on desktop than on body sections */}
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <Stack spacing={3}>
                    <div>
                      <FormItem>
                        {getFieldDecorator("agentName", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(<TextInput label="Agent/Owner Name *" />)}
                      </FormItem>
                    </div>
                    <div>
                      <FormItem>
                        {getFieldDecorator("agentCompany", {
                          initialValue: "",
                          rules: [{ required: false }],
                        })(<TextInput label="Agent/Owner Company" />)}
                      </FormItem>
                    </div>
                    <Stack gap={3}>
                      <FormItem>
                        {getFieldDecorator("email", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(<TextInput label="Email" />)}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("phone", {
                          initialValue: "",
                          rules: [
                            {
                              required: true,
                              message: "Please enter a valid phone number",
                            },
                            { validator: validatePhone },
                          ],
                        })(
                          <PhoneInput
                            label="Phone Number *"
                            prependIcon={false}
                            maxLength={10}
                          />
                        )}
                      </FormItem>
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>
            <div className="col-span-12 text-center pt-0">
              <button
                onClick={checkout}
                type="button"
                className="rounded-full w-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 mt-8"
              >
                {isLoading ? "Loading..." : "Continue to Payment"}
              </button>
            </div>
          </div>
        </Heading>
      </div>
    </div>
  );
};

export default Form.create()(AddArt);
