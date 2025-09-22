import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const tracks = pgTable("tracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  releaseDate: text("release_date").notNull(), // Using text for simplicity
  genre: text("genre").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, released, rejected
  description: text("description"),
  duration: text("duration").default("0:00"),
  streams: integer("streams").default(0),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  earnings: text("earnings").default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTrackSchema = createInsertSchema(tracks).omit({
  id: true,
  createdAt: true,
  streams: true,
  likes: true,
  shares: true,
  earnings: true,
}).extend({
  title: z.string().min(1, "Track title is required"),
  artist: z.string().min(1, "Artist name is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  genre: z.string().min(1, "Genre is required"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTrack = z.infer<typeof insertTrackSchema>;
export type Track = typeof tracks.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
