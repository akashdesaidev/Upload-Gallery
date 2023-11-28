"use client";
import { Suspense, useEffect, useState } from "react";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/columns";
import { FileType } from "@/Typings";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { auth, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Table = ({ tableData }: { tableData: FileType[] }) => {
  const { user } = useUser();
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [initialData, setInitaiilData] = useState(tableData);
  const [docs] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id!, "files"),
        orderBy("timestamp", sort)
      )
  );
  useEffect(() => {
    if (!docs) return;

    const newtableData: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      fullname: doc.data().fullname,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      type: doc.data().type,
      size: doc.data().size,
      downloadURL: doc.data().downloadURL,
    }));

    setInitaiilData(newtableData);
  }, [docs]);
  return (
    <div>
      <Button
        className="mb-4"
        onClick={() => setSort(sort == "desc" ? "asc" : "desc")}
      >
        Sort by
        {sort === "desc" ? " Oldest" : " Newest"}
      </Button>
      <Suspense fallback={<div>loading...</div>}>
        <DataTable columns={columns} data={initialData} />
      </Suspense>
    </div>
  );
};

export default Table;
