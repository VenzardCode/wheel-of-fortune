import {Component, OnInit} from '@angular/core';
import {HttpService} from "../auth/http/http.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit {

  public innerWheel?: SVGGElement = undefined;
  public wheel?: SVGImageElement = undefined;

  public rolled: boolean = this.authService.rolled !== -1;
  public width: number = 600;
  public height: number = 630;
  public innerRadius: number = 50;
  public spinAmount: number = 10;
  public spinDuration: number = 8;
  public idToLandOn: number = 0;
  public rollResultText: string = '';
  public rolling: boolean = false;

  public items = [
    {text: '3 КРИСТАЛА'},
    {text: '5 КРИСТАЛОВ'},
    {text: '7 КРИСТАЛОВ'},
    {text: '10 КРИСТАЛОВ'},
    {text: '14 КРИСТАЛОВ'},
    {text: '17 КРИСТАЛОВ'},
    {text: '25 КРИСТАЛОВ'},
    {text: '35 КРИСТАЛОВ'}
  ]

  constructor(public httpService: HttpService, private _snackBar: MatSnackBar, private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.wheel = document.querySelector('image.wheel-rotation') as SVGImageElement;
    this.innerWheel = document.querySelector('g.wheel-rotation') as SVGGElement;
    if (this.rolled) {
      this.rollResultText = this.items[this.authService.rolled].text;
      let test: number = (this.authService.rolled * 45) + 22.5;
      this.setRotationAngle(test);
    }


  }

  public roll(): void {
    if (!this.rolling) {
      this.rolling=true;
      this.httpService.rollRequest().subscribe(res => {
        this.idToLandOn = res.rolled;
        localStorage.setItem('rolled', res.rolled.toString());
        let rand: number = (Math.random() * 35) + 5;
        let test: number = (this.idToLandOn * 45) + rand;
        this.startRotation(test).then(() => {
          this.rolled = true;
          this.rollResultText = this.items[this.idToLandOn].text;
        });
      }, error => {
      })
    }
  }

  private async startRotation(endAngle: number): Promise<void> {
    await new Promise<void>((resolve) => {
      let rotation = endAngle + 90;
      if (rotation > 360) rotation -= 360;
      let i = 0;
      let int = setInterval(() => {
        let rspeed = 5440 / (30 + i++) - 10;
        if (rspeed < 0) {
          clearInterval(int);
          resolve();
        } else {
          rotation += rspeed;
          if (rotation > 360) rotation -= 360;
          this.setRotationAngle(rotation);
        }
      }, 20);
    });
  }

  private setRotationAngle(value: number): void {
    value = 45 - value;
    this.wheel?.setAttribute('style', `transform:rotate(${value}deg)`);
    this.innerWheel?.setAttribute('style', `transform:rotate(${-value}deg)`);

  }

  public logout(): void {
    this.authService.logout();
  }
}
