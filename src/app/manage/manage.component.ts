import { Component, OnInit, SimpleChanges } from '@angular/core';
import { EditorialService } from '../_services';
import { Testimony } from '../_models';
import { Marker, Circle } from 'leaflet';
import * as L from "leaflet";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  SAVE:Number = 0;
  DELETE:Number = 1;

  testimonies: Testimony[];
  testimony: Testimony;
  mymap: any;
  marker:any;
  latitude:Number;
  longitude:Number;

  testimonyOnMap:boolean;

  isMapInitialized:boolean;

  modalAction:any;

  success:String;
  error:String;

  constructor(private editorialService: EditorialService) { 
    this.testimony = null;
    this.marker = {};
    this.error = "";
    this.testimonyOnMap = false;
    this.isMapInitialized = false;

    this.modalAction = {
      title: "",
      msg : "",
      action: null
    }
  }


  ngOnInit() {
    this.editorialService.get().subscribe((testimonies:any) => {
      this.testimonies = testimonies;
      if (this.testimonies.length){
        this.testimonyOnMap = true;
      }
    });
  }

  public initMap(){
    if (this.isMapInitialized || this.testimony === null) return;
    
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
      this.onClick(e);
    });

    this.isMapInitialized = true;
  }

  public onClick(e) {
    const latlong = e.latlng.toString();
    let lat, long: any;

    long = latlong.split(",")[1].split(")")[0].trim();
    lat = latlong.split(",")[0].split("(")[1].trim();
    
    const iconMarker = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
    });

    if (this.marker !== undefined) {
      this.mymap.removeLayer(this.marker);
    }

    this.marker = L.circle([lat, long], {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.5,
      radius: 20
    }).addTo(this.mymap);

    this.changeLongLat(lat, long);
    this.mymap.setView(new L.LatLng(lat, long), 13);
  }

  changeLongLat(longitude, latitude) {
    this.testimony.longitude = longitude;
    this.testimony.latitude = latitude;
  }

  onDateChange(e){
    this.testimony.annee = e.viewModel;
  }

  public setTestimony(testimony:Testimony){
    this.testimony = testimony;

    setTimeout(() => {
      this.initMap();
      let event = {
        latlng: "(" + this.testimony.longitude + "," + this.testimony.latitude + ")"
      };
      this.marker = undefined;
      this.onClick(event);
    }, 500);
  }

  deleteAction():void{
    this.modalAction.title = "Supprimer";
    this.modalAction.msg = "Veuillez confirmer la suppression.";
    this.modalAction.action = this.DELETE;
  }

  saveAction():void{
    this.modalAction.title = "Sauvegarder";
    this.modalAction.msg = "Veuillez confirmer la mise à jour.";
    this.modalAction.action = this.SAVE;
  }

  confirmAction():void{
    if (this.modalAction.action == this.SAVE){
      this.postTestimony();
    } else if (this.modalAction.action == this.DELETE){
      this.deleteTestimony();
    }
  }

  deleteTestimony(){
    this.editorialService.delete(this.testimony).subscribe(
      (response: boolean) => {
        if (response) {
          //this.router.navigate(["/quick"]);
          window.location.reload();
          this.success = "Témoignage supprimé avec succès!";
        } else {
          this.error = "Erreur lors de la suppression du témoignage";
        }
      },
      error => {
        console.error(error);
        this.error = "Erreur lors de la suppression du témoignage";
      }
    );
  }

  postTestimony(){
    this.editorialService.update(this.testimony).subscribe(
      (response: boolean) => {
        if (response) {
          //this.router.navigate(["/quick"]);
          window.location.reload();
          this.success = "Témoignage mis à jour avec succès!";
        } else {
          this.error = "Erreur lors de la modification du témoignage";
        }
      },
      error => {
        console.error(error);
        this.error = "Erreur lors de la modification du témoignage";
      }
    );
  }
}
