import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { EditorialService } from "../_services";

@Component({
  selector: "app-quick-start",
  templateUrl: "./quick-start.component.html",
  styleUrls: ["./quick-start.component.css"]
})
export class QuickStartComponent implements OnInit {
  myMap: any;
  testimonyLayer: any;
  crassiersLayer: any;
  conduiteLayer: any;

  testimonyOnMap: any;
  crassiersOnMap: any;
  conduiteOnMap: any;

  crassiers: any;
  testimony: any;
  testimonies:any[];

  constructor(private http: HttpClient, private editorial: EditorialService) {
  }

  ngOnInit() {
    this.testimonyLayer = L.layerGroup();
    this.crassiersLayer = L.layerGroup();
    this.conduiteLayer = L.layerGroup();

    //this.getTestimony();
    this.getConduite();
    this.getCrassiers();
    this.getTestimonies();
    this.testimonies = [];

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom. Laissez "frugalmap" dans la fonction map
    // const myMap = L.map("frugalmap").setView([43.205068, 5.513651], 11);

    this.myMap = L.map("frugalmap", {
      center: [43.205068, 5.513651],
      zoom: 11,
      layers: [this.testimonyLayer, this.crassiersLayer, this.conduiteLayer]
    });

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "My Map"
    }).addTo(this.myMap);

    const baseMaps = {};

    const overlayMaps = {
      Testimony: this.testimonyLayer,
      Crassiers: this.crassiersLayer,
      Conduite: this.conduiteLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(this.myMap);

    this.testimonyOnMap = this.myMap.hasLayer(this.testimonyLayer);
    this.crassiersOnMap = this.myMap.hasLayer(this.crassiersLayer);
    this.conduiteOnMap = this.myMap.hasLayer(this.conduiteLayer);
  }

  public getTestimonies() {
    this.editorial.get().subscribe((response: any) => {
        for (const test of response) {
        console.log(test);
        this.testimonies.push(test);
        // ajouter un marker pour chaque crassier
        const iconMarker = L.icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
        });

        const circle = L.circle([test.longitude, test.latitude], {
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.5,
          radius: 20
        }).addTo(this.testimonyLayer);
        circle.bindTooltip(test.title);
        circle.bindPopup(
          "<b>" +
          test.title +
          "</b><br>" +
          test.description +
          "<br> <div align='right'><i>" +
          test.id_user +
          "</i></div>"
        );
      }
    });
  }

  public getCrassiers() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      const crassiers = result.crassiers;
      this.crassiers = crassiers;

      for (const crassier of crassiers) {
        // ajouter un marker pour chaque crassier
        const iconMarker = L.icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
        });

        const circle = L.circle(crassier.pos, {
          color: "red",
          fillColor: "red",
          fillOpacity: 0.5,
          radius: crassier.radius ? crassier.radius : 300
        }).addTo(this.crassiersLayer);
        circle.bindTooltip(crassier.nom);
      }
    });
  }

  public debutConduite() {
    this.myMap.setView(new L.LatLng(43.45267, 5.46163), 11);
  }

  public finConduite() {
    this.myMap.setView(new L.LatLng(43.192163, 5.51527), 11);
  }

  public centerOnTestimony(obj: any) {
    this.myMap.setView(new L.LatLng(obj.longitude, obj.latitude), 12);
  }

  public centerOnCrassiers(obj: any) {
    this.myMap.setView(new L.LatLng(obj.pos[0], obj.pos[1]), 12);
  }

  public getConduite() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      const latlngs = result.conduite;

      // ajouter un polygone
      const conduite = L.polyline(latlngs, { color: "green" }).addTo(
        this.conduiteLayer
      );
      conduite.bindTooltip("Conduite Alteo");
    });
  }
}

// doc : http://leafletjs.com/examples/quick-start/
