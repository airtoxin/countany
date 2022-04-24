import { JsonioClient } from "@/libs/jsonio-client/index";
import { z } from "zod";

const AUTH_TOKEN = z.string().parse(process.env.JSONIO_AUTH_TOKEN);

describe("createBucket", () => {
  it("バケット作成", async () => {
    const client = new JsonioClient(AUTH_TOKEN);
    const bucketName = Math.random().toString();
    const result = await client.createBucket(bucketName);
    expect(result).toEqual({
      name: bucketName,
      createdAt: expect.any(Date),
    });
  });
});

describe("createRow", () => {
  const client = new JsonioClient(AUTH_TOKEN);
  const bucketName = Math.random().toString();
  let rowId: number;

  it("行作成", async () => {
    const result = await client.createRow(bucketName, { testData: true });
    rowId = result.id;
    expect(result).toEqual({
      id: expect.any(Number),
      json: expect.anything(),
      bucket: {
        name: bucketName,
        createdAt: expect.any(Date),
        totalRows: 1,
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  describe("getRow", () => {
    it("行取得", async () => {
      const result = await client.getRow(bucketName, rowId);
      expect(result).toEqual({
        id: expect.any(Number),
        json: expect.anything(),
        bucket: {
          name: bucketName,
          createdAt: expect.any(Date),
          totalRows: 1,
        },
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe("listRows", () => {
    it("行一覧", async () => {
      const result = await client.listRows(bucketName, { size: 10, page: 1 });
      expect(result).toEqual({
        rows: [
          {
            id: expect.any(Number),
            json: expect.anything(),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
        ],
        bucket: {
          name: bucketName,
          createdAt: expect.any(Date),
          totalRows: 1,
        },
      });
    });
  });
});
