"use client";
import React, { useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { RiMusicAiLine } from "react-icons/ri";
import { RiFeedbackFill } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { SiGoogleanalytics } from "react-icons/si";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { AuthUser } from "@/types";
import { useSidebarStore } from "@/store/useSidebarStore";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarItem } from "./SidebarItem";

const sidebars = {
  MID_SECTION: [
    { title: "Dashboard", icon: MdDashboard, href: "/studio/dashboard", rootName: "dashboard" },
    {
      title: "Songs",
      icon: RiMusicAiLine,
      href: "/studio/songs?type=all&page=1&limit=50",
      rootName: "songs",
    },
    {
      title: "Analytics",
      icon: SiGoogleanalytics,
      href: "/studio/analytics",
      rootName: "analytics",
    },
    { title: "Comments", icon: FaComment, href: "/studio/comments", rootName: "comments" },
    {
      title: "Subscribers",
      icon: IoMdPeople,
      href: "/studio/subscribers",
      rootName: "subscribers",
    },
  ],
  BOTTOM_SECTION: [
    { title: "Settings", icon: CiSettings, href: "/studio/settings", rootName: "settings" },
    { title: "Feedback", icon: RiFeedbackFill, href: "/studio/feedback", rootName: "feedback" },
  ],
};

const Sidebar = ({ user }: { user: AuthUser | null }) => {
  const pathname = usePathname();

  return (
    <>
      <SidebarMobile user={user} />
      <div className="w-[255px] border-r  flex-col justify-between h-[calc(100vh-56px)] ml-4 hidden xl:flex">
        <div className="w-full h-[208px] flex items-center flex-col justify-center">
          <Avatar className="size-28">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name.charAt(0).toUpperCase() ?? "Err"}</AvatarFallback>
          </Avatar>
          <div className="text-center mt-2">
            <span className="text-xl font-bold">Channel Anda</span>
            <p className="text-sm">{user?.name ?? "Placeholder"}</p>
          </div>
        </div>
        <ul className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin pr-3">
          {sidebars["MID_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
              isActive={pathname.includes(sidebar.rootName)}
            />
          ))}
        </ul>
        <ul className="pr-3 border-t">
          {sidebars["BOTTOM_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const SidebarMobile = ({ user }: { user: AuthUser | null }) => {
  const { isOpen, toggle, close } = useSidebarStore();
  const pathname = usePathname();

  useEffect(() => {
    close();
  }, [pathname]);
  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={toggle}
    >
      <SheetContent
        side="left"
        className="w-[255px] border-r flex-col justify-between  ml-4  flex xl:hidden"
      >
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>
        <div className="w-full h-[208px] flex items-center flex-col justify-center">
          <Avatar className="size-28">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name.charAt(0).toUpperCase() ?? "Err"}</AvatarFallback>
          </Avatar>
          <div className="text-center mt-2">
            <span className="text-xl font-bold">Channel Anda</span>
            <p className="text-sm">{user?.name ?? "Placeholder"}</p>
          </div>
        </div>
        <ul className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin pr-3">
          {sidebars["MID_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
              isActive={pathname.includes(sidebar.rootName)}
            />
          ))}
        </ul>
        <ul className="pr-3 border-t">
          {sidebars["BOTTOM_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
            />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
