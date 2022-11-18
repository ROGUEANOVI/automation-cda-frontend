import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menus/menu.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  listMenus = new Array<Menu>();
  constructor(public validationService: ValidationService, public menuService: MenuService){}

  ngOnInit(): void {
    this.menuService.menuEmmiter.subscribe({
      next: (res: any) => {
        console.log(res);
        this.listMenus = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
