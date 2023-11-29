"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/firebase";
import { AppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Input } from "./ui/input";

export function EditDialog() {
  const [filedID, setFieldId, isEditModalOpen, setIsEditModelOpen] = AppStore(
    (state) => [
      state.fieldId,
      state.setFieldId,
      state.isEditModalOpen,
      state.setIsEditModalOpen,
    ]
  );

  const [input, setInput] = useState("");
  const { user } = useUser();
  const handleEdit = async (id: string) => {
    if (!user || !filedID) return;

    await updateDoc(doc(db, "users", user.id, "files", filedID), {
      filename: input,
    });
    setFieldId("");
    setInput("");
    setIsEditModelOpen(false);
  };
  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={(isOpen) => {
        setIsEditModelOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename your file</DialogTitle>
          <DialogDescription>
            Please enter the desired name for this file !
          </DialogDescription>
        </DialogHeader>

        <Input onChange={(e) => setInput(e.target.value)} />

        <div className="flex space-x-2 py-3">
          <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="px-3 flex-1"
            onClick={() => setIsEditModelOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            type="submit"
            className="px-3 flex-1"
            onClick={() => {
              handleEdit(filedID as string);
            }}
          >
            <span className="sr-only">Cancel</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
