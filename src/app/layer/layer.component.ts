import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-layer",
  templateUrl: "./layer.component.html",
  styleUrls: ["./layer.component.css"]
})
export class LayerComponent implements OnInit {
  coordMaison = L.latLng(43.1201256, 5.9359619);
  coordEcole = L.latLng(43.1205669, 5.9369513);
  coordMayol = L.latLng(43.1189859, 5.9343043);
  coordLycee = L.latLng(43.1163689, 5.9371478);
  coordGare = L.latLng(43.1283184, 5.9272719);

  ngOnInit() {
    const mapboxUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      mapboxAttribution = "My Map";

    const littleton = L.marker([39.61, -105.02]).bindPopup(
        "This is Littleton, CO."
      ),
      denver = L.marker([39.74, -104.99]).bindPopup("This is Denver, CO."),
      aurora = L.marker([39.73, -104.8]).bindPopup("This is Aurora, CO."),
      golden = L.marker([39.77, -105.23]).bindPopup("This is Golden, CO.");

    const cities = L.layerGroup([littleton, denver, aurora, golden]);

    const grayscale = L.tileLayer(mapboxUrl, {
        id: "MapID",
        attribution: mapboxAttribution
      }),
      streets = L.tileLayer(mapboxUrl, {
        id: "MapID",
        attribution: mapboxAttribution
      });

    const map = L.map("frugalmap", {
      center: [39.73, -104.99],
      zoom: 10,
      layers: [grayscale, cities]
    });

    const baseMaps = {
      "<span style='color: gray'>Grayscale</span>": grayscale,
      Streets: streets
    };

    const overlayMaps = {
      Cities: cities
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);
  }
}

// doc : http://leafletjs.com/examples/layers-control/
