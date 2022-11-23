import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menus/menu.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  listMenus = new Array<Menu>();
  _nombreUsuario!: string ;
  _rol!: string;
  

  constructor(public validationService: ValidationService, public menuService: MenuService, private rolService: RolService){}

  ngOnInit(): void {
    
    this.rolService.rolEmmiter.subscribe({
      next: (res: any) => {
        console.log(res);
        this._rol = res;
        localStorage.setItem("rol", res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })

    this.menuService.menuEmmiter.subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem("menus", res);
        
        this._nombreUsuario = localStorage.getItem("nombreUsuario")!;
        console.log(this._nombreUsuario);
        this.listMenus = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
