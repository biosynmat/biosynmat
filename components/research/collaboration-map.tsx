"use client";

import { useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { Globe2 } from "lucide-react";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

const locations = [
  {
    name: "United Kingdom",
    shortName: "UK",
    coordinates: [-1.5, 52] as [number, number],
    countryId: "826",
    region: "Europe",
  },
  {
    name: "Germany",
    shortName: "Germany",
    coordinates: [10.5, 51] as [number, number],
    countryId: "276",
    region: "Europe",
  },
  {
    name: "Japan",
    shortName: "Japan",
    coordinates: [138, 37] as [number, number],
    countryId: "392",
    region: "East Asia",
  },
  {
    name: "Thailand",
    shortName: "Thailand",
    coordinates: [101, 15] as [number, number],
    countryId: "764",
    region: "Southeast Asia",
  },
  {
    name: "India",
    shortName: "India",
    coordinates: [78.9, 22] as [number, number],
    countryId: "356",
    region: "South Asia",
  },
  {
    name: "United States of America",
    shortName: "United States",
    coordinates: [-98, 39] as [number, number],
    countryId: "840",
    region: "North America",
  },
] as const;

const cityMarkers = [
  { name: "Delhi", coordinates: [77.209, 28.6139] as [number, number] },
  { name: "Bangalore", coordinates: [77.5946, 12.9716] as [number, number] },
  { name: "Chennai", coordinates: [80.2707, 13.0827] as [number, number] },
  { name: "New York", coordinates: [-74.006, 40.7128] as [number, number] },
  { name: "London", coordinates: [-0.1276, 51.5072] as [number, number] },
  { name: "Berlin", coordinates: [13.405, 52.52] as [number, number] },
  { name: "Tokyo", coordinates: [139.6917, 35.6895] as [number, number] },
  { name: "Bangkok", coordinates: [100.5018, 13.7563] as [number, number] },
] as const;

const topology = worldData as unknown as Topology;
const countries = feature(
  topology,
  topology.objects.countries as GeometryCollection<GeoJsonProperties>,
) as FeatureCollection<Geometry, GeoJsonProperties>;
const projection = geoNaturalEarth1().fitExtent(
  [
    [0, 6],
    [1000, 494],
  ],
  countries,
);
const pathGenerator = geoPath(projection);
const highlightedCountryIds = new Set<string>(
  locations.map((location) => location.countryId),
);

export function CollaborationMap() {
  const [hoveredLocation, setHoveredLocation] = useState<(typeof locations)[number] | null>(null);

  return (
    <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative min-h-[360px] overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(13,148,136,0.22),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(14,116,144,0.2),transparent_35%)]" />
        <div className="relative">
          <div className="flex items-start gap-3 px-5 pt-5 text-white sm:px-8 sm:pt-8">
            <span className="rounded-2xl bg-teal-400/15 p-3 text-teal-300 ring-1 ring-teal-300/20">
              <Globe2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                Global Network
              </p>
              <h2 className="mt-1 text-2xl font-semibold">Research Collaborations</h2>
            </div>
          </div>

          <div className="relative mx-auto aspect-[2/1] w-full px-1 pb-2" aria-label="Interactive world map">
            <svg
              viewBox="0 0 1000 500"
              className="h-full w-full"
              role="img"
              aria-label="World map showing research collaborations in the United Kingdom, Germany, Japan, Thailand, India, and the United States of America, with city markers for Delhi, Bangalore, Chennai, New York, London, Berlin, Tokyo, and Bangkok."
            >
              <g>
                {countries.features.map((country) => {
                  const countryId = String(country.id).padStart(3, "0");
                  const location = locations.find((item) => item.countryId === countryId);
                  const isHighlighted = highlightedCountryIds.has(countryId);
                  const isHovered = hoveredLocation?.countryId === countryId;

                  return (
                    <path
                      key={countryId}
                      d={pathGenerator(country) ?? undefined}
                      fill={isHovered ? "#2dd4bf" : isHighlighted ? "#0f766e" : "#334155"}
                      stroke={isHighlighted ? "#99f6e4" : "#475569"}
                      strokeWidth={isHighlighted ? 1.8 : 0.65}
                      className={isHighlighted ? "cursor-pointer transition-colors duration-200 outline-none" : ""}
                      tabIndex={location ? 0 : undefined}
                      aria-label={location ? `Collaboration in ${location.name}` : undefined}
                      onMouseEnter={() => location && setHoveredLocation(location)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      onFocus={() => location && setHoveredLocation(location)}
                      onBlur={() => setHoveredLocation(null)}
                      onKeyDown={(event) => {
                        if (location && (event.key === "Enter" || event.key === " ")) {
                          setHoveredLocation(location);
                        }
                      }}
                    />
                  );
                })}
              </g>

              <g>
                {cityMarkers.map((marker) => {
                  const [x, y] = projection(marker.coordinates) ?? [0, 0];

                  return (
                    <g
                      key={marker.name}
                      aria-label={`City marker for ${marker.name}`}
                      transform={`translate(${x}, ${y})`}
                    >
                      <path
                        d="M0 0C-5 0-9 4-9 9C-9 15.6 0 24 0 24S9 15.6 9 9C9 4 5 0 0 0Z"
                        fill="#ef4444"
                        stroke="#fef2f2"
                        strokeWidth="1.2"
                        transform="translate(0 -24)"
                      />
                      <circle cx="0" cy="-15" r="3.2" fill="#fef2f2" />
                    </g>
                  );
                })}
              </g>

              {hoveredLocation &&
                (() => {
                  const [x, y] = projection(hoveredLocation.coordinates) ?? [0, 0];
                  const tooltipWidth = Math.max(92, hoveredLocation.shortName.length * 8 + 24);

                  return (
                    <g pointerEvents="none" transform={`translate(${x}, ${y - 18})`}>
                      <rect
                        x={-tooltipWidth / 2}
                        y="-32"
                        width={tooltipWidth}
                        height="27"
                        rx="8"
                        fill="#f0fdfa"
                        stroke="#5eead4"
                      />
                      <text
                        x="0"
                        y="-14"
                        textAnchor="middle"
                        fill="#0f172a"
                        fontSize="13"
                        fontWeight="700"
                      >
                        {hoveredLocation.shortName}
                      </text>
                    </g>
                  );
                })()}

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
