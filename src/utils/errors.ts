class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

class InvalidProjectNameError extends ValidationError {
  constructor(message: string) {
    super(message, "projectName");
    this.name = "InvalidProjectNameError";
    Object.setPrototypeOf(this, InvalidProjectNameError.prototype);
  }
}

class InvalidFilePathError extends ValidationError {
  constructor(message: string) {
    super(message, "filePath");
    this.name = "InvalidFilePathError";
    Object.setPrototypeOf(this, InvalidFilePathError.prototype);
  }
}

export { ValidationError, InvalidProjectNameError, InvalidFilePathError };
