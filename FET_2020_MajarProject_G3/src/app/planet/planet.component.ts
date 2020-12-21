import { Component, OnInit } from '@angular/core';
import {PlanetService} from '../planet.service';
@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

  subs: any;
  score: any;
  constructor(private planetService :PlanetService) {
  }

  ngOnInit(): void {
  }

  updateScore(s:any) {
    this.score = s;
    console.log(this.score);
  }

}
