import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public validationService: ValidationService){}

  ngOnInit(): void {
  }

}
