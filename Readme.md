# Kasagi Labo Programming Challenge

This project contains solutions for the Kasagi Labo programming challenge, implemented using TypeScript and Node.js, with Docker integration.

## Prerequisites

- Node.js (v20 or later)
- Yarn package manager
- Docker

## Project Structure

- `src/challengeA.ts`: Generates a 10MB file with random objects
- `src/challengeB.ts`: Processes the generated file and outputs object types
- `Dockerfile`: Containerizes Challenge B
- `package.json`: Defines project dependencies and scripts
- `tsconfig.json`: TypeScript configuration

## Setup

1. Clone the repository:

   ```
   git clone <repository-url>
   cd kasagi-labo-challenge
   ```

2. Install dependencies:
   ```
   yarn install
   ```

## Running the Challenges

### Challenge A: Generate Random Objects File

To generate the 10MB file with random objects:

```
yarn start:a
```

This will create a file named `randomObjects.txt` in the project root.

### Challenge B: Process Generated File

To process the generated file and output object types:

```
yarn start:b
```

This will read `randomObjects.txt`, process its contents, and output the results to the console and `output/output.txt`.

### Challenge C: Dockerize and Run

1. Build the Docker image:

   ```
   yarn docker:build
   ```

2. Run the Docker container:
   ```
   yarn docker:run
   ```

This will process the `randomObjects.txt` file inside the container and save the output to `output/output.txt` on your host machine.

## Testing

Run the test suite:

```
yarn test
```

For watch mode during development:

```
yarn test:watch
```
