"use client";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { cloneElement, useState } from "react";
import Dropzone from "react-dropzone";
const DropzoneComponent = () => {
  //max size allowed 20 mb;
  const maxsize = 2971520;

  const [isLoding, setLoading] = useState(false);
  const { user } = useUser();

  const onDrop = (acceptedFiles: File[]): void => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        
        await uploadDoc(file);
      };
      reader.readAsArrayBuffer(file);
    });

    const uploadDoc = async (file: File) => {
      
      if (isLoding) return;
      if (!user) return;
      setLoading(true);

      const docref = await addDoc(collection(db, "users", user.id, "files"), {
        userID: user.id,
        filename: file.name,
        fullname: user.fullName,
        timestamp: serverTimestamp(),
        type: file.type,
        size: file.size,
      });
      const imageref = ref(storage, `users/${user.id}/files/${docref.id}`);
      uploadBytes(imageref, file).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageref);

        await updateDoc(doc(db, "users", user.id, "files", docref.id), {
          downloadURL,
        });
    
      });
      setLoading(false);
    };
  };
  return (
    <Dropzone
      minSize={0}
      maxSize={maxsize}
      onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
        isDragAccept,
      }) => {
        const isFileTooLoarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxsize;
        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "m-4 border border-slate-500 flex max-w-full items-center justify-center h-52 border-dashed rounded-lg",
                isDragActive && "bg-blue-300 text-white"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive &&
                "click here or drop a file to upload to your account!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File Type not accpeted, sorry!"}
              {isFileTooLoarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DropzoneComponent;
