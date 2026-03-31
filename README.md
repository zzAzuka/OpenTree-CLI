# OpenTree-CLI

A CLI tool to generate folder tree structures for project scaffolding. Quickly create well-organized project directories with predefined templates for frameworks and databases.

## Features

- **Interactive CLI prompts** - Step-by-step configuration
- **Template-based scaffolding** - Modular template system
- **Automatic dependency installation** - Installs npm packages automatically
- **Input validation** - Validates project names and paths
- **Extensible architecture** - Easy to add new templates

## Prerequisites

- [Bun](https://bun.sh/) runtime

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd OpenTree-CLI

# Install dependencies
bun install

# Link for global use (optional)
bun link
```

## Usage

```bash
# Run with Bun
bun run index.ts <project-name>

# Or if linked globally
opentree my-project
```

## How It Works

1. **Provide project name** - Pass the project name as an argument
2. **Select base** - Choose your base framework (Node.js)
3. **Select framework** - Choose your web framework (Express)
4. **Select database** - Choose your database ORM (Prisma)
5. **Let it run** - The CLI generates the folder structure and installs dependencies

## Generated Structure

When you run `bun run index.ts my-project`, the following structure is created:

```
my-project/
├── package.json
├── .gitignore
├── README.md
├── src/
│   ├── app.js
│   ├── server.js
│   └── db/
│       └── prismaClient.js
└── prisma/
    └── schema.prisma
```

## Available Templates

| Category   | Template | Description                          |
|------------|----------|--------------------------------------|
| Base       | Node     | Basic Node.js setup with package.json|
| Framework  | Express  | Express.js web server structure      |
| Database   | Prisma   | Prisma ORM with PostgreSQL schema    |

## Extending Templates

The CLI uses a modular template registry. To add new templates:

1. Create a new template file in `src/templates/<category>/`
2. Export a default function returning your folder structure
3. Register it in `src/core/templateRegistry.ts`

Example template structure:

```typescript
export default function myTemplate(): FolderStructure {
  return {
    name: 'template-name',
    files: [
      { path: 'src/index.js', content: 'console.log("Hello");' }
    ],
    folders: [
      { name: 'src', children: [] }
    ]
  };
}
```

## Project Structure

```
OpenTree-CLI/
├── index.ts                 # CLI entry point
├── src/
│   ├── core/               # Core functionality
│   │   ├── generator.ts           # Main orchestrator
│   │   └── templateRegistry.ts     # Template registry
│   ├── modules/           # CLI modules
│   │   ├── cliOptions.ts          # Interactive prompts
│   │   ├── templateResolver.ts    # Template resolution
│   │   ├── templateMerger.ts      # Template merging
│   │   ├── createDirectory.ts    # Directory creation
│   │   ├── createFiles.ts         # File generation
│   │   └── installPackages.ts    # Dependency installation
│   ├── templates/         # Template definitions
│   │   ├── base/
│   │   ├── framework/
│   │   └── database/
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
├── tests/                 # Test files
├── package.json
└── tsconfig.json
```

## Development

```bash
# Run tests
bun test

# Run tests with coverage
bun test --coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License
