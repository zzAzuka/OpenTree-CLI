type FolderContentTemplate = {
    folder: string[];
    name_and_content: Record<string, string>;
    dependencies: string[];
    devDependencies: string[];
};

export type { FolderContentTemplate };