import { FileType } from "@/Typings";
import DropzoneComponent from "@/components/Dropzone";
import Table from "@/components/Table";
import { db } from "@/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDoc, getDocs } from "firebase/firestore";

import React, { Suspense } from "react";

const page = async () => {
  const { userId } = auth();
  const StoredFiles = await getDocs(collection(db, "users", userId!, "files"));

  const tableData: FileType[] = StoredFiles.docs.map((doc) => ({
    id: doc.id,
    fullname: doc.data().fullname,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    type: doc.data().type,
    size: doc.data().size,
    downloadURL: doc.data().downloadURL,
  }));

  return (
    <div>
      <DropzoneComponent />
      <Suspense fallback={<div>loading...</div>}>
        <Table tableData={tableData} />
      </Suspense>
    </div>
  );
};

export default page;
