# Quad Dash API
Backend provide to companies Dashboard


## Requirements
- Bun
- Node
- Docker + Docker compose

[x] Elysia -> Minimalist Server Framework optimized for Bun

[x] Drizzle ORM -> Runtime Agnostic ORM

[x] @paralleldrive/cuid2 -> To create unique ids

[x] Docker -> Container to run Postgres
[x] Postgres -> Database

[x] EXT: Rest Client -> VS Code Ext to HTTP rest:

## Tech info

More information after conclusion

This project was created using `bun init` in bun v1.1.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

Node must be present to execute migrations
Bun supports **await** as top level with these options inside tsconfig.json > compilerOptions:
Backend Cookies

```
{
"target": "ESNext",
"module": "ESNext",
}
```
## Getting Started
- Install deps
```bash
bun install
```
- Run migrations
```bash
bun migrate
```
- Run project
```bash
bun dev
```


## ⚠️ Tech Pendencies
[ ] - Move bun to Container (Can't actually, because drizzle studio is not working properly on Docker, it ports cant exposed easily)
   *  Image: FROM oven/bun:latest
