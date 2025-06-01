import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ArticleComponent  // Importa o componente standalone aqui
  ],
  exports: [
    ArticleComponent  // Exporta para outros módulos poderem usar
  ]
})
export class ComponentsModule {}

