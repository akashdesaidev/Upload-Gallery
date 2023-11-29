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
    cell: ({ renderValue, ...props }) => {
      return (
        <div className="text-xs md:text-sm w-10">
          <div>{renderValue() as string}</div>
          <PencilIcon className="w-4" /> ...
        </div>
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
          <div>
            {date.toLocaleDateString()}
          </div>
          <div>
            {date.toLocaleTimeString()}
          </div>
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
    cell: ({ renderValue, ...props }) => {
      return (
        <Button variant={"ghost"} className="">
          <TrashIcon className="w-10"/>
        </Button>
      );
    },
  },
];
