import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;

  fieldId: string | null;
  setFieldId: (filedID: string) => void;

  filename: string | null;
  setFileName: (filename: string) => void;
}

const useStore = create<AppState>((set) => ({
  fieldId: null,
  setFieldId: (id: string) => set((state: AppState) => ({ fieldId: id })),

  filename: "",
  setFileName: (name: string) => (state: AppState) => ({ filename: name }),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) =>
    set((state: AppState) => ({ isDeleteModalOpen: open })),
  isEditModalOpen: false,
  setIsEditModalOpen: (open) =>
    set((state: AppState) => ({ isEditModalOpen: open })),
}));
