import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { CustomButton, FormField } from "../../components";
import { checkIfImage } from "../../utils";
import { useStateContext } from "../../context";

export function CreateCampaigns() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign, address } = useStateContext(); // Access the address from context
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    targetGoal: "",
    deadline: "",
    image: "",
    charity_org: "trustchain",
    support_keyword: "all",
  });

  // handles key presses event and updates the new field value
  function handleFormFieldChange(fieldName, e) {
    setForm({ ...form, [fieldName]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if MetaMask is installed
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to proceed.");
      return;
    }

    // Check if the user is connected
    if (!address) {
      alert("Please connect your wallet to create a charity project.");
      return;
    }

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true); // while campaign is being created!
        try {
          // Attempt to create the campaign
          await createCampaign({
            ...form,
            targetGoal: ethers.utils.parseEther(form.targetGoal),
          });

          // If successful, navigate to the dashboard
          navigate("/charity-dashboard");
        } catch (error) {
          // Handle specific error scenarios
          if (error.message.includes("User rejected")) {
            alert("Transaction was rejected. Please try again.");
          } else {
            console.error("Error creating campaign:", error);
            alert("Error creating campaign. Please try again.");
          }
        } finally {
          setIsLoading(false); // Reset loading state
        }
      } else {
        alert("Provide a valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  }

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center flex-column rounded-5 w-md-75 w-sm-100 p-4">
      {isLoading && "Loading..."}
      <div className="d-flex justify-content-center align-items-center px-2 py-1 rounded">
        <h1 className="text-white">Start a Charity Project</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 d-flex flex-column column-gap-4"
      >
        <div className="d-flex column-gap-4">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="d-flex column-gap-4">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.targetGoal}
            handleChange={(e) => handleFormFieldChange("targetGoal", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Project Image *"
          placeholder="Place image URL of your charity project"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="d-flex column-gap-4">
          <FormField
            labelName="Charity Organization Name *"
            placeholder="Mention the cause campaign supports (education, healthcare, etc.)"
            inputType="text"
            value={form.charity_org}
            handleChange={(e) => handleFormFieldChange("charity_org", e)}
          />
          <FormField
            labelName="Supported Cause *"
            placeholder="Mention the cause campaign supports (education, healthcare, etc.)"
            inputType="text"
            value={form.support_keyword}
            handleChange={(e) => handleFormFieldChange("support_keyword", e)}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center mt-4">
          <CustomButton
            btnType="submit"
            title="Create Charity Project"
            styles="bg-primary"
          />
        </div>
      </form>
    </div>
  );
}
