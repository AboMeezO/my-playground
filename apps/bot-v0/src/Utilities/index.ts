import path from "path";
import GenTitleImage from "./ImageGen/titleGen";

/**
 * Resolves paths relative to the project root (where package.json is)
 */
export function resolvePath(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths);
}

/**
 * Specifically resolves paths inside the Assets folder
 */
export function resolveAsset(...paths: string[]) {
  return resolvePath("Assets", ...paths);
}
export { GenTitleImage };
