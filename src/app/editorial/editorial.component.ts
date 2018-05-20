import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthenticationService, EditorialService } from "../_services";
import { User } from "../_models";
import { Router } from "@angular/router";
import * as L from "leaflet";

@Component({
  selector: "app-editorial",
  templateUrl: "./editorial.component.html",
  styleUrls: ["./editorial.component.css"]
})
export class EditorialComponent implements OnInit {
  public user: User;
  testimony: any = {};
  error = "";
  mymap : any;
  marker = {};
  latitude;
  longitude;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private editorial: EditorialService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.testimony.longitude = "43.2853647";
    this.testimony.latitude = "5.4535821";
  }

  ngOnInit() {

    this.mymap = L.map("mapid", {
      center: [43.45267, 5.46163],
      zoom: 11
    });
    
    
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "My Map"
    }).addTo(this.mymap);

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

    L.control.layers(baseMaps).addTo(this.mymap);

    this.mymap.on("click", e => {
      this.onClick(e)
    });    
  }

  changeLongLat(longitude, latitude) {
    this.testimony.longitude = longitude;
    this.testimony.latitude = latitude;
  }


  public onClick(e){
    
    var latlong = e.latlng.toString();

    var lat, long: any;

    long = latlong.substring(latlong.indexOf(",")+2,latlong.indexOf(")"));
    lat = latlong.substring(latlong.indexOf("(")+1,latlong.indexOf(","));

    const iconMarker = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
    });

    
    if(this.marker !== undefined) {
      this.mymap.removeLayer(this.marker);
    }

    this.marker = L.circle([lat, long], {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.5,
      radius: 20
    }).addTo(this.mymap);


    this.changeLongLat(lat, long);
  }
  
  getTestimony() {
    console.log("getTestimony");
    this.editorial.post(this.testimony).subscribe(
      (response: boolean) => {
        if (response) {
          this.router.navigate(["/quick"]);
        } else {
          this.error = "Erreur lors de l'ajout du témoignage";
        }
      },
      error => {
        console.error(error);
        this.error = "Erreur lors de l'ajout du témoignage";
      }
    );
  }
}
