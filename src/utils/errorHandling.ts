class DirectoryAlreadyExists extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'directoryAlreadyExists';
    Object.setPrototypeOf(this, DirectoryAlreadyExists.prototype);
  }
};

export {DirectoryAlreadyExists};