import { CreatePageComponent } from './pages/create-page/create-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterPageComponent } from './pages/filter-page/filter-page.component';

const routes: Routes = [

  {path:'home',component:MainPageComponent},
  {path:'update/:id',component:UpdatePageComponent},
  {path:'create',component:CreatePageComponent},
  {path:'filter',component:FilterPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
