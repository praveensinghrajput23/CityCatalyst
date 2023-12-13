"use client";

import { api } from "@/services/api";
import { logger } from "@/services/logger";
import { geoJSONBoundingBox } from "@/util/geojson";
import { Box, Center, Spinner } from "@chakra-ui/react";
import type { GeoJsonObject } from "geojson";
import { LatLngBoundsLiteral, LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC, useEffect, useRef, useState } from "react";
import {
  GeoJSON,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";

export interface CityMapProps {
  locode: string | null;
  width: number;
  height: number;
}

function BoundingBoxFocus({ boundingBox }: { boundingBox?: number[] }) {
  const map = useMap();
  useEffect(() => {
    if (!boundingBox || boundingBox.some(isNaN) || boundingBox.length !== 4) {
      logger.error("Invalid bounding box:", boundingBox);
      return;
    }
    // GeoJSON is [lng, lat] and Leaflet is [lat, lng]
    const bounds: LatLngBoundsLiteral = [
      [boundingBox[1], boundingBox[0]],
      [boundingBox[3], boundingBox[2]],
    ];
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [boundingBox, map]);

  return null;
}

export const CityMap: FC<CityMapProps> = ({ locode, width, height }) => {
  const { data, isLoading } = api.useGetCityBoundaryQuery(locode!, {
    skip: !locode,
  });

  const mapRef = useRef<L.Map | null>(null);
  let boundingBox: number[] | undefined;
  let mapCenter: LatLngExpression | undefined = [34.0, -37.0];
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current?.whenReady(() => {
        if (data) {
          const boundingBox = geoJSONBoundingBox(data);
          if (boundingBox && !boundingBox.some(isNaN)) {
            const bounds: LatLngBoundsLiteral = [
              [boundingBox[1], boundingBox[0]],
              [boundingBox[3], boundingBox[2]],
            ];
            mapRef.current
              ? mapRef.current.fitBounds(bounds, { padding: [50, 50] })
              : boundingBox;
          }
        } else {
          logger.warn("no data");
        }
      });
    }
  }, [data]);
  return (
    <Box w={width} h={height} className="relative">
      {isLoading && (
        <Box
          w={width}
          h={height}
          className="absolute top-0 left-0 z-[1000] pointer-events-none"
        >
          <Center h="full">
            <Spinner size="lg" />
          </Center>
        </Box>
      )}
      <MapContainer
        center={mapCenter}
        zoom={2}
        scrollWheelZoom={true}
        style={{ width, height }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data && (
          <GeoJSON
            data={data as GeoJsonObject}
            style={{
              color: "#648bff",
              weight: 5,
              opacity: 0.65,
              fillOpacity: 0.3,
            }}
          />
        )}
        <BoundingBoxFocus boundingBox={boundingBox} />
      </MapContainer>
    </Box>
  );
};

export default CityMap;
