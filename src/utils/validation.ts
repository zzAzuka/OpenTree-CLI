import { InvalidProjectNameError, InvalidFilePathError } from "./errors";

const WINDOWS_RESERVED_NAMES = new Set([
  "CON", "PRN", "AUX", "NUL",
  "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
  "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
]);

const FORBIDDEN_PROJECT_NAME_CHARS = /[\\/:*?"<>|\0]/;
const FORBIDDEN_FILE_PATH_CHARS = /[:*?"<>|\0]/;

const MAX_PROJECT_NAME_LENGTH = 100;
const MAX_FILE_PATH_LENGTH = 255;

function isReservedName(name: string): boolean {
  return WINDOWS_RESERVED_NAMES.has(name.toUpperCase());
}

function isValidFilename(name: string): boolean {
  if (!name || name.length === 0) return false;
  if (FORBIDDEN_PROJECT_NAME_CHARS.test(name)) return false;
  if (name === "." || name === "..") return false;
  if (isReservedName(name)) return false;
  return true;
}

function isValidFilePath(path: string): boolean {
  if (!path || path.length === 0) return false;
  if (path.length > MAX_FILE_PATH_LENGTH) return false;
  if (FORBIDDEN_FILE_PATH_CHARS.test(path)) return false;
  if (path === "." || path === "..") return false;
  if (path.startsWith("/") || /^[A-Za-z]:[/\\]/.test(path)) return false;
  if (path.includes("..")) return false;
  return true;
}

function validateProjectName(name: string): void {
  const trimmedName = name.trim();

  if (!trimmedName || trimmedName.length === 0) {
    throw new InvalidProjectNameError("Project name cannot be empty.");
  }

  if (trimmedName.length > MAX_PROJECT_NAME_LENGTH) {
    throw new InvalidProjectNameError(
      `Project name must not exceed ${MAX_PROJECT_NAME_LENGTH} characters. Received: ${trimmedName.length}`
    );
  }

  if (trimmedName !== name) {
    throw new InvalidProjectNameError("Project name cannot have leading or trailing whitespace.");
  }

  if (!isValidFilename(trimmedName)) {
    throw new InvalidProjectNameError(
      `Invalid project name '${trimmedName}'. Contains forbidden characters or is a reserved name.`
    );
  }

  if (/\s/.test(trimmedName)) {
    throw new InvalidProjectNameError("Project name cannot contain spaces.");
  }
}

function validateFilePath(path: string): void {
  if (!path || path.length === 0) {
    throw new InvalidFilePathError("File path cannot be empty.");
  }

  if (path.length > MAX_FILE_PATH_LENGTH) {
    throw new InvalidFilePathError(
      `File path must not exceed ${MAX_FILE_PATH_LENGTH} characters.`
    );
  }

  if (!isValidFilePath(path)) {
    throw new InvalidFilePathError(
      `Invalid file path '${path}'. Contains forbidden characters, is an absolute path, or contains path traversal.`
    );
  }
}

function validateFolderNames(folders: string[]): void {
  for (const folder of folders) {
    if (folder && folder.length > 0) {
      if (folder === "." || folder === "..") {
        throw new InvalidFilePathError(
          `Invalid folder name '${folder}' in path '${folder}'.`
        );
      }
      const parts = folder.split("/");
      for (const part of parts) {
        if (part && !isValidFilename(part)) {
          throw new InvalidFilePathError(
            `Invalid folder name '${part}' in path '${folder}'.`
          );
        }
      }
    }
  }
}

function validateFileNames(filePaths: string[]): void {
  for (const filePath of filePaths) {
    validateFilePath(filePath);
  }
}

export {
  validateProjectName,
  validateFilePath,
  validateFolderNames,
  validateFileNames,
  isValidFilename,
  isValidFilePath,
  isReservedName
};
