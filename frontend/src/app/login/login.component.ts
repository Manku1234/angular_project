import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login/service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any;

  constructor(private router: Router,
    private LoginServiceService:LoginServiceService) { }

  ngOnInit(): void {
    this.LoginServiceService.getList().subscribe((data: any)=>{
      this.result = data;
      console.log(this.result);
    });
  }

  redirectedTo(){
    this.router.navigateByUrl('/wrapper');
  }
}
