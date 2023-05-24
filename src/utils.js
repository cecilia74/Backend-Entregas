import path from "path";
import { fileURLToPath } from "url";
export const _filename = fileURLToPath(import.meta.url);
export const _dirname = path.dirname(_filename);


import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public");
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
})

export const uploader = multer({storage});