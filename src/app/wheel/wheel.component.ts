import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {Item, NgxWheelComponent} from 'ngx-wheel';
import {HttpService} from "../auth/http/http.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit {

  @ViewChild(NgxWheelComponent, {static: false}) private wheel;

  public rolled: boolean = this.authService.rolled !== -1;
  public width: number = 600;
  public height: number = 630;
  public innerRadius: number = 50;
  public spinAmount: number = 10;
  public spinDuration: number = 8;
  public idToLandOn: number = 0;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  public items: Item[] = [
    {id: 0, text: 'Вы получили 3 💎', image: '/assets/0.png'},
    {id: 1, text: 'Вы получили 5 💎', image: '/assets/1.png'},
    {id: 2, text: 'Вы получили 7 💎', image: '/assets/2.png'},
    {id: 3, text: 'Вы получили 10 💎', image: '/assets/3.png'},
    {id: 4, text: 'Вы получили 11 💎', image: '/assets/4.png'},
    {id: 5, text: 'Вы получили 12 💎', image: '/assets/5.png'},
    {id: 6, text: 'Вы получили 14 💎', image: '/assets/6.png'},
    {id: 7, text: 'Вы получили 15 💎', image: '/assets/7.png'},
    {id: 8, text: 'Вы получили 25 💎', image: '/assets/8.png'},
    {id: 9, text: 'Вы получили 35 💎', image: '/assets/9.png'},
  ] as any as Item[]

  constructor(public httpService: HttpService, private _snackBar: MatSnackBar, private authService: AuthService) {
  }

  public ngOnInit(): void {
    if (this.rolled) {
      this.openSnackBar(this.items[this.authService.rolled].text)
    }
    console.log(this.rolled)
  }


  public rollClick(): void {
    this.httpService.rollRequest().subscribe(res => {
      this.idToLandOn = res.rolled;
      console.log(res.rolled)
      this.rolled = true;
      localStorage.setItem('rolled', res.rolled.toString());
      setTimeout(() => this.wheel.spin(), 0);
    }, error => {
      console.log(error)
    })
  }


  public after(): void {
    this.openSnackBar(this.items[this.idToLandOn].text)
    console.log('after')
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }
}
