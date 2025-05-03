import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = ["Basic Details", "Configuration", "Location & Tags", "Upload Images", "Contacts"];
const cityStateMap = {
  Bangalore: "Karnataka",
  Mumbai: "Maharashtra",
  Hyderabad: "Telangana",
  Delhi: "Delhi"
};

const AddProperties = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "",
    price: "",
    area_sqft: "",
    configuration: {
      bedrooms: "",
      bathrooms: ""
    },
    furnishings: {
      bedroom: [""],
      hall: [""],
      kitchen: [""]
    },
    location: {
      address: "",
      city: "",
      state: "",
      zip_code: "",
      maps: ""
    },
    tags: ["", "", ""],
    images: ["", "", ""],
    contacts: [{ name: "", phone: "", email: "" }]
  });

  const updateField = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const renderInput = (label, value, placeholder, onChange, type = "text", span = 1, inputClass = "", labelClass = "", wrapperClass = "", required = false) => (
    <div className={`col-span-${span} ${wrapperClass}`}>
      <label className={`text-sm poppins-regular text-[20px] text-gray-600 ${labelClass}`}>
        {label}{required && <span className="text-red-600"> *</span>}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`px-4 py-4 input w-full mt-2 border border-gray-400 poppins-regular rounded-md focus:border-[#e8e8ff] transition-all duration-300 ease-in-out ${inputClass}`}
      />
    </div>
  );

  const validateStep = () => {
    switch (step) {
      case 0:
        if (!formData.title || !formData.property_type || !formData.price || !formData.area_sqft) {
          alert("Please fill in all required fields in Basic Details.");
          return false;
        }
        return true;
      case 2:
        if (!formData.location.address || !formData.location.city || !formData.location.state || !formData.location.zip_code) {
          alert("Please fill in all required fields in Location & Tags.");
          return false;
        }
        return true;
      case 3:
        if (!formData.images[0] || !formData.images[1] || !formData.images[2]) {
          alert("Please add URLs for all 3 images.");
          return false;
        }
        return true;
      case 4:
        const contact = formData.contacts[0];
        if (!contact.name || !contact.phone || !contact.email) {
          alert("Please fill in all required contact details.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        await axios.post("http://127.0.0.1:5000/properties",
          formData, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          });
        navigate('/my-properties');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Title", formData.title, "Property Name", (e) => setFormData({ ...formData, title: e.target.value }), "text", 1, "", "", "", true)}
            {renderInput("Property Type", formData.property_type, "Select Property Type", (e) => setFormData({ ...formData, property_type: e.target.value }), "text", 1, "", "", "", true)}
            {renderInput("Price", formData.price, "Property Amount", (e) => setFormData({ ...formData, price: e.target.value }), "number", 1, "", "", "", true)}
            {renderInput("Area (sqft)", formData.area_sqft, "Eg : 1200", (e) => setFormData({ ...formData, area_sqft: e.target.value }), "number", 1, "", "", "", true)}
            <div className="col-span-2">
              <label className="text-sm poppins-regular text-[20px] text-gray-600">Description</label>
              <textarea
                placeholder="About the Property"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-4 py-4 text-[18px] input w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#e8e8ff] transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Bedrooms", formData.configuration.bedrooms, "Eg : 3", (e) => updateField("configuration", "bedrooms", e.target.value), "number")}
            {renderInput("Bathrooms", formData.configuration.bathrooms, "Eg : 2", (e) => updateField("configuration", "bathrooms", e.target.value), "number")}
            {renderInput("Furnishing - Bedroom", formData.furnishings.bedroom[0], "Bedroom Furnitures", (e) => setFormData({ ...formData, furnishings: { ...formData.furnishings, bedroom: [e.target.value] } }))}
            {renderInput("Furnishing - Hall", formData.furnishings.hall[0], "Hall Furnitures", (e) => setFormData({ ...formData, furnishings: { ...formData.furnishings, hall: [e.target.value] } }))}
            {renderInput("Furnishing - Kitchen", formData.furnishings.kitchen[0], "Kitchen Furnitures", (e) => setFormData({ ...formData, furnishings: { ...formData.furnishings, kitchen: [e.target.value] } }))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Address", formData.location.address, "Local Address", (e) => updateField("location", "address", e.target.value), "text", 2, "", "", "", true)}
            <div className="flex flex-col col-span-1">
              <label className="text-[20px] poppins-medium text-gray-700 mb-1">City<span className="text-red-600"> *</span></label>
              <select
                value={formData.location.city}
                onChange={(e) => {
                  const selectedCity = e.target.value;
                  const correspondingState = cityStateMap[selectedCity] || "";
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      city: selectedCity,
                      state: correspondingState,
                    },
                  });
                }}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
              >
                <option value="">Select City</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            {renderInput("State", formData.location.state, "State", (e) => updateField("location", "state", e.target.value), "text", 1, "", "", "", true)}
            {renderInput("Zip Code", formData.location.zip_code, "Eg : 560068", (e) => updateField("location", "zip_code", e.target.value), "text", 1, "", "", "", true)}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.images.map((img, i) => (
              <div key={i}>
                <label className="text-[20px] text-gray-600">Image {i + 1}<span className="text-red-600"> *</span></label>
                <input
                  className="p-4 input w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#e8e8ff] transition-all duration-300 ease-in-out"
                  placeholder="Image URL"
                  value={img}
                  onChange={(e) => {
                    const updated = [...formData.images];
                    updated[i] = e.target.value;
                    setFormData({ ...formData, images: updated });
                  }}
                />
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.contacts.map((contact, i) => (
              <div key={i} className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderInput("Name", contact.name, "Owner Name", (e) => {
                  const contacts = [...formData.contacts];
                  contacts[i].name = e.target.value;
                  setFormData({ ...formData, contacts });
                }, "text", 1, "", "", "", true)}
                {renderInput("Phone", contact.phone, "Owner Phone No.", (e) => {
                  const contacts = [...formData.contacts];
                  contacts[i].phone = e.target.value;
                  setFormData({ ...formData, contacts });
                }, "text", 1, "", "", "", true)}
                {renderInput("Email", contact.email, "Owner Email", (e) => {
                  const contacts = [...formData.contacts];
                  contacts[i].email = e.target.value;
                  setFormData({ ...formData, contacts });
                }, "email", 1, "", "", "", true)}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="p-8 w-full min-h-screen max-w-full mx-auto bg-[#F5F6FA] shadow-lg rounded-lg">
        <div className="flex justify-between mb-6">
          {steps.map((label, i) => (
            <div
              key={i}
              className={`flex-1 text-center py-2 border-b-4 transition-all duration-300 ease-in-out
              ${step === i ? "border-[#4F46E5] text-[#4F46E5] poppins-semibold text-[20px]" : "border-gray-300 text-gray-400"}
            `}
            >
              {i + 1}. {label}
            </div>
          ))}
        </div>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          <button
            className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#928df5] transition-all duration-300 ease-in-out"
            onClick={prevStep}
            disabled={step === 0}
          >
            Back
          </button>
          {step === steps.length - 1 ? (
            <button
              className="bg-[#4F46E5] text-white px-6 py-2 rounded hover:bg-[#928df5] transition-all duration-300 ease-in-out"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-[#4F46E5] text-white px-6 py-2 rounded hover:bg-[#928df5] transition-all duration-300 ease-in-out"
              onClick={nextStep}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProperties;
