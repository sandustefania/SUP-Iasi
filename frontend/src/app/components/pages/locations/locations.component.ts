import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SupService } from '../../../services/sup.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, HttpClientModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  weatherData: any;
  constructor(private supService: SupService) {}

  center: google.maps.LatLngLiteral = {
    lat: 47.1682853512441,
    lng: 27.615145896301517,
  };
  zoom = 15;

  ngOnInit() {
    this.getWeather();
  }
  
  getWeather() {
    this.supService.loadCurrentWeather().subscribe((res) => {
      this.weatherData = res;
      console.log(res);
    });
  }
  getWeatherIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  }

 
}
