import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, pipes, etc.
import { Article } from 'src/app/services/api.service'; // Mantive seu caminho
import { StorageService } from 'src/app/services/storage.service';
import { ActionSheetController, Platform } from '@ionic/angular'; // ActionSheetController e Platform são services, não precisam estar no imports do @Component
import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonFooter,
  IonRow,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone'; // Importe os componentes Ionic daqui
import { Share } from '@capacitor/share';
import { addIcons } from 'ionicons'; // Para registrar ícones
import {
  ellipsisVerticalOutline,
  shareOutline,
  heartOutline,
  heart, // Ícone de coração preenchido
  closeOutline
} from 'ionicons/icons'; // Ícones que você usa

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: true, // <-- Marcar como standalone
  imports: [ // <-- Adicionar array de imports
    CommonModule,
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonFooter,
    IonRow,
    IonButton,
    IonIcon
  ]
})
export class ArticleComponent {
  @Input() article!: Article;

  constructor(
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform // Platform também é injetado
  ) {
    // Registre todos os ícones que o componente e seus métodos (como onShowOptions) utilizam
    addIcons({
      ellipsisVerticalOutline,
      shareOutline,
      heartOutline,
      heart,
      closeOutline
    });
  }

  openArticle() {
    window.open(this.article.url, '_blank');
  }

  async onToggleFavorite() {
    const isFav = await this.storageService.isFavorite(this.article);
    if (isFav) {
      await this.storageService.removeFromFavorites(this.article);
    } else {
      await this.storageService.addToFavorites(this.article);
    }
  }

  async isFavorite(): Promise<boolean> {
    return this.storageService.isFavorite(this.article);
  }

  async onShowOptions() {
    const isFav = await this.isFavorite();

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opções',
      buttons: [
        {
          text: 'Compartilhar',
          icon: 'share-outline', // Ícone registrado
          handler: () => this.shareArticle(),
        },
        {
          text: isFav ? 'Remover Favorito' : 'Adicionar Favorito',
          icon: isFav ? 'heart' : 'heart-outline', // Ícones registrados
          handler: () => this.onToggleFavorite(),
        },
        {
          text: 'Cancelar',
          icon: 'close-outline', // Ícone registrado
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  private async shareArticle() {
    // Verifique se a plataforma está pronta e se o plugin Share está disponível
    // Embora o Capacitor geralmente lide bem com isso, é uma boa prática para plugins que dependem de funcionalidades nativas.
    if (this.platform.is('capacitor')) {
      await Share.share({
        title: this.article.title,
        text: this.article.description, // Certifique-se que 'description' existe no seu objeto Article
        url: this.article.url,
        dialogTitle: 'Compartilhar notícia',
      });
    } else {
      // Fallback para web, se necessário, ou notificar o usuário
      console.warn('Funcionalidade de compartilhamento nativo não disponível no browser. Use Web Share API se desejado ou mostre uma mensagem.');
      // Você poderia implementar a Web Share API aqui como fallback:
      // if (navigator.share) {
      //   await navigator.share({
      //     title: this.article.title,
      //     text: this.article.description,
      //     url: this.article.url,
      //   });
      // } else {
      //   alert('Compartilhamento não suportado neste navegador.');
      // }
      alert(`Compartilhar: ${this.article.title} - ${this.article.url}`); // Fallback simples
    }
  }
}