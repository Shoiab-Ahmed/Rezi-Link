import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = ["Basic Details", "Configuration", "Location & Tags", "Upload Images", "Contacts"];

const AddProperties = () => {
  const navigate = useNavigate()
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

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const updateField = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const renderInput = (label, value,placeholder, onChange, type = "text", span = 1,inputClass = "", labelClass = "",wrapperClass = "") => (
    <div className={`col-span-${span} ${wrapperClass}`}>
    <label className={`text-sm poppins-regular text-[20px] text-gray-600 ${labelClass} poppins-semibold`}>
      {label}
    </label>
    <input
    placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={`px-4 py-4 input w-full mt-2 border border-gray-400 poppins-regular rounded-md  focus:border-[#e8e8ff] transition-all duration-300 ease-in-out ${inputClass}`}
    />
  </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {renderInput("Title", formData.title,"Property Name ", (e) => setFormData({ ...formData, title: e.target.value }), "", 1 ,)}
            {renderInput("Property Type", formData.property_type,"Select Property Type ", (e) => setFormData({ ...formData, property_type: e.target.value }))} 
            {renderInput("Price", formData.price,"Property Amount ", (e) => setFormData({ ...formData, price: e.target.value }), "number")}
            {renderInput("Area (sqft)", formData.area_sqft,"Eg : 1200 ", (e) => setFormData({ ...formData, area_sqft: e.target.value }), "number")}
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
            {renderInput("Bedrooms", formData.configuration.bedrooms,"Eg : 3 ", (e) => updateField("configuration", "bedrooms", e.target.value), "number")}
            {renderInput("Bathrooms", formData.configuration.bathrooms,"Eg : 2 ", (e) => updateField("configuration", "bathrooms", e.target.value), "number")}
            {renderInput("Furnishing - Bedroom", formData.furnishings.bedroom[0],"Brdroom Furnitures ", (e) => setFormData({ ...formData, furnishings: { ...formData.furnishings, bedroom: [e.target.value] } }))}
            {renderInput("Furnishing - Hall", formData.furnishings.hall[0],"Hall Furnitures", (e) => setFormData({ ...formData, furnishings: { ...formData.furnishings, hall: [e.target.value] } }))}
            {renderInput("Furnishing - Kitchen", formData.furnishings.kitchen[0],"Kitchen Furnitures ", (e) => setFormData({ ...formData, furnishings: { ...formData.furnishings, kitchen: [e.target.value] } }))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Address", formData.location.address,"Local Address ", (e) => updateField("location", "address", e.target.value), "text", 2)}
            {renderInput("City", formData.location.city,"Bangalore , Mumbai , Hyderabad & Delhi ", (e) => updateField("location", "city", e.target.value))}
            {renderInput("State", formData.location.state,"State ", (e) => updateField("location", "state", e.target.value))}
            {renderInput("Zip Code", formData.location.zip_code,"Eg : 560068 ", (e) => updateField("location", "zip_code", e.target.value))}
            {renderInput("Google Maps URL", formData.location.maps,"link to map ", (e) => updateField("location", "maps", e.target.value), "text", 2)}
            {renderInput("Tag 1", formData.tags[0],"optional", (e) => setFormData({ ...formData, tags: [e.target.value, formData.tags[1], formData.tags[2]] }))}
            {renderInput("Tag 2", formData.tags[1],"optional", (e) => setFormData({ ...formData, tags: [formData.tags[0], e.target.value, formData.tags[2]] }))}
            {renderInput("Tag 3", formData.tags[2],"optional", (e) => setFormData({ ...formData, tags: [formData.tags[0], formData.tags[1], e.target.value] }))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
            {formData.images.map((img, i) => (
              <div key={i} className="">
                <label className=" poppins-semibold text-[20px] text-sm poppins-regular text-gray-600 p-4">{`Image ${i + 1} URL`}</label>
                <input
                  className="p-4 input w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-[#e8e8ff] transition-all duration-300 ease-in-out"
                  placeholder="Eg : https://imagecdn.99acres.com/media1/24795/4/495904524M-1717478704466.jpg"
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
                {renderInput("Name", contact.name,"Owner Name", (e) => {
                  const contacts = [...formData.contacts];
                  contacts[i].name = e.target.value;
                  setFormData({ ...formData, contacts });
                })}
                {renderInput("Phone", contact.phone,"Owner Phone No.", (e) => {
                  const contacts = [...formData.contacts];
                  contacts[i].phone = e.target.value;
                  setFormData({ ...formData, contacts });
                })}
                {renderInput("Email", contact.email,"Owner Email", (e) => {
                  const contacts = [...formData.contacts];
                  contacts[i].email = e.target.value;
                  setFormData({ ...formData, contacts });
                })}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try{
    const response = await axios.post("http://127.0.0.1:5000/properties",
      formData,{
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
   
      navigate('/my-properties')
    
   }
   catch(error){
    console.log(error)
   }
  };

  return (
    <> <Navbar2/>
     <div className="p-8 w-full min-h-screen max-w-full mx-auto bg-[#F5F6FA] shadow-lg rounded-lg">
     
     {/* Stepper */}
     <div className="flex justify-between mb-6">
       {steps.map((label, i) => (
         <div
           key={i}
           className={`flex-1 text-center py-2 border-b-4 ${step === i ? "border-[#4F46E5]  poppins-regular text-[20px] " : "border-gray-300 text-gray-400"}`}
         >
           {i + 1}. {label}
         </div>
       ))}
     </div>

     {/* Form Step */}
     {renderStep()}

     {/* Buttons */}
     <div className="mt-8 flex justify-between">
       <button
         className="bg-[#4F46E5]  text-white px-4 py-2 rounded hover:bg-[#928df5]   transition-all duration-300 ease-in-out"
         onClick={prevStep}
         disabled={step === 0}
       >
         Back
       </button>
       {step === steps.length - 1 ? (
         <button
           className="bg-[#4F46E5]  text-white px-6 py-2 rounded hover:bg-[#928df5]  transition-all duration-300 ease-in-out"
           onClick={handleSubmit}
         >
           Submit
         </button>
       ) : (
         <button
           className="bg-[#4F46E5]  text-white px-6 py-2 rounded hover:bg-[#928df5]  transition-all duration-300 ease-in-out"
           onClick={nextStep}
         >
           Next
         </button>
       )}
     </div>
   </div></>
   
  );
};

export default AddProperties;
