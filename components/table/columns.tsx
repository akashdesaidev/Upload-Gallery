"use client";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileType } from "@/Typings";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { fileColorMapping } from "@/fileColors";
import {
  ArrowDown,
  ArrowDownNarrowWide,
  Download,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { AppStore } from "@/store/store";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="w-6 md:w-10">
          <FileIcon
            extension={extension}
            labelColor={fileColorMapping[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
    cell: ({ renderValue, cell,row, ...props }) => {
      const [filedID, setFieldId, setIsEditModelOpen] = AppStore((state) => [
        state.fieldId,
        state.setFieldId,
        state.setIsEditModalOpen,
      ]);

      const openEdit = (fieldId: string) => {
        setFieldId(fieldId);
        setIsEditModelOpen(true);
      };
      

      return (
        <button className="flex" onClick={() => openEdit(row.original.id)}>
          <span className=" flex text-blue-300 gap-4">
            <div>{renderValue() as string}</div>
            <PencilIcon className="w-3 " />
          </span>
        </button>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Upload",
    cell: ({ renderValue, ...props }) => {
      const date = renderValue() as Date;

      return (
        <div>
          <div>{date.toLocaleDateString()}</div>
          <div>{date.toLocaleTimeString()}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="underline flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          <span className="hidden md:flex">Download</span>
          <span>
            <Download />
          </span>
        </a>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Delete",
    cell: ({ renderValue, row, ...props }) => {
      const [filedID, setFieldId, isDeleteModalOpen, setIsDeleteModelOpen] =
        AppStore((state) => [
          state.fieldId,
          state.setFieldId,
          state.isDeleteModalOpen,
          state.setIsDeleteModalOpen,
        ]);

      const openDelete = (fieldId: string) => {
        setFieldId(fieldId);
        setIsDeleteModelOpen(true);
      };

      return (
        <Button
          variant={"ghost"}
          onClick={() => openDelete(renderValue() as string)}
        >
          <TrashIcon className="w-10" />
        </Button>
      );
    },
  },
];
