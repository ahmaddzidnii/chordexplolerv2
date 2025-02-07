"use client";

import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import { AuthUser } from "@/types";
import ProfileDropdown from "@/features/auth/components/ProfileDropdown";
import ApplicationLogo from "./Logo";
import AddEntityDropdown from "./AddEntityDropdown";
import { MenuSidebarButton } from "./MenuSidebarButton";

const Navbar = ({ user }: { user: AuthUser | null }) => {
  const formSearchRef = useRef<HTMLFormElement>(null);

  const handleResetButton = () => {
    formSearchRef.current?.reset();
  };

  return (
    <header className="flex justify-between items-center py-[10px] mx-4">
      <MenuSidebarButton />
      <ApplicationLogo />
      <div className="search-group">
        <form
          className="input-container"
          ref={formSearchRef}
        >
          <CiSearch className="size-6 ml-4" />
          <Input
            className="search-input"
            placeholder="Search"
          />
          <IoMdClose
            role="button"
            onClick={handleResetButton}
            className="close-btn"
          />
        </form>
      </div>
      <div className="flex items-center justify-end flex-1">
        <CiSearch className="size-6 mr-4 md:hidden" />
        <div className="mr-4">
          <AddEntityDropdown />
        </div>
        <ProfileDropdown user={user}>
          <button>
            <Avatar className="size-9">
              <AvatarImage
                src={
                  user?.avatar ??
                  "https://is3.cloudhost.id/chordexploler/chordexploler/images/124599.jpeg"
                }
              />
              <AvatarFallback>{user?.name.charAt(0).toUpperCase() ?? "Err"}</AvatarFallback>
            </Avatar>
          </button>
        </ProfileDropdown>
      </div>
    </header>
  );
};

const NavbarSpacer = () => {
  return <div className="h-[1px] bg-border" />;
};

export { Navbar, NavbarSpacer };
