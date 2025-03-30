import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './Componentes/genres/genres.component';
import { BooksComponent } from './Componentes/books/books.component';
import { NgModule } from '@angular/core';
import { AuthorsComponent } from './Componentes/authors/authors.component';

export const routes: Routes = [
  {path: '', redirectTo: 'livros', pathMatch:'full'},
  {path: 'livros', component: BooksComponent},
  {path: 'generos', component: GenresComponent},
  {path: 'autores', component: AuthorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
