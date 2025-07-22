import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError("Email and password can not be empty.");
    }
    try {
      setLoader(true);
      setError(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setError(data.message);
      }
      setLoader(false);
      if (res.ok) {
        navigate('/')
      }
    } catch (error) {
      setError(error.message);
      setLoader(false);
    }
  };
  return (
    <div className="min-h-screen mt-20 gap-5">
      <div className="flex p-3 max-w-3xl  mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              RMS's
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmission}>
            <div>
              <Label value="Email"></Label>
              <TextInput
                type="email"
                placeholder="abc@gmail.com"
                id="email"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Password"></Label>
              <TextInput
                type="password"
                placeholder="*****"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loader}
            >
              {loader ? (
                <>
                  <Spinner size="sm"></Spinner>
                  <span className="pl-3">Loadding...</span>
                </>
              ) : (
                "Sign Ip"
              )}
            </Button>
            
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account ?</span>
            <Link to="/sign-up" className="text-blue-400">
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
