import { Router, RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './Componentes/genres/genres.component';
import { BooksComponent } from './Componentes/books/books.component';
import { NgModule } from '@angular/core';
import { AuthorsComponent } from './Componentes/authors/authors.component';
import { LoginPageComponent } from './Componentes/login/login-page/login-page.component';
import { MainComponent } from './Componentes/main/main.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'livros', component: MainComponent},
  {path: 'generos', component: MainComponent},
  {path: 'autores', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
