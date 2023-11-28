import { FileType } from "@/Typings";
import DropzoneComponent from "@/components/Dropzone";
import Table from "@/components/Table";
import { db } from "@/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDoc, getDocs } from "firebase/firestore";

import React, { Suspense } from "react";

const page = async () => {
 
  return (
    <div>
      <DropzoneComponent />
      <Suspense fallback={<div>loading...</div>}>
        <Table  />
      </Suspense>
    </div>
  );
};

export default page;
