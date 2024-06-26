import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

// MUI
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// components
import db from "../firebase";
import Heading from "../components/Heading";
import Form from "../components/form";
import TextInput from "../components/form/TextInput";
import Select from "../components/form/Select";
import {
  CATEGORY,
  COUNTRY,
  US_STATE,
  RE_LISTING_TYPE,
  RE_SELECT_PROPERTY_CATEGORY,
  PRICE_TYPE,
  RE_PRICE_UNIT,
} from "../utils/constants";
import { uploadImages } from "../firebase";
import { createSlug, deepCloneData, validatePhone } from "../utils";
import { useEffect } from "react";
import PhoneInput from "../components/form/PhoneInput";

const { FormItem } = Form;

const EditProperty = ({ form }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [category] = useState(CATEGORY[1]);
  const [docId, setDocId] = useState();
  const [galleryLoading, setGalleryLoading] = useState(false);
  const inputGallery = useRef(null);
  const [gallaryImages, setGallaryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addressValue, setValue] = useState(null);
  const [propertyAddress, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [isPrice, setPrice] = useState(true);
  const [postData, setPostData] = useState();
  const [isFetching, setFetching] = useState(true);


  const [propertyCategory, setPropertyCategory] = useState();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  useEffect(() => {
    if (slug) {
      getPost();
    }
  }, [slug]);

  useEffect(() => {
    if (postData) {
      setTimeout(() => {
        setFieldsValue({
          title: postData?.title,
          listingType: postData?.listingType,
          description: postData?.description,
          pricingType: postData?.pricingType,
          yearModel: postData?.yearModel,
          price: postData?.price,
          propertyCategory: postData?.propertyCategory,
          aptsize: postData?.aptsize,
          bedrooms: postData?.bedrooms,
          baths: postData?.baths,
          propertyType: postData?.propertyType,
          size: postData?.size,
          city: postData?.city,
          phone: postData?.phone,
          state: postData?.state,
          country: postData?.country,
          zipcode: postData?.zipcode,
          email: postData?.email,
          model: postData?.model,
          agentName: postData?.agentName,
          agentCompany: postData?.agentCompany,
        });
        setGallaryImages(postData?.gallery);
        setPrice(() => (postData.pricingType.value === "Fixed" ? false : true));
      }, 1000);
    }
  }, [postData]);

  const getPost = async () => {
    const collections = collection(db, "properties");
    const q = query(collections, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        setFetching(false);
        // doc.data() is never undefined for query doc snapshots
        setPostData(doc.data());
        setValue({ label: doc.data().address });
        setAddress({ label: doc.data().propertyAddress });
        setLocation(doc.data()?.location);
        setDocId(doc?.id);
      });
    } else {
      setFetching(false);
    }
  };

  const checkout = async () => {
    return validateFields()
      .then(async (values) => {
        if (gallaryImages.length >= 5) {
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
            gallery: gallaryImages,
            ...values,
            address: addressValue?.label,
            propertyAddress: propertyAddress?.label,
            slug,
            location,
          };

          const documentToUpdate = doc(db, category.value, docId);
          await updateDoc(documentToUpdate, {
            ...obj,
          });
          setIsLoading(false);
          navigate(`/${category.value}/${slug}`);
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
    const MAX_LENGTH = 10;
    const files = Array.from(e.target.files);
    if (files?.length > 0) {
      if (files?.length <= MAX_LENGTH) {
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
        alert(`Cannot upload files more than ${MAX_LENGTH}`);
      }
    }
  };

  const handleImageDelete = (index) => {
    const data = deepCloneData(gallaryImages);
    data.splice(index, 1);
    setGallaryImages(data);
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
        const city = addressData.filter(
          (a) => a.types[0] === "administrative_area_level_3"
        )[0];
        const state = addressData.filter(
          (a) => a.types[0] === "administrative_area_level_1"
        )[0];
        setFieldsValue({
          zipcode: zipcode ? zipcode.long_name : "",
          city: city ? city.long_name : "",
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
    setAddress(value);
  };
  const renderResidential = () => {
    if (propertyCategory?.value === "residential_property") {
      return (
        <Stack spacing={0}>
          <Stack gap={2}>
            <FormItem>
              {getFieldDecorator("aptsize", {
                initialValue: "",
                rules: [{ required: true }],
              })(<TextInput label="Apartment Size *" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("bedrooms", {
                initialValue: "",
                rules: [{ required: true }],
              })(<TextInput label="Bedrooms *" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("baths", {
                initialValue: "",
                rules: [{ required: true }],
              })(<TextInput label="Baths *" />)}
            </FormItem>
          </Stack>
        </Stack>
      );
    }
  };

  const renderCommercial = () => {
    if (propertyCategory?.value === "commercial_property") {
      return (
        <Stack spacing={0}>
          <Stack gap={2}>
            <FormItem>
              {getFieldDecorator("propertyType", {
                initialValue: "",
                rules: [{ required: true }],
              })(
                <Select
                  options={RE_PRICE_UNIT}
                  fullWidth
                  label="Property Type *"
                  autocomplete="off"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("size", {
                initialValue: "",
                rules: [{ required: false }],
              })(<TextInput label="Size" />)}
            </FormItem>
          </Stack>
        </Stack>
      );
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-8xl lg:p-6 p-3">
        <Heading title="Sell a Property">
        {isFetching ? (
              <Box
                sx={{
                  flex: 1,
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
          <div className="mx-auto max-w-full grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4">
              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:px-6 font-bold bg-slate-50">
                  Listing Details
                  {/* We use less vertical padding on card headers on desktop than on body sections */}
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <Stack spacing={0}>
                    <Stack gap={2}>
                      <FormItem>
                        {getFieldDecorator("title", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(<TextInput label="Listing Title *" />)}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("listingType", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(
                          <Select
                            options={RE_LISTING_TYPE}
                            fullWidth
                            label="Listing Type *"
                          />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("pricingType", {
                          initialValue: "",
                          rules: [{ required: !isPrice }],
                        })(
                          <Select
                            options={PRICE_TYPE}
                            fullWidth
                            label="Price Type *"
                            autocomplete="off"
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
                          rules: [{ required: true }],
                        })(<TextInput disabled={isPrice} label="Price [$] *" type="number" />)}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("propertyCategory", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(
                          <Select
                            options={RE_SELECT_PROPERTY_CATEGORY}
                            fullWidth
                            label="Category *"
                            autocomplete="off"
                            onChange={(data) => setPropertyCategory(data)}
                          />
                        )}
                      </FormItem>
                      {renderCommercial()}
                      {renderResidential()}
                      <div>
                        <label className="block mb-2 font-medium leading-6 text-gray-700">
                          Address
                        </label>
                        <GooglePlacesAutocomplete
                          selectProps={{
                            placeholder: "search your place",
                            value: propertyAddress,
                            onChange: getAddressValue,
                          }}
                          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                        />
                      </div>
                      <FormItem>
                        {getFieldDecorator("city", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(<TextInput fullWidth label="City *" />)}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("state", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(
                          <Select
                            options={US_STATE}
                            fullWidth
                            label="State *"
                          />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("country", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(
                          <Select
                            fullWidth
                            label="Country *"
                            options={COUNTRY}
                          />
                        )}
                      </FormItem>

                      <FormItem>
                        {getFieldDecorator("zipcode", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(<TextInput label="Zipcode *" type="number" />)}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator("description", {
                          initialValue: "",
                          rules: [{ required: true }],
                        })(
                          <TextInput
                            multiline
                            label="Features"
                            hint="ex. Elevator, Privacy, Air Conditioning 2D Floor Plan..."
                          />
                        )}
                      </FormItem>
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
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
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                for="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span className="self-center">
                                  {galleryLoading ? "Loading..." : "Add Images"}
                                </span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  multiple
                                  max={5}
                                  type="file"
                                  className="sr-only"
                                  ref={inputGallery}
                                  accept="image/png, image/jpg, image/jpeg"
                                  onChange={handleGalleryFile}
                                />
                              </label>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG up to 3MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex overflow-x-auto gap-2 flex-row whitespace-nowrap">
                        {gallaryImages.map((image, index) => (
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
              <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
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
                          rules: [{ required: false }],
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
                      <div className="mt-2">
                        <label className="block mb-2 font-medium leading-6 text-gray-700">
                          Address
                        </label>
                        <GooglePlacesAutocomplete
                          selectProps={{
                            placeholder: "search your place",
                            value: addressValue,
                            onChange: (value) => setValue(value),
                          }}
                          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                        />
                      </div>
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>
            <div className="col-span-12 text-center pt-0">
              <button
                onClick={checkout}
                type="button"
                className="rounded-full w-full bg-blue-700 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 mt-8"
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>)}
        </Heading>
      </div>
    </div>
  );
};

export default Form.create()(EditProperty);
