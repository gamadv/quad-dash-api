import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

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

export const companiesRelations = relations(companies, ({ one }) => {
  return {
    manager: one(users, {
      fields: [companies.managerId],
      references: [users.id],
      relationName: 'company_manager',
    }),
  }
})
