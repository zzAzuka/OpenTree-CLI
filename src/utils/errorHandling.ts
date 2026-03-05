class DirectoryAlreadyExists extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'directoryAlreadyExists';
    Object.setPrototypeOf(this, DirectoryAlreadyExists.prototype);
  }
};

class FileAlreadyExists extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'fileAlreadyExists';
    Object.setPrototypeOf(this, FileAlreadyExists.prototype);
  }
};

export {DirectoryAlreadyExists, FileAlreadyExists};