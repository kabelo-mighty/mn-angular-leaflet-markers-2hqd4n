import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LayerGroup, tileLayer } from 'leaflet';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: L.MapOptions = {
    zoom: 15,
    center: L.latLng(-26.206, 28.0529), //-26.206, 28.0529
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 1 * 80,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
  };
  map: L.Map;
  markersLayer = new L.LayerGroup();
  sMarkersLayer: LayerGroup;
  zoomLevel = 9;
  iconUrl =
    'https://img.icons8.com/external-flat-icons-inmotus-design/512/external-Bus-Station-basic-ui-navigation-elements-flat-icons-inmotus-design.png';
  stations = [
    {
      name: 'Carlton Bus Station',
      lat: '-26.20481', //-26.20481, 28.0487 
      lng: '28.0487',
      installed: 1,
      active: 1,
    },
    {
      name: 'Harrison Bus Station',
      lat: '-26.2029',  //-26.2029, 28.0402
      lng: '28.0402',
      installed: 1,
      active: 1,
    },
  ];

  createStations() {
    this.sMarkersLayer = new L.LayerGroup();

    for (const s of this.stations) {
      let icon;
      icon = new L.DivIcon({
        html: `<img src='${this.iconUrl}'/> <span>${s.name}</span>`,
      });
      const marker = L.marker([s.lat, s.lng], { icon });
      this.sMarkersLayer.addLayer(marker);
    }
    this.markersLayer.addLayer(this.sMarkersLayer);
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      map.addLayer(this.markersLayer);
      this.createStations();
    }, 200);
  }

  ngOnInit() {}
}
