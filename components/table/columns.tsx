"use client";
import {FileIcon,defaultStyles} from "react-file-icon"
import { FileType } from "@/Typings";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { fileColorMapping } from "@/fileColors";


export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension:string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon extension={extension}
          labelColor={fileColorMapping[extension]}
          //@ts-ignore
          {...defaultStyles[extension]} />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "size",
    header: "size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Upload Date",
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="underline text-blue-500 hover:text-blue-600"
        >
          Download
        </a>
      );
    },
  },
];
