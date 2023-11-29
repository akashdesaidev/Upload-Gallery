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
import { useStore } from "@/store/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";

export function DeletDialog() {
  const [filedID, setFieldId, isDeleteModalOpen, setIsDeleteModelOpen] =
    useStore((state) => [
      state.fieldId,
      state.setFieldId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]);
  const { user } = useUser();
  const handleDelete = async (id: string) => {
    if (!user || !filedID) return;

    await deleteDoc(doc(db, "users", user.id, "files", filedID));
    setFieldId("");
    setIsDeleteModelOpen(false);
  };
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModelOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action can't be undone. This will permanently delete your file
            !
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="px-3 flex-1"
            onClick={() => setIsDeleteModelOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            type="submit"
            variant="destructive"
            className="px-3 flex-1"
            onClick={() => {
              handleDelete(filedID as string);
            }}
          >
            <span className="sr-only">Cancel</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
