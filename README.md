# 📉Quad Dash API
Backend provided to e-commerce companies Dashboard.

With this API companies can: Register, to receive your commerce infos.

## 🔦 Services behaviour
- **Auth**: Send an email > Grab auth link code > user authentication
- **Dashboard data info**: Get revenue info, profile info, ecommerce metrics, change product status

## 📃Requirements
- Bun
- Node
- Docker + Docker compose

## ⬜ Stack
* **Elysia** -> Minimalist Server Framework optimized for Bun
* **Drizzle ORM** -> Runtime Agnostic ORM
* **@paralleldrive/cuid2** -> To create unique ids
* **Docker** -> Container to run Postgres
* **Postgres** -> Database


## ⚙️Tech info

More information after conclusion

This project was created using `bun init` in bun v1.1.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

* Node must be present to execute migrations
* Bun supports **await** as top level with these options inside tsconfig.json > compilerOptions:
   ```
   {
   "target": "ESNext",
   "module": "ESNext",
   }
   ```

### Relations
- These code block only works for Drizzle to manage db relations

```js
export const usersRelations = relations(users, ({ one, many }) => {
  return {
    managedCompany: one(companies, {
      fields: [users.id],
      references: [companies.managerId],
      relationName: 'managed_Company',
    }),
    orders: many(orders),
  }
})
```

### Testing API
* Collections in JSON inside docs folder -> <kbd> [QuadDash.Api.Collections](./docs/) </kbd>


## 🔨Getting Started
- Install deps
```bash
bun install
```
- Run migrations
```bash
bun generate
```
```bash
bun migrate
```
- Create some seeds to tests:
```bash
bun seed
```
- Run project
```bash
bun dev
```


## ⚠️ Tech Pendencies
 * Move bun to Container (Can't actually, because drizzle studio is not working properly on Docker, it ports cant exposed easily)
   *  Image: FROM oven/bun:latest
* Create unit tests 🧪
* Create services documentation (i.e: Swagger) 📄
* Set email service to receive auth link

## 📈 Project Improvements
* Create service to Register products
* Certified that only Admins que retrieve metrics data
* Create feature to send real email