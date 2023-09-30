import React, { useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import IconButton from "@mui/material/IconButton";

// components
import Heading from "../components/Heading";
import Form from "../components/form";
import TextInput from "../components/form/TextInput";
import Select from "../components/form/Select";
import Pricing from "../components/pricing";
import {
  BRAND,
  CATEGORY,
  CONDITION,
  COUNTRY,
  PRICE_TYPE,
} from "../utils/constants";
import { uploadImages } from "../firebase";
import { createSlug, deepCloneData, validatePhone } from "../utils";
import { useEffect } from "react";
import PhoneInput from "../components/form/PhoneInput";

const { FormItem } = Form;

const AddPost = ({ form }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [isPrice, setPrice] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const inputGallery = useRef(null);
  const [gallaryImages, setGallaryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getFieldDecorator, validateFields } = form;

  // In case the user signs out while on the page.
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      navigate("/");
    }
  }, [])

  const checkout = async () => {
    return validateFields()
      .then(async (values) => {
        if (gallaryImages.length >= 5) {
          setIsLoading(true);
          const slug = createSlug(values.title);
          const obj = {
            gallery: gallaryImages,
            ...values,
            userId: user.id,
            slug,
          };
          return await axios
            .post(
              "https://us-central1-gain-luxury-e7fee.cloudfunctions.net/cloudAPI/checkout",
              {
                post: {
                  priceId: category.priceId,
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
        const maxSize = 3 * 1024 * 1024;
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

  return (
    <div>
      <Heading />
      <div className="mx-auto max-w-full lg:max-w-4xl bg-white">
        <Pricing />
      </div>
      <div className="mx-auto max-w-full md:max-w-4xl lg:max-w-3xl mt-2 bg-white px-10 lg:px-0 py-5 mb-5">
        <Stack spacing={0}>
          <h2 className="text-2xl font-bold mb-1">Let's get started</h2>
          <FormItem>
            {getFieldDecorator("category", {
              initialValue: "",
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                placeholder="Select Category"
                options={CATEGORY}
                onChange={(data) => setCategory(data)}
              />
            )}
          </FormItem>

          {category.value === "cars" && (
            <Stack spacing={0}>
              <FormItem>
                {getFieldDecorator("title", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<TextInput placeholder="Add Title" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("description", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<TextInput multiline placeholder="Tell us about the car" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("yearModel", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<TextInput type="number" placeholder="Year" />)}
              </FormItem>
              <Stack gap={2} sx={{ flexDirection: "row" }}>
                <FormItem>
                  {getFieldDecorator("pricingType", {
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <Select
                      fullWidth
                      placeholder="Price Type"
                      options={PRICE_TYPE}
                      onChange={(data) =>
                        setPrice(() => (data.value === "Fixed" ? false : true))
                      }
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("price", {
                    initialValue: "",
                    rules: [
                      {
                        required: !isPrice,
                      },
                    ],
                  })(
                    <TextInput
                      disabled={isPrice}
                      type="number"
                      placeholder="Price $"
                    />
                  )}
                </FormItem>
              </Stack>
              <Stack gap={2} sx={{ flexDirection: "row" }}>
                <FormItem>
                  {getFieldDecorator("condition", {
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <Select
                      fullWidth
                      placeholder="Condition"
                      options={CONDITION}
                    />
                  )}
                </FormItem>
              </Stack>

              <FormItem>
                {getFieldDecorator("brand", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select fullWidth placeholder="Brand" options={BRAND} />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("kilometersRun", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<TextInput type="number" placeholder="Kilometers Run" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("engineCapacity", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<TextInput placeholder="Engine Capacity" />)}
              </FormItem>

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
          )}

          {category.value === "property" && <div> Property fields </div>}
          {category.value === "yatch" && <div> Yatch fields </div>}
          {category.value === "aviation" && <div> aviation fields </div>}

          <h2 className="text-xl font-bold pt-6 pb-1">Contact Details</h2>
          <FormItem>
            {getFieldDecorator("email", {
              initialValue: "",
              rules: [
                {
                  required: true,
                },
              ],
            })(<TextInput placeholder="Email" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phone', {
              initialValue: user && user.user_mobile,
              rules: [
                {
                  required: true,
                  message: 'Please enter a valid phone number',
                },
                { validator: validatePhone },
              ],
            })(<PhoneInput placeholder="Mobile Number" prependIcon={false} maxLength={10} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("address", {
              initialValue: "",
              rules: [
                {
                  required: true,
                },
              ],
            })(<TextInput placeholder="Address" />)}
          </FormItem>

          <Stack gap={2} sx={{ flexDirection: "row" }}>
            <FormItem>
              {getFieldDecorator("state", {
                initialValue: "",
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Select fullWidth placeholder="Country" options={COUNTRY} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator("zipcode", {
                initialValue: "",
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<TextInput placeholder="Zipcode" type="number" />)}
            </FormItem>
          </Stack>
        </Stack>

        <button
          onClick={checkout}
          type="button"
          className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mt-8"
        >
          {isLoading ? "Loading..." : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Form.create()(AddPost);
