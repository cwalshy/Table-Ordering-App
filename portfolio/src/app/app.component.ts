import { Component } from '@angular/core';
import { faAddressCard, faBriefcase, faUniversity, faClipboard, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FaConfig } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  faAddressCard = faAddressCard;
  faUniversity = faUniversity;
  faBriefcase = faBriefcase;
  faClipboard = faClipboard;
  faArrowRight = faArrowRight;
  constructor(faConfig: FaConfig, private activatedRoute: ActivatedRoute) {
      faConfig.defaultPrefix = 'far';
      

  
  }
}