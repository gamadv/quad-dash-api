import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { companies, orderItems, users } from '.'

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'delivering',
  'delivered',
  'canceled',
])

export const orders = pgTable('orders', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  customerId: text('customer_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  companyId: text('company_id')
    .notNull()
    .references(() => companies.id, {
      onDelete: 'cascade',
    }),
  status: orderStatusEnum('status').default('pending').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const ordersRelations = relations(orders, ({ one, many }) => {
  return {
    customer: one(users, {
      fields: [orders.customerId],
      references: [users.id],
      relationName: 'order_customer',
    }),
    company: one(companies, {
      fields: [orders.companyId],
      references: [companies.id],
      relationName: 'order_company',
    }),
    orderItems: many(orderItems),
  }
})
