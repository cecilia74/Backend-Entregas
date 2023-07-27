import path from "path";
import bcrypt from 'bcrypt';
import { fileURLToPath } from "url";
export const _filename = fileURLToPath(import.meta.url);
export const _dirname = path.dirname(_filename);


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);