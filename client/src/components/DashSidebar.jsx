import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice.js";

export default function DashSidebar() {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    dispatch(signOut());
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to sign out");
      }
      dispatch(signOut());
    } catch (error) {
        console.error("Error signing out:", error);
    }
  };

    const location = useLocation();
      const [tab, setTab] = useState(location.state?.tab || "profile");
      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        setTab(tabFromUrl || "profile");
      }, [location.search]); 
  return (
    <Sidebar className="w-full md:w-56 " >
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                
                <Sidebar.Item href={"/dashboard?tab=profile"} active={tab === "profile"} icon={HiUser}  label={"User"} labelColor='dark'>
                    Profile
                </Sidebar.Item>

                <Sidebar.Item active={tab === "signout"}s icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
)
}
