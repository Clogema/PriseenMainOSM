import { Component, OnInit, Input, Output } from "@angular/core";
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

  test = true;

  testimonyOnMap = true;
  crassiersOnMap = true;
  conduiteOnMap = true;

  csdu: any;
  crassiers: any;
  testimony: any;
  testimonies: any[];

  constructor(private http: HttpClient, private editorial: EditorialService) {}

  ngOnInit() {
    console.log(this.testimonyOnMap);
    this.testimonyLayer = L.layerGroup();
    this.crassiersLayer = L.layerGroup();
    this.conduiteLayer = L.layerGroup();

    this.getConduite();
    this.getCrassiers();
    this.getCSDU();
    this.getTestimonies();
    this.testimonies = [];

    this.myMap = L.map("frugalmap", {
      center: [43.45267, 5.46163],
      zoom: 11,
      layers: [this.testimonyLayer, this.crassiersLayer, this.conduiteLayer]
    });

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "My Map"
    }).addTo(this.myMap);

    const satellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            // tslint:disable-next-line:max-line-length
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      ),
      plan = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "My Map"
      });

    const baseMaps = {
      Satellite: satellite,
      Plan: plan
    };

    const overlayMaps = {
      "<span style='color: blue'>Témoignages</span>": this.testimonyLayer,
      "<span style='color: red'>Crassiers</span>": this.crassiersLayer,
      "<span style='color: red'>Conduite</span>": this.conduiteLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(this.myMap);

    this.myMap.on("overlayadd", e => {
      this.onOverlayAdd(e);
    });
    this.myMap.on("overlayremove", e => {
      this.onOverlayRemove(e);
    });
  }

  public getTestimonies() {
    this.editorial.get().subscribe((response: any) => {
      for (const test of response) {
        console.log(test);
        this.testimonies.push(test);
        // ajouter un marker pour chaque témoignage
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
            (test.username ? test.username : "Anonyme") +
            ", " +
            new Date(test.annee).toLocaleDateString() +
            "</i></div>"
        );
      }
    });
  }

  public getCrassiers() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      const crassiers = result.crassiers;
      this.crassiers = crassiers;

      console.log(this.crassiers);

      for (const crassier of crassiers) {
        // ajouter un marker pour chaque crassier
        const iconMarker = L.icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
        });

        const circle = L.circle(crassier.pos, {
          color: "red",
          fillColor: "red",
          fillOpacity: 0.8,
          radius: crassier.radius ? crassier.radius : 300
        }).addTo(this.crassiersLayer);
        circle.bindTooltip(crassier.nom);
        circle.bindPopup(
          "<b>" + crassier.nom + "</b><br>" + crassier.description
        );
      }
    });
  }

  public getCSDU() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      const csdu = result.csdu;
      this.csdu = csdu;

      console.log(this.csdu);

      for (const c of csdu) {
        // ajouter un marker pour chaque crassier
        const iconMarker = L.icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
        });

        const circle = L.circle(c.pos, {
          color: "red",
          fillColor: "red",
          fillOpacity: 0.3,
          radius: c.radius ? c.radius : 300
        }).addTo(this.crassiersLayer);
        circle.bindTooltip(c.nom);
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
    this.myMap.setView(new L.LatLng(obj.longitude, obj.latitude), 15);
    const date = new Date();
    L.popup()
      .setLatLng([obj.longitude, obj.latitude])
      .setContent(
        "<b>" +
          obj.title +
          "</b><br>" +
          obj.description +
          "<br> <div align='right'><i>" +
          (obj.username ? obj.username : "Anonyme") +
          ", " +
          new Date(obj.annee).toLocaleDateString() +
          "</i></div>"
      )
      .openOn(this.myMap);
  }

  public centerOnCrassiers(obj: any) {
    this.myMap.setView(new L.LatLng(obj.pos[0], obj.pos[1]), 12);
    L.popup()
      .setLatLng([obj.pos[0], obj.pos[1]])
      .setContent("<b>" + obj.nom + "</b><br>" + obj.description)
      .openOn(this.myMap);
  }

  public centerOnCsdu(obj: any) {
    this.myMap.setView(new L.LatLng(obj.pos[0], obj.pos[1]), 12);
  }

  public getConduite() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      const latlngs = result.conduite;

      // ajouter un polygone
      const conduite = L.polyline(latlngs, { color: "red" }).addTo(
        this.conduiteLayer
      );
      conduite.bindTooltip("Conduite Alteo");
    });
  }

  public addLayer(name) {
    if (name === "<span style='color: blue'>Témoignages</span>") {
      this.testimonyOnMap = true;
      console.log(this.testimonyOnMap);
    }
    if (name === "<span style='color: red'>Crassiers</span>") {
      this.crassiersOnMap = true;
    }
    if (name === "<span style='color: red'>Conduite</span>") {
      this.conduiteOnMap = true;
    }
  }

  public removeLayer(name) {
    if (name === "<span style='color: blue'>Témoignages</span>") {
      this.testimonyOnMap = false;
      console.log(this.testimonyOnMap);
    }
    if (name === "<span style='color: red'>Crassiers</span>") {
      this.crassiersOnMap = false;
    }
    if (name === "<span style='color: red'>Conduite</span>") {
      this.conduiteOnMap = false;
    }
  }

  public onOverlayAdd(e) {
    console.log(e.name);
    this.addLayer(e.name);
  }

  public onOverlayRemove(e) {
    console.log(e.name);
    this.removeLayer(e.name);
  }
}

// doc : http://leafletjs.com/examples/quick-start/
