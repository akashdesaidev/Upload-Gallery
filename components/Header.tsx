import { SignInButton, SignedOut, UserButton, auth } from "@clerk/nextjs";
import { ModeToggle } from "./Toggle";
import { dark } from "@clerk/themes";
import Image from "next/image";
import { Box, FileIcon } from "lucide-react";

const Header = () => {
  const user = auth();
  console.log(user.userId);
  return (
    <header className="bg-gray-100 dark:bg-slate-900 px-3">
      <div className="flex justify-between p-3 items-center">
        <div className="flex font-bold items-center gap-2">
          <Box/>
          <span>Upload Gallery</span>
        </div>
        <div className="flex space-x-5 items-center">
          <ModeToggle />
          {!user.userId ? (
            <SignedOut>
              <SignInButton
                mode="modal"
                afterSignInUrl="/dashboard"
              ></SignInButton>
            </SignedOut>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
