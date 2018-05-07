import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {

  public user: User;
  model: any = {};
  loading = false;
  error = "";
  
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {

  }


}
