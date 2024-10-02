"use client";

import React, { useEffect, useState } from "react";
import noPhoto from "../../../../../public/images/no-photo.jpg";
import Image from "next/image";
import { getInitial } from "./utils";
import { fetchAgentData, updateAgentData } from "./actions";
import { useForm } from "./hooks";
import InputField from "./input-field/input-field";
import { AgentDetails } from "./types";
import { useAuth } from "@/contexts/auth-provider";
import { useToast } from "@/contexts/toast-context";
import { ToastContainer } from "react-toastify";
import ProfileSkeleton from "@/theme/components/profile-preloader";

type Props = {
  params: { id: string };
};

const AgentProfile = ({ params }: Props) => {
  const { values: formData, setValues: setFormData } = useForm<AgentDetails>({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    profile_picture: "",
    profile_picture_preview: "",
    license_number: "",
    agency_name: "",
    agency_address: "",
    years_of_experience: 0,
    specializations: "",
    government_id: "",
    linked_in_profile: "",
    website: "",
    marketing_preferences: false,
    preferred_communication_channels: "",
    languages_spoken: "",
    service_areas: "",
    professional_bio: "",
    certifications_awards: "",
    references: "",
  });
  const [agent, setAgent] = useState<AgentDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [profilePictureError, setProfilePictureError] = useState<string | null>(
    null
  );

  const { updateAgent } = useAuth();
  const { showToast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    if (agent) {
      for (const key in agent) {
        if (
          key === "_id" ||
          key === "user_id" ||
          key === "public_id" ||
          key === "profile_picture" ||
          key === "email" ||
          key === "created_at" ||
          key === "__v"
        )
          continue;
        const value = (agent as any)[key];
        if (value !== undefined && value !== null && value !== "") {
          data.append(key, value);
        }
      }
      const profilePicture = agent.profile_picture as File | string;
      if (
        profilePicture &&
        typeof profilePicture !== "string" &&
        profilePicture instanceof File
      ) {
        data.append("image", profilePicture);
      } else if (!profilePicture) {
        const response = await fetch(noPhoto.src);
        const blob = await response.blob();
        data.append("image", blob, "no-photo.jpg");
      }
    }

    if (agent?._id) {
      try {
        const response = await updateAgentData(agent._id, data);
        setAgent({
          ...agent,
          ...response.agent,
        });
        updateAgent({ ...agent, ...response.agent });
        setActiveTab("profile");
        showToast("Profile updated successfully!", "success");
      } catch (err) {
        console.error("Error updating agent data:", err);
        showToast("Error updating profile. Please try again.", "error");
      }
    } else {
      console.error("Agent ID is undefined");
      showToast("Agent ID is undefined. Please try again.", "error");
    }
  };
  const handleRemoveProfilePicture = () => {
    setAgent((prevValues: any) => ({
      ...prevValues,
      profile_picture: "",
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!allowedTypes.includes(file.type)) {
          setProfilePictureError("Only PNG, JPG, and JPEG files are allowed.");
          return;
        }

        if (file.size > maxSize) {
          setProfilePictureError("File size must be less than 2MB.");
          return;
        }

        setProfilePictureError(null);
        newValue = file;
      }
    } else if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }

    setAgent((prevValues: any) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAgentData();

        setAgent(data.data.agent_id);
        setFormData(data.data.agent_id);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching agent data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, setFormData]);

  if (loading) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-20 my-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex flex-col sm:flex-row space-x-4">
            <button
              className={`py-2 px-4 ${
                activeTab === "profile"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Details
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "details"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Additional Details
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "edit"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              Edit Profile
            </button>
          </nav>
        </div>

        {activeTab === "profile" && (
          <div className="flex flex-col items-center space-y-4 mt-6 max-h-[600px] overflow-y-auto scrollable-container px-2">
            {agent?.profile_picture ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/images/${agent.profile_picture}`}
                alt="Profile"
                className="w-32 h-32 rounded-full"
                width={128}
                height={128}
              />
            ) : (
              <div className="initial-circle flex items-center justify-center w-32 h-32 bg-purple-700 text-white rounded-full text-2xl font-bold">
                {getInitial(`${agent?.first_name} ${agent?.last_name}`)}
              </div>
            )}
            <p className="text-lg font-semibold">
              <span>Name:</span> {agent?.first_name} {agent?.last_name}
            </p>
            <div className="overflow-x-auto w-full">
              <table className="border-collapse border bg-white border-gray-200 w-full">
                <tbody>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Email
                    </th>
                    <td className="px-4 py-2 text-gray-800">{agent?.email}</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Phone
                    </th>
                    <td className="px-4 py-2 text-gray-800">{agent?.mobile}</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      License no
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.license_number}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Agency Name
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.agency_name}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Agency Address
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.agency_address}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "details" && (
          <div className="flex flex-col items-center space-y-4 mt-6 max-h-[600px] overflow-y-auto scrollable-container px-2">
            <div className="overflow-x-auto w-full">
              <table className="border-collapse border bg-white border-gray-200 w-full">
                <tbody>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Year of Experience
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.years_of_experience}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Specializations
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.specializations}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Govt ID
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.government_id}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      LinkedIn Profile
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      <a
                        href={agent?.linked_in_profile}
                        className="text-blue-600 hover:underline"
                      >
                        {agent?.linked_in_profile}
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Website
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      <a
                        href={agent?.website}
                        className="text-blue-600 hover:underline"
                      >
                        {agent?.website}
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Marketing Preferences
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.marketing_preferences ? (
                        <h3>Yes</h3>
                      ) : (
                        <h3>No</h3>
                      )}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Communication Channel
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.preferred_communication_channels}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Language Spoken
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.languages_spoken}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Service Areas
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.service_areas}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Bio
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.professional_bio}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      Certifications
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.certifications_awards}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <th className="px-4 py-2 text-left text-gray-600 font-bold">
                      References
                    </th>
                    <td className="px-4 py-2 text-gray-800">
                      {agent?.references}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "edit" && (
          <div className="mt-6 max-h-[600px] overflow-y-auto scrollable-container px-2">
            <h2 className="text-3xl font-bold text-center mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <InputField
                label="Full Name"
                name="fullname"
                type="text"
                value={`${agent?.first_name} ${agent?.last_name}`}
                onChange={handleChange}
                disabled
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={agent?.email || ""}
                onChange={handleChange}
                required
                disabled
              />
              <InputField
                label="Phone Number"
                name="mobile"
                type="tel"
                value={agent?.mobile || ""}
                onChange={handleChange}
                required
              />
              <InputField
                label="Profile Picture"
                name="profile_picture"
                type="file"
                onChange={handleChange}
              />
              <div className="flex items-center justify-center">
                {agent?.profile_picture && (
                  <div className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}/images/${agent.profile_picture}`}
                      alt="Profile"
                      className="w-32 h-32 rounded-full"
                      width={128}
                      height={128}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveProfilePicture}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              {profilePictureError && (
                <p className="text-red-500">{profilePictureError}</p>
              )}

              <InputField
                label="Agency Name"
                name="agency_name"
                type="text"
                value={agent?.agency_name || ""}
                onChange={handleChange}
              />
              <InputField
                label="Agency Address"
                name="agency_address"
                type="text"
                value={agent?.agency_address || ""}
                onChange={handleChange}
              />
              <InputField
                label="License Number"
                name="license_number"
                type="text"
                value={agent?.license_number || ""}
                onChange={handleChange}
              />
              <InputField
                label="Government ID"
                name="government_id"
                type="text"
                value={agent?.government_id || ""}
                onChange={handleChange}
              />
              <InputField
                label="Languages Spoken (comma-separated)"
                name="languages_spoken"
                type="text"
                value={agent?.languages_spoken || ""}
                onChange={handleChange}
              />
              <InputField
                label="Service Areas (comma-separated)"
                name="service_areas"
                type="text"
                value={agent?.service_areas || ""}
                onChange={handleChange}
              />
              <InputField
                label="Professional Bio"
                name="professional_bio"
                type="textarea"
                value={agent?.professional_bio || ""}
                onChange={handleChange}
              />
              <InputField
                label="Specializations (comma-separated)"
                name="specializations"
                type="text"
                value={agent?.specializations || ""}
                onChange={handleChange}
              />
              <InputField
                label="Years of Experience"
                name="years_of_experience"
                type="number"
                value={agent?.years_of_experience || ""}
                onChange={handleChange}
              />
              <InputField
                label="Certifications and Awards (comma-separated)"
                name="certifications_awards"
                type="text"
                value={agent?.certifications_awards || ""}
                onChange={handleChange}
              />

              <InputField
                label="LinkedIn Profile"
                name="linked_in_profile"
                type="text"
                value={agent?.linked_in_profile || ""}
                onChange={handleChange}
              />
              <InputField
                label="Website"
                name="website"
                type="text"
                value={agent?.website || ""}
                onChange={handleChange}
              />

              <InputField
                label="Marketing Preferences"
                name="marketing_preferences"
                type="checkbox"
                checked={agent?.marketing_preferences || false}
                onChange={handleChange}
              />
              <InputField
                label="Preferred Communication Channels (comma-separated)"
                name="preferred_communication_channels"
                type="text"
                value={agent?.preferred_communication_channels || ""}
                onChange={handleChange}
              />

              <InputField
                label="References"
                name="references"
                type="text"
                value={agent?.references || ""}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AgentProfile;
