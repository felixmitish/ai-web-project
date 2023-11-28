"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import MapGL, { Layer, Source } from "@urbica/react-map-gl";
import { useState } from "react";
type PointProps = {
  trees: number;
  cars: number;
  lat: number;
  lon: number;
  angle: number;
};
export function ThreeMap() {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiZm1pdGlzaCIsImEiOiJjbHBoaW5jbHEwMmV3Mml0Nzgwb2M1bHl1In0.8K_qhppmNoWyHNKEwEdkuQ";

  const [viewport, setViewport] = useState({
    latitude: 43.7102,
    longitude: 7.262,
    zoom: 11.3,
  });
  const [selectedLayer, setSelectedLayer] = useState("trees");
  const [selectedPoint, setSelectedPoint] = useState<PointProps | null>(null);
  const [coursor, setCoursor] = useState("");

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
     left-5 w-[232px] h-[359px] bg-[#D9D9D94D]/50 backdrop-blur-sm rounded-sm p-6  space-y-2.5 flex flex-col"
      >
        {/* here I want to make a rectangle */}
        {/* <div className="w-[232px] h-[359px] bg-white/50 backdrop-blur-sm border-r-4 rounded-sm"> */}
        {/* here i want to put text which will be in center of upper div */}

        <h1 className="text-xl font-bold text-white ">Ecology Monitor</h1>
        {/* here i want to make line with full length of div */}
        <div className="w-full h-[1px] bg-white/50"></div>

        <p className="text-white text-sm pb-2">
          This is an interactive dashboard where you can compare how Nice is
          digested with cars versus how green it is.
        </p>
        <div className="relative flex justify-between items-center">
          <Select
            onValueChange={function (e) {
              console.log(e);
              setSelectedLayer(e);
            }}
            value={selectedLayer}
            defaultValue={selectedLayer}
          >
            <SelectTrigger className="w-[180px] relative ">
              <SelectValue placeholder="Trees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cars">Cars</SelectItem>
              <SelectItem value="trees">Trees</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedPoint && (
        <div className="absolute bottom-5 left-5 w-[370px] h-[210px] bg-[#D9D9D94D]/50 backdrop-blur-sm rounded-sm p-6 flex flex-col">
          <div className="flex overflow-hidden relative ">
            <Image
              className=" object-contain w-[25%]"
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/original-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-0.jpg`}
            />
            <Image
              className=" object-contain w-[25%] "
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/original-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-90.jpg`}
            />
            <Image
              className=" object-contain w-[25%]"
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/original-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-180.jpg`}
            />
            <Image
              className=" object-contain w-[25%]"
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/original-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-270.jpg`}
            />
          </div>
          <div className="flex overflow-hidden relative">
            <Image
              className=" object-contain w-[25%]"
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/segmented-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-0.jpg`}
            />
            <Image
              className=" object-contain w-[25%]"
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/segmented-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-90.jpg`}
            />
            <Image
              className=" object-contain w-[25%]"
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/segmented-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-180.jpg`}
            />
            <Image
              className=" object-contain w-[25%]"
              alt="original image"
              width={640}
              height={640}
              src={`https://ai-segmentatioon.s3.eu-west-3.amazonaws.com/segmented-images/street_view_${selectedPoint.lat}-${selectedPoint.lon}-270.jpg`}
            />
          </div>
        </div>
      )}
      <MapGL
        cursorStyle={coursor}
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
          onEnter={function onEnter(e: any) {
            setCoursor("pointer");
          }}
          onLeave={function onLeave(e: any) {
            setCoursor("");
          }}
          onClick={function onClick(e: any) {
            console.log(e?.features?.[0]?.properties);
            if (selectedPoint?.lat === e?.features?.[0]?.properties?.lat) {
              setSelectedPoint(null);
            } else {
              setSelectedPoint(e?.features?.[0]?.properties);
            }
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
            "circle-opacity": [
              "case",
              ["==", ["get", "lat"], selectedPoint?.lat || null],
              1,
              0.5,
            ],
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
