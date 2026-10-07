import type { ContactFormData } from "@/schemas/contact-schema";

export interface ContactRecord extends ContactFormData {
  readonly id: string;
  readonly createdAt: string;
  readonly status: "pending" | "reviewed" | "archived";
}

/**
 * Server-only repository simulation for storing contact inquiries.
 * In a production architecture with a configured database, this would be backed
 * by Prisma, Drizzle, or a PostgreSQL/MySQL connection pool.
 *
 * Notice: This abstraction is strictly server-side and never imported into Client Components.
 */
class ServerContactRepository {
  private readonly records: Map<string, ContactRecord> = new Map();

  public async save(data: ContactFormData): Promise<ContactRecord> {
    const recordId = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const record: ContactRecord = {
      ...data,
      id: recordId,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    this.records.set(recordId, record);
    return record;
  }

  public async findById(id: string): Promise<ContactRecord | null> {
    return this.records.get(id) ?? null;
  }

  public async count(): Promise<number> {
    return this.records.size;
  }
}

// Global server singleton instance
declare global {
  var __serverContactRepositoryInstance: ServerContactRepository | undefined;
}

export const serverContactRepository =
  globalThis.__serverContactRepositoryInstance ?? new ServerContactRepository();

if (process.env.NODE_ENV !== "production") {
  globalThis.__serverContactRepositoryInstance = serverContactRepository;
}
