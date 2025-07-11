import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {BsFacebook} from 'react-icons/bs';
const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid q-full justify-between sm:flex md:grid-cols-1 ">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                RMS's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup>
                <Footer.Link href="/" rel="">
                  Basic
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Something" />
              <Footer.LinkGroup>
                <Footer.Link href="/" rel="">
                  Basic
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="More" />
              <Footer.LinkGroup>
                <Footer.Link href="/" rel="">
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex sm:justify-between">
          <Footer.Copyright href="#" by="RMS's Blog" year={new Date().getFullYear()} />
          <div className="flex gap-6 mt-4 sm:mt-4" >
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsFacebook} />


          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
