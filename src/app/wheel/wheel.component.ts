import { Component, OnInit } from '@angular/core';
import { HttpService } from "../auth/http/http.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit {

  public rolled: boolean = this.authService.rolled !== -1;
  public width: number = 600;
  public height: number = 630;
  public innerRadius: number = 50;
  public spinAmount: number = 10;
  public spinDuration: number = 8;
  public idToLandOn: number = 0;
  public rollResultText: string = '';
  public rolling: boolean = false;
  public wheelRotation: number = 0;
  public wheelTransition: number = 0;
  public animationDone: () => void = () => void (0);

  public items = [
    { text: '3 КРИСТАЛА' },
    { text: '5 КРИСТАЛОВ' },
    { text: '7 КРИСТАЛОВ' },
    { text: '10 КРИСТАЛОВ' },
    { text: '14 КРИСТАЛОВ' },
    { text: '17 КРИСТАЛОВ' },
    { text: '25 КРИСТАЛОВ' },
    { text: '35 КРИСТАЛОВ' }
  ]

  constructor(public httpService: HttpService, private authService: AuthService) {
  }

  public ngOnInit(): void {
    if (this.rolled) {
      this.rollResultText = this.items[this.authService.rolled].text;
      let angle: number = (this.authService.rolled * 45) + 22.5;
      this.setRotationAngle(angle);
    }
  }

  public roll(): void {
    if (!this.rolling) {
      this.rolling = true;
      this.httpService.rollRequest().subscribe(res => {
        this.idToLandOn = res.rolled;
        localStorage.setItem('rolled', res.rolled.toString());
        let rotations = 27 + Math.round(Math.random() * 6);
        let angleOffset: number = (Math.random() * 35) + 5;
        let angle: number = (rotations * 360) + (this.idToLandOn * 45) + angleOffset;
        let duration: number = 10 + (Math.random() * 3);
        this.animationDone = () => {
          this.animationDone = () => void (0);
          this.wheelTransition = 0;
          this.setRotationAngle(angle - Math.floor(angle / 360) * 360);
          this.rolled = true;
          this.rollResultText = this.items[this.idToLandOn].text;
        }
        this.wheelTransition = duration;
        this.setRotationAngle(angle);
      }, error => {
      })
    }
  }

  private setRotationAngle(value: number): void {
    value = 45 - value;
    this.wheelRotation = value;
  }

  public logout(): void {
    this.authService.logout();
  }
}
