import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goHome(){
    this.router.navigate(['/home'])
  }
  goFilter(){
    this.router.navigate(['/filter'])
  }
  goCreate(){
    this.router.navigate(['/create'])
  }
}
