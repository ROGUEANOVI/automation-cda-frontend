import { EventEmitter, Injectable } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuEmmiter = new EventEmitter<Menu[]>();

  constructor() { }
}
