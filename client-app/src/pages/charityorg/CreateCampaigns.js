import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
// import { money } from "../assets";
import { CustomButton, FormField } from "../../components";
import { checkIfImage } from "../../utils";
import { useStateContext } from "../../context";

export function CreateCampaigns() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    targetGoal: "",
    deadline: "",
    image: "",
    support_keyword: "all",
    //documents etc.
  });

  //handles key presses event and updates the new field value
  function handleFormFieldChange(fieldName, e) {
    setForm({ ...form, [fieldName]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true); //while campaign been creating!
        await createCampaign({
          ...form,
          targetGoal: ethers.utils.parseEther(form.targetGoal),
        });
        setIsLoading(false); //campaign created
        navigate("/charity-dashboard");
      } else {
        alert("Provide valid image URL");
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

        {/* <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div> */}

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
          labelName="Project image *"
          placeholder="Place image URL of your charity project"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <FormField
          labelName="Supported Cause *"
          placeholder="Mention the cause campign supports (education, healthcare etc.)"
          inputType="text"
          value={form.support_keyword}
          handleChange={(e) => handleFormFieldChange("support_keyword", e)}
        />

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
