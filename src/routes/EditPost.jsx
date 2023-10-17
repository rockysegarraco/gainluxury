import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
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
  BRAND,
  CATEGORY,
  CONDITION,
  COUNTRY,
  PRICE_TYPE,
  US_STATE,
} from "../utils/constants";
import { uploadImages } from "../firebase";
import { createSlug, deepCloneData } from "../utils";
import axios from "axios";

const { FormItem } = Form;

const EditPost = ({ form }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(CATEGORY[0]);
  const [isPrice, setPrice] = useState(true);
  const [brandData, setBrandData] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const inputGallery = useRef(null);
  const [gallaryImages, setGallaryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [postData, setPostData] = useState();
  const [docId, setDocId] = useState();
  const [addressValue, setValue] = useState(null);
  const [location, setLocation] = useState(null);
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
          description: postData?.description,
          pricingType: postData?.pricingType,
          price: postData?.price,
          condition: postData?.condition,
          brand: postData?.brand,
          kilometersRun: postData?.kilometersRun,
          engineCapacity: postData?.engineCapacity,
          phone: postData?.phone,
          state: postData?.state,
          country: postData?.country,
          zipcode: postData?.zipcode,
          email: postData?.email,
          model: postData?.model,
        })
        setGallaryImages(postData?.gallery);
        setPrice(() => postData.pricingType.value === "Fixed" ? false : true)
      }, 1000);
    }
  }, [postData])


  const getPost = async () => {
    const collections = collection(db, "cars");
    const q = query(collections, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        setFetching(false);
        // doc.data() is never undefined for query doc snapshots
        setPostData(doc.data());
        setValue({ label: doc.data().address });
        setCategory(doc.data()?.category)
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
          const slug = createSlug(values.title)
          if (values.price) {
            values.price = Number(values.price);
          }
          values.kilometersRun = Number(values.kilometersRun);
          values.yearModel = Number(values.yearModel);
          values.brand = {value: values.brand.value, label: values.brand.label}
          values.country = {value: values.country.value, label: values.country.label}
          const obj = {
            gallery: gallaryImages,
            ...values,
            slug,
            location,
            address: addressValue.label,
          };
          const documentToUpdate = doc(db, category.value, docId);
          await updateDoc(documentToUpdate, {
            ...obj
          });
          setIsLoading(false);
          navigate(`/${category.value}/${slug}`)
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
    .post("https://us-central1-gain-luxury-e7fee.cloudfunctions.net/cloudAPI/get-place-data", {placeId: value?.value?.place_id})
    .then((res) => {
      console.log(res);
      const addressData = res.data.result.address_components;
      const zipcode = addressData.filter(a => a.types[0] === "postal_code")[0];
      const country = addressData.filter(
        (a) => a.types[0] === "country"
      )[0];
      const state = addressData.filter(
        (a) => a.types[0] === "administrative_area_level_1"
      )[0];
      setFieldsValue({
        zipcode: zipcode ? zipcode.long_name : "",
        country: country ? { label: country.long_name, value: country.long_name } : "",
        state: state ? { label: state.long_name, value: state.long_name } : "",
      })
      setLocation(res.data.result.geometry?.location);
    }).catch(e => {
      console.log(e);
    })
    setValue(value);
  }

  return (
    <div>
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
      ) : (<div>
        <Heading />
        <div className="mx-auto max-w-full md:max-w-4xl lg:max-w-3xl mt-2 bg-white px-10 lg:px-0 py-5 mb-5">
          <Stack gap={3}>
            <h2 className="text-2xl font-bold mb-1">Edit Listing</h2>
            <Stack gap={3}>
              <FormItem>
                {getFieldDecorator("title", {
                  initialValue: "",
                  rules: [{ required: true, }],
                })(<TextInput label="Add Title" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("description", {
                  initialValue: "",
                  rules: [{ required: true, }],
                })(<TextInput multiline label="Tell us about the car" />)}
              </FormItem>
              <Stack gap={2} sx={{ flexDirection: "row", alignItems: 'center' }}>
                <FormItem>
                  {getFieldDecorator("pricingType", {
                    initialValue: "",
                    rules: [{ required: true, }]
                  })(
                    <Select
                      fullWidth
                      label="Price Type"
                      options={PRICE_TYPE}
                      onChange={(data) => setPrice(() => data.value === "Fixed" ? false : true)}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("price", {
                    initialValue: "",
                    rules: [{ required: !isPrice, }],
                  })(<TextInput disabled={isPrice} type="number" label="Price $" />)}
                </FormItem>
              </Stack>
              <Stack gap={2} sx={{ flexDirection: "row", alignItems: 'center' }}>
              <FormItem>
                {getFieldDecorator("brand", {
                  initialValue: "",
                  rules: [{ required: true, }],
                })(<Select 
                  label="Brand" 
                  fullWidth
                  options={BRAND}
                  onChange={(data) =>setBrandData(() => (data.modal))}
                />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("model", {
                  initialValue: "",
                  rules: [{ required: brandData?.length > 0, }],
                })(
                  <Select
                  label="Modal" 
                  fullWidth
                  disabled={!brandData?.length > 0}
                  options={brandData}
                  />
                )}
              </FormItem>
            </Stack>
            <FormItem>
                  {getFieldDecorator("condition", {
                    initialValue: "",
                    rules: [{ required: true, }],
                  })(
                    <Select
                      fullWidth
                      label="Condition"
                      options={CONDITION}
                    />
                  )}
                </FormItem>
              <Stack gap={2} sx={{ flexDirection: "row" }}>
                <FormItem>
                  {getFieldDecorator("kilometersRun", {
                    initialValue: "",
                    rules: [{ required: true, }],
                  })(<TextInput type="number" label="Kilometers Run" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("engineCapacity", {
                    initialValue: "",
                    rules: [{ required: true, }],
                  })(<TextInput label="Engine Capacity" />)}
                </FormItem>
              </Stack>
              <Button
                variant="contained"
                size="large"
                endIcon={<UploadFileRounded />}
                sx={{
                  backgroundColor: "#212121",
                  marginTop: "20px",
                  textTransform: "none",
                }}
                onClick={() => inputGallery.current.click()}
              >
                {galleryLoading ? "Loading..." : "Add Images (5MB Max) "}
              </Button>
              <input
                max={5}
                multiple
                style={{ display: "none" }}
                ref={inputGallery}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleGalleryFile}
              />
              <div className="flex overflow-x-auto gap-2 flex-row whitespace-nowrap">
                {gallaryImages.map((image, index) => (
                  <Paper
                    key={index}
                    sx={{
                      flexShrink: 0,
                      backgroundImage: `url(${image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      height: 150,
                      width: 150,
                      marginTop: '10px'
                    }}
                  >
                    <IconButton
                      sx={{ m: 1, height: '22px', width: '22px', bgcolor: 'white' }}
                      onClick={() => handleImageDelete(index)}
                    >
                      <CloseOutlined fontSize="10" />
                    </IconButton>
                  </Paper>
                ))}
              </div>
            </Stack>

            <h2 className="text-xl font-bold pt-6 pb-1">Contact Details</h2>
            <FormItem>
              {getFieldDecorator("email", {
                initialValue: "",
                rules: [{ required: true, }],
              })(<TextInput label="Email" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("phone", {
                initialValue: "",
                rules: [{ required: true, }],
              })(<TextInput label="Phone" />)}
            </FormItem>
            <div className="mt-2">
              <GooglePlacesAutocomplete
                selectProps={{
                  label: "Select your address",
                  value: addressValue,
                  onChange: getAddressValue,
                }}
              />
            </div>

            <FormItem>
              {getFieldDecorator("state", {
                initialValue: "",
              })(<Select options={US_STATE} fullWidth label="State" />)}
            </FormItem>

            <Stack gap={2} sx={{ flexDirection: "row", alignItems: 'center' }}>
              <FormItem>
                {getFieldDecorator("country", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select fullWidth label="Country" options={COUNTRY} />)}
              </FormItem>

              <FormItem>
                {getFieldDecorator("zipcode", {
                  initialValue: "",
                })(<TextInput label="Zipcode" type="number" />)}
              </FormItem>
            </Stack>
          </Stack>

          <button
            onClick={checkout}
            type="button"
            className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mt-8"
          >
            {isLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </div>)}
    </div>
  );
};

export default Form.create()(EditPost);
