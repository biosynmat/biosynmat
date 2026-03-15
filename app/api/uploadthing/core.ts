import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  teamImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => ({
    url: file.ufsUrl,
  })),
  publicationImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => ({
    url: file.ufsUrl,
  })),
  newsImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => ({
    url: file.ufsUrl,
  })),
  galleryImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => ({
    url: file.ufsUrl,
  })),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
