import { fetch as f } from "undici";

export class JsonioClient {
  constructor(private authToken: string, private fetch = f) {}

  public async createBucket(bucketName: string) {
    return this.fetch(`https://jsonio.vercel.app/api/${encodeURIComponent(bucketName)}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer: ${this.authToken}`
      }
    }).then(res => res.json());
  }

  public async createRow<T extends {} = {}>(bucketName: string, json: T) {
    return this.fetch(`https://jsonio.vercel.app/api/${encodeURIComponent(bucketName)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer: ${this.authToken}`
      },
      body: JSON.stringify(json)
    }).then(res => res.json());
  }

  public async listRows(bucketName: string, paging: {size: number, page: number }) {
    const query = new URLSearchParams({
      size: `${paging.size}`,
      page: `${paging.page}`
    });
    return this.fetch(`https://jsonio.vercel.app/api/${encodeURIComponent(bucketName)}?${query.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${this.authToken}`
      }
    }).then(res => res.json());
  }

  public async getRow(bucketName: string, rowId: number) {
    return this.fetch(`https://jsonio.vercel.app/api/${encodeURIComponent(bucketName)}/${encodeURIComponent(rowId)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${this.authToken}`
      }
    }).then(res => res.json());
  }
}
