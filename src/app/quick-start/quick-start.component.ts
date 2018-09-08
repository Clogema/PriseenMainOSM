import { Component, OnInit, Input, Output } from "@angular/core";
import * as L from "leaflet";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { EditorialService } from "../_services";
import { environment } from "../../environments/environment";

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

  printTestimony = false;
  printCrassier = false;
  obj: any;

  testimonyOnMap = true;
  crassiersOnMap = true;
  conduiteOnMap = true;

  csdu: any;
  crassiers: any;
  testimony: any;
  testimonies: any[];

  constructor(private http: HttpClient, private editorial: EditorialService) {}

  ngOnInit() {
    console.log(environment);
    this.printTestimony = false;
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
    // this.myMap.on("click", e => {
    //   this.printTestimony = false;
    // });
  }

  public getTestimonies() {
    this.editorial.get().subscribe((response: any) => {
      for (const test of response) {
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
        circle.on("click", e => {
          this.printCrassier = false;
          this.printTestimony = true;
          this.obj = test;
        });

        console.log(test.title);
        console.log(test.url);
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
          fillOpacity: 0.8,
          radius: crassier.radius ? crassier.radius : 300
        }).addTo(this.crassiersLayer);
        circle.bindTooltip(crassier.nom);
        circle.on("click", e => {
          this.printTestimony = false;
          this.printCrassier = true;
          this.obj = crassier;
        });
      }
    });
  }

  public getCSDU() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      const csdu = result.csdu;
      this.csdu = csdu;

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
    this.printTestimony = true;
    this.printCrassier = false;
    this.obj = obj;
    this.myMap.setView(new L.LatLng(obj.longitude, obj.latitude), 15);
    const date = new Date();
  }

  public centerOnCrassiers(obj: any) {
    this.printTestimony = false;
    this.printCrassier = true;
    this.obj = obj;
    this.myMap.setView(new L.LatLng(obj.pos[0], obj.pos[1]), 13);
  }

  public centerOnCsdu(obj: any) {
    this.printTestimony = false;
    this.printCrassier = true;
    this.obj = obj;
    this.myMap.setView(new L.LatLng(obj.pos[0], obj.pos[1]), 13);
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
    }
    if (name === "<span style='color: red'>Crassiers</span>") {
      this.crassiersOnMap = false;
    }
    if (name === "<span style='color: red'>Conduite</span>") {
      this.conduiteOnMap = false;
    }
  }

  public printTestimonyTrue() {
    console.log("oui");
    this.printTestimony = true;
  }

  public onOverlayAdd(e) {
    this.addLayer(e.name);
  }

  public onOverlayRemove(e) {
    this.removeLayer(e.name);
  }
}

// doc : http://leafletjs.com/examples/quick-start/
