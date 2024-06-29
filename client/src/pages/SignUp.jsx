import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="User Name"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
              ></TextInput>
            </div>
            <div>
              <Label value="Email"></Label>
              <TextInput
                type="email"
                placeholder="abc@gmail.com"
                id="username"
              ></TextInput>
            </div>
            <div>
              <Label value="Password"></Label>
              <TextInput
                type="text"
                placeholder="Password"
                id="username"
              ></TextInput>
            </div>

            <Button 
            type="submit"
            gradientDuoTone='purpleToPink'>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to='/sign-in' className="text-blue-400">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
