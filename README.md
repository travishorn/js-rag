# JavaScript + Retreival Augmented Generation

A web app for asking questions about provided documents.

## Pre-Requisites

You must have [Ollama](https://ollama.com/) installed and running.

This project uses the `gemma` and `nomic-embed-text` models (you can change
these defaults by editing `model` in `src/buildVectorStore.js` and
`src/respond.js`). Make sure to pull them.

```sh
ollama pull gemma
ollama pull nomic-embed-text
```

You must have [Node.js](https://nodejs.org/) installed, as well.

## Installation

Clone this repository

```sh
git clone https://github.com/travishorn/js-rag
```

Change into the server directory and install dependencies

```sh
cd js-rag/server
npm install
```

Change into the client directory and install dependencies

```sh
cd ../client
npm install
```

## Adding Content

Place markdown files in `server/content`. Only markdown is support at the
moment, but you can install more [Langchain document
loaders](https://js.langchain.com/docs/concepts/#document-loaders). Installed
loaders can be used in the `DirectoryLoader` config in
`server/buildVectorStore.js`.

Each time you modify the content in that directory, rebuild the vector store.

```sh
cd js-rag/server
npm run buildVectorStore
```

## Usage

Start the server

```sh
cd js-rag/server
npm run dev
```

Start the client

```sh
cd js-rag/client
npm run dev
```

Go to http://localhost:5173 in your browser.

Type a question to get an answer based on the content you added earlier.

## License

The MIT License

Copyright 2024 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
