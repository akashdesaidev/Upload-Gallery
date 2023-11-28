import { Suspense } from "react";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/columns";
import { FileType } from "@/Typings";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { auth } from "@clerk/nextjs";

const Table = async () => {
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
      <Suspense fallback={<div>loading...</div>}>
        <DataTable columns={columns} data={tableData} />
      </Suspense>
    </div>
  );
};

export default Table;
