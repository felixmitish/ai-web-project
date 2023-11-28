"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import MapGL, { Layer, Source } from "@urbica/react-map-gl";
import { useState } from "react";

export function ThreeMap() {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiZm1pdGlzaCIsImEiOiJjbHBoaW5jbHEwMmV3Mml0Nzgwb2M1bHl1In0.8K_qhppmNoWyHNKEwEdkuQ";

  const [viewport, setViewport] = useState({
    latitude: 43.7102,
    longitude: 7.262,
    zoom: 11.3,
  });
  const [selectedLayer, setSelectedLayer] = useState("trees");

  //   let [test, setTest] = useState(0);

  return (
    <>
      {/* <div className="absolute top-10 left-5 bg-white/50 backdrop-blur-sm p-5 rounded-sm">
        {test}
      </div>
      <button
        className="absolute bg-red-500 p-2 rounded-sm"
        onClick={function onClick() {
          setTest(test + 1);
        }}
      >
        Add +1
      </button> */}
      <div
        className="absolute top-5
     left-5 "
      >
        <Select
          onValueChange={function (e) {
            console.log(e);
            setSelectedLayer(e);
          }}
          value={selectedLayer}
          defaultValue={selectedLayer}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cars">Cars</SelectItem>
            <SelectItem value="trees">Trees</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <MapGL
        className="w-screen h-screen"
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
        accessToken={MAPBOX_ACCESS_TOKEN}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={setViewport}
      >
        <Source id="points" type="geojson" data="result.geojson" />
        <Layer
          id="points"
          type="circle"
          source="points"
          onClick={function onClick(e: any) {
            console.log(e?.features?.[0]?.properties);
          }}
          paint={{
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", selectedLayer],
              0,
              "red",
              10,
              "yellow",
              30,
              "green",
            ],
            "circle-opacity": 0.8,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", selectedLayer],
              0,
              3,
              10,
              5,
              30,
              10,
            ],
          }}
        />
      </MapGL>
    </>
  );
}
