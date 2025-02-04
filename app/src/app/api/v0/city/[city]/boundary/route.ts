import { GLOBAL_API_URL } from "@/services/api";
import { logger } from "@/services/logger";
import { apiHandler } from "@/util/api";
import createHttpError from "http-errors";
import { NextResponse } from "next/server";
import wellknown from "wellknown";

export const GET = apiHandler(async (_req, { params }) => {
  const url = `${GLOBAL_API_URL}/api/v0/cityboundary/city/${params.city}`;
  logger.info(`Fetching ${url}`);

  try {
    const boundary = await fetch(url);

    const data = await boundary.json();

    if (!data.city_geometry) {
      throw new createHttpError.NotFound(
        `City boundary for locode ${params.city} not found`,
      );
    }

    const wtkData = data.city_geometry;
    const geoJson = wellknown.parse(wtkData);
    const boundingBox = [
      data.bbox_west,
      data.bbox_south,
      data.bbox_east,
      data.bbox_north,
    ];

    return NextResponse.json({ data: geoJson, boundingBox });
  } catch (error: any) {
    logger.error(error);
    return NextResponse.json({ error: error.message });
  }
});
