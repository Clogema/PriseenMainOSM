import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  coordMaison = L.latLng(43.1201256, 5.9359619);
  coordEcole = L.latLng(43.1205669, 5.9369513);
  coordMayol = L.latLng(43.1189859, 5.9343043);
  coordLycee = L.latLng(43.1163689, 5.9371478);
  coordGare = L.latLng(43.1283184, 5.9272719);

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom. Laissez "frugalmap" dans la fonction map

    const myMap = L.map("frugalmap").setView([43.1205669, 5.9369513], 15);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "My Map"
    }).addTo(myMap);

    // ajouter un marqueur
    const iconMarker = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
    });
    const marker = L.marker(this.coordEcole, {
      icon: iconMarker
    }).addTo(myMap);
    marker.bindPopup("<b>Yo!</b><br>C'est ma maison");

    // ajouter un cercle
    const circle = L.circle(this.coordMaison, {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.5,
      radius: 200
    }).addTo(myMap);

    // ajouter un polygone
    const polygone = L.polygon([
      this.coordGare,
      this.coordEcole,
      this.coordLycee,
      this.coordMayol
    ]).addTo(myMap);

    // gestion événement : au click
    const popup = new L.Popup();
    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(myMap);
    }

    myMap.on("click", onMapClick);
  }
}

// doc : http://leafletjs.com/examples/quick-start/
// layers : http://leafletjs.com/examples/layers-control/
