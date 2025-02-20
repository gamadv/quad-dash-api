import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { orders, products } from '.'
import { users } from './users'

export const companies = pgTable('companies', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  managerId: text('manager_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const companiesRelations = relations(companies, ({ one, many }) => {
  return {
    manager: one(users, {
      fields: [companies.managerId],
      references: [users.id],
      relationName: 'company_manager',
    }),
    orders: many(orders),
    products: many(products),
  }
})
