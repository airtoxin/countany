import { fetch as f } from "undici";
import { z } from "zod";

export class JsonioClient {
  private readonly jsonio = z.string().parse(process.env.JSONIO_URL);
  constructor(private authToken: string, private fetch = f) {}

  public async createBucket(bucketName: string) {
    return this.fetch(`${this.jsonio}/api/${encodeURIComponent(bucketName)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${this.authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        z
          .object({
            name: z.string(),
            createdAt: z
              .string()
              .refine((s) => !Number.isNaN(new Date(s).getTime()))
              .transform((s) => new Date(s)),
          })
          .parse(data)
      );
  }

  public async createRow<T extends {} = {}>(bucketName: string, json: T) {
    return this.fetch(`${this.jsonio}/api/${encodeURIComponent(bucketName)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${this.authToken}`,
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.json())
      .then((data) =>
        z
          .object({
            id: z.number(),
            json: z.object({}).passthrough(),
            bucket: z.object({
              name: z.string(),
              createdAt: z
                .string()
                .refine((s) => !Number.isNaN(new Date(s).getTime()))
                .transform((s) => new Date(s)),
              totalRows: z.number(),
            }),
            createdAt: z
              .string()
              .refine((s) => !Number.isNaN(new Date(s).getTime()))
              .transform((s) => new Date(s)),
            updatedAt: z
              .string()
              .refine((s) => !Number.isNaN(new Date(s).getTime()))
              .transform((s) => new Date(s)),
          })
          .parse(data)
      );
  }

  public async listRows(
    bucketName: string,
    paging: { size: number; page: number }
  ) {
    const query = new URLSearchParams({
      size: `${paging.size}`,
      page: `${paging.page}`,
    });
    return this.fetch(
      `${this.jsonio}/api/${encodeURIComponent(
        bucketName
      )}?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${this.authToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) =>
        z
          .object({
            rows: z.array(
              z.object({
                id: z.number(),
                json: z.object({}).passthrough(),
                createdAt: z
                  .string()
                  .refine((s) => !Number.isNaN(new Date(s).getTime()))
                  .transform((s) => new Date(s)),
                updatedAt: z
                  .string()
                  .refine((s) => !Number.isNaN(new Date(s).getTime()))
                  .transform((s) => new Date(s)),
              })
            ),
            bucket: z.object({
              name: z.string(),
              createdAt: z
                .string()
                .refine((s) => !Number.isNaN(new Date(s).getTime()))
                .transform((s) => new Date(s)),
              totalRows: z.number(),
            }),
          })
          .parse(data)
      );
  }

  public async getRow(bucketName: string, rowId: number) {
    return this.fetch(
      `${this.jsonio}/api/${encodeURIComponent(
        bucketName
      )}/${encodeURIComponent(rowId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${this.authToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) =>
        z
          .object({
            id: z.number(),
            json: z.object({}).passthrough(),
            bucket: z.object({
              name: z.string(),
              createdAt: z
                .string()
                .refine((s) => !Number.isNaN(new Date(s).getTime()))
                .transform((s) => new Date(s)),
              totalRows: z.number(),
            }),
            createdAt: z
              .string()
              .refine((s) => !Number.isNaN(new Date(s).getTime()))
              .transform((s) => new Date(s)),
            updatedAt: z
              .string()
              .refine((s) => !Number.isNaN(new Date(s).getTime()))
              .transform((s) => new Date(s)),
          })
          .parse(data)
      );
  }
}
