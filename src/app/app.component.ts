import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // Fonction d'initialisation du composant.
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map("frugalmap").setView([50.6311634, 3.0599573], 12);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "Frugal Map"
    }).addTo(myfrugalmap);

    const myIcon = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png"
    });
    L.marker([50.6311634, 3.0599573], { icon: myIcon })
      .bindPopup("Je suis un Frugal Marqueur")
      .addTo(myfrugalmap)
      .openPopup();
  }
}
