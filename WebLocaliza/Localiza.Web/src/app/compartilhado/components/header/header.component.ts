import { Component } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { Router } from '@angular/router';
import { GetStorageService } from '../../services/get-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private getStorage : GetStorageService, private router : Router) { }

  logout(){
    this.getStorage.logout()
    this.router.navigate(['/login'])
  }
}
