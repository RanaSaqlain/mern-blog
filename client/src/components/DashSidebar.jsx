import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function DashSidebar() {

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
                
                <Sidebar.Item active={tab === "signout"} icon={HiArrowSmRight} className="cursor-pointer" >
                    Sign Out
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
)
}
