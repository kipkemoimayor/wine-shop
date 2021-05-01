import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WineHomeComponent } from './components/wine-home/wine-home.component';


const routes: Routes = [
  {
    path: '',
    component: WineHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
