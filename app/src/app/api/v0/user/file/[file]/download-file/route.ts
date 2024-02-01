import { db } from "@/models";
import { apiHandler } from "@/util/api";
import { fileEndingToMIMEType } from "@/util/helpers";
import createHttpError from "http-errors";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export const GET = apiHandler(
  async (
    _req: Request,
    context: { session?: Session; params: Record<string, string> },
  ) => {
    const userId = context.session?.user.id;
    if (!context.session) {
      throw new createHttpError.Unauthorized("Unauthorized");
    }

    const userFile = await db.models.UserFile.findOne({
      where: {
        id: context.params.file,
        userId,
      },
    });

    if (!userFile) {
      throw new createHttpError.NotFound("User file not found");
    }

    let body: Buffer | undefined;
    let headers: Record<string, string> | null = null;

    body = userFile.data;
    headers = {
      "Content-Type": `${
        fileEndingToMIMEType[userFile.fileType || "default"] ||
        "application/x-binary"
      }`,
      "Content-Disposition": `attachment; filename="${userFile.id}.${userFile.fileType}"`,
    };

    return new NextResponse(body, { headers });
  },
);
