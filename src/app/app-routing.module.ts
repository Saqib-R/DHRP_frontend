import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponseComponent } from './response/response.component';
import { TocComponent } from './components/toc/toc.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: "home", component : ResponseComponent},
  {path: "upload", component : TocComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
