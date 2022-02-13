import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public links: any[] = []
  private linksUnAuth: any[] = [
    {
      action: () => this.navigateTo('login'),
      view: 'Login',
      index: 0
    },
  ];
  private linksAuth: any[] = [
    {
      action: () => {
        this.authService.logout();
        this.navigateTo('login')
      },
      view: 'Log out',
      index: 0
    },

  ];

  private activeLinkIndex: number = -1;

  constructor(private router: Router, public authService: AuthService) {
  }


 public ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
      if (res.constructor === NavigationStart) {

        this.updateLinks();

      }
    });
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);

  }

  public updateLinks(): void {
    if (this.authService.isAuthenticated()) {
      this.links = this.linksAuth;
    } else {
      this.links = this.linksUnAuth
    }
  }
}

