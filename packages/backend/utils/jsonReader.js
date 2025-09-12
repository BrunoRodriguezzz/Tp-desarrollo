import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function parseJSON(jsonName) {
    const filename = fileURLToPath(import.meta.url); 
    const dirname = path.dirname(filename);        
    const jsonPath = path.join(dirname, jsonName); 
    const content = fs.readFileSync(jsonPath, "utf-8");
    const parsedContent = JSON.parse(content);

    return parsedContent;
  }