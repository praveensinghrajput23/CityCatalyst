import { db } from "@/models";
import { apiHandler } from "@/util/api";
import { createCityRequest } from "@/util/validation";
import createHttpError from "http-errors";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const POST = apiHandler(
  async (
    req: Request,
    context: { session?: Session; params: Record<string, string> },
  ) => {
    const body = createCityRequest.parse(await req.json());
    if (!context.session)
      throw new createHttpError.Unauthorized("Unauthorized");
    const city = await db.models.City.create({
      cityId: randomUUID(),
      ...body,
    });
    city.addUser("7b730ed9-5c7a-4758-a658-c31673700cc9");
    return NextResponse.json({ data: city });
  },
);
