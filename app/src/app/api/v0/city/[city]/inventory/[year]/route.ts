import { db } from "@/models";
import { apiHandler } from "@/util/api";
import { createInventoryRequest } from "@/util/validation";
import createHttpError from "http-errors";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiHandler(
  async (
    _req: NextRequest,
    context: { session?: Session; params: Record<string, string> },
  ) => {
    const { params, session } = context;
    const city = await db.models.City.findOne({
      where: { locode: params.city },
    });
    if (!session) throw new createHttpError.Unauthorized("Unauthorized");
    if (!city) {
      throw new createHttpError.NotFound("City not found");
    }

    const inventory = await db.models.Inventory.findOne({
      where: { cityId: city.cityId, year: params.year },
    });
    if (!inventory) {
      throw new createHttpError.NotFound("Inventory not found");
    }
    inventory.city = city;

    return NextResponse.json({ data: inventory });
  },
);

export const DELETE = apiHandler(
  async (
    _req: NextRequest,
    context: { session?: Session; params: Record<string, string> },
  ) => {
    const { params, session } = context;
    const city = await db.models.City.findOne({
      where: { locode: params.city },
    });
    if (!session) throw new createHttpError.Unauthorized("Unauthorized");
    if (!city) {
      throw new createHttpError.NotFound("City not found");
    }

    const inventory = await db.models.Inventory.findOne({
      where: { cityId: city.cityId, year: params.year },
    });
    if (!inventory) {
      throw new createHttpError.NotFound("Inventory not found");
    }

    await inventory.destroy();
    return NextResponse.json({ data: inventory, deleted: true });
  },
);

export const PATCH = apiHandler(
  async (
    req: NextRequest,
    context: { session?: Session; params: Record<string, string> },
  ) => {
    const { params, session } = context;
    const body = createInventoryRequest.parse(await req.json());

    let city = await db.models.City.findOne({
      where: { locode: params.city },
    });

    if (!session) throw new createHttpError.Unauthorized("Unauthorized");
    if (!city) {
      throw new createHttpError.NotFound("City not found");
    }

    let inventory = await db.models.Inventory.findOne({
      where: { cityId: city.cityId, year: params.year },
    });
    if (!inventory) {
      throw new createHttpError.NotFound("Inventory not found");
    }
    inventory = await inventory.update(body);
    return NextResponse.json({ data: inventory });
  },
);
