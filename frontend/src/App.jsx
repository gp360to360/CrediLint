import React, { useRef, useState } from "react";
import axios from "axios";

export default function App() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    companyUEN: "",
    companyName: "",
    fullName: "",
    position: "",
    email: "",
    reEmail: "",
    mobile: "",
    file: null,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, file: files?.[0] ?? null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isCompanyInfoComplete = formData.companyUEN && formData.companyName;
  const isApplicantInfoComplete =
    formData.fullName &&
    formData.position &&
    formData.email &&
    formData.reEmail &&
    formData.mobile;
  const isUploadComplete = formData.file;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      await axios.post("http://localhost:3000/form", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Form submitted!");

      setFormData({
        companyUEN: "",
        companyName: "",
        fullName: "",
        position: "",
        email: "",
        reEmail: "",
        mobile: "",
        file: null,
        termsAccepted: false,
      });

      formRef.current.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          SME Health Check Application
        </h1>

        {/* Company Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            1. Company Information
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="companyUEN"
              placeholder="Company UEN"
              className="input"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="input"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Applicant Information */}
        <div className={`${!isCompanyInfoComplete ? "opacity-50 pointer-events-none" : ""}`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            2. Applicant Information
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position within company"
              className="input"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="reEmail"
              placeholder="Re-enter Email Address"
              className="input"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              className="input"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Upload Section */}
        <div className={`${!isApplicantInfoComplete ? "opacity-50 pointer-events-none" : ""}`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            3. Upload Documents
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              className="file-input"
              onChange={handleChange}
              required
            />
            <span className="text-sm text-gray-500">
              Accepted formats: PDF, DOC, DOCX
            </span>
          </div>
        </div>

        {/* Terms and Submit */}
        <div
          className={`flex flex-col gap-4 ${
            !isUploadComplete ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <label className="inline-flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="termsAccepted"
              onChange={handleChange}
              required
              className="mt-1"
            />
            <span>
              I confirm that the information provided above is accurate. I have
              read and agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                terms and conditions
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={!formData.termsAccepted}
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
