import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const EventMap = () => {
  const map = useMap();

  const profileRoute = {
    foot: "routed-foot",
    bike: "routed-bike",
    car: "routed-car",
  };

  const routeControl = L.Routing.control({
    waypoints: [L.latLng(21.02815, 105.78552), L.latLng(21.01672, 105.78838)],
    routeWhileDragging: true,
    // showAlternatives: true,
    collapsible: true,
    pointMarkerStyle: { color: "green", opacity: 0.8 },
    router: new L.Routing.OSRMv1({
      language: "vi",
      serviceUrl: `//routing.openstreetmap.de/${profileRoute.car}/route/v1`,
    }),
  }).addTo(map);

  L.control.scale().addTo(map);

  const element = document.getElementsByClassName(
    "leaflet-routing-container leaflet-bar leaflet-control"
  );

  if (element.length > 1) {
    element[0].remove();
  }
  // const routingContainer = document.getElementsByClassName(
  //   "leaflet-routing-container leaflet-bar leaflet-routing-collapsible leaflet-control"
  // )[0];

  // console.log(routingContainer);
  // routingContainer.classList.add("dark");
  // routingContainer.classList.add("pad2");

  return null;
};

const MapView = () => {
  const map = useRef();

  const zoomIn = (e) => {
    console.log(e);
    map.current.zoomIn();
  };

  const zoomOut = () => {
    map.current.zoomOut();
  };

  return (
    <MapContainer
      className="markercluster-map"
      center={[21.028511, 105.804817]}
      zoom={13}
      maxZoom={18}
      contextmenu={true}
      contextmenuItems={[
        {
          text: "Direct from here",
          callback: zoomIn,
        },
        { text: "Direct to here", callback: zoomOut },
      ]}
      ref={map}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <EventMap />
    </MapContainer>
  );
};

export default MapView;
