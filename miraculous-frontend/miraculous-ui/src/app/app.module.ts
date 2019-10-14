import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import { AlbumsComponent } from './basic-component/albums/albums.component';
import {DiscoverComponent} from "./discover/discover.component";
import { ArtistsComponent } from './basic-component/artists/artists.component';
import { GenresComponent } from './basic-component/genres/genres.component';
import { TopTracksComponent } from './common-components/top-tracks/top-tracks.component';
import { FreeMusicComponent } from './basic-component/free-music/free-music.component';
import { BannerComponent } from './discover/banner/banner.component';
import { FeaturedAlbumsComponent } from './common-components/featured-album-сarousel/featured-albums.component';
import { SearchComponent } from './basic-component/search/search.component';
import { DownloadAppLinkComponent } from './discover/download-app-link/download-app-link.component';
import { LoginComponent } from './basic-component/login/login.component';
import { UserProfileComponent } from './basic-component/user-profile/user-profile.component';
import { ArtistProfileComponent } from './basic-component/artist-profile/artist-profile.component';
import { FeaturedArtistsComponent } from './common-components/featured-artists-carousel/featured-artists.component';
import { NotFoundComponent } from './not-found/not-found.component'
import {Ng2CarouselamosModule} from "ng2-carouselamos";
import { TrackPageComponent } from './basic-component/track-page/track-page.component';
import { SimilarAlbumsComponent } from './common-components/similar-albums/similar-albums.component';
import { SimilarTracksComponent } from './common-components/similar-tracks/similar-tracks.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BasicComponentComponent } from './basic-component/basic-component.component';
import { PurchasedMusicComponent } from './basic-component/purchased-music/purchased-music.component';
import {RegistrationComponent} from "./basic-component/registration/registration.component";
import { UploadAlbumComponent } from './basic-component/upload-album/upload-album.component';
import { UploadTrackComponent } from './basic-component/upload-track/upload-track.component';
import { InternalizationPanelComponent } from './basic-component/internalization-panel/internalization-panel.component';
import {TranslateModule} from "@ngx-translate/core";
import { TagComponent } from './basic-component/upload-album/tag/tag.component';
import {CommonModule} from "@angular/common";
import { AudiotrackWithDetailsComponent } from './basic-component/upload-album/audiotrack-with-details/audiotrack-with-details.component';
import {FormsModule} from "@angular/forms";
import { EditUserProfileComponent } from './basic-component/edit-user-profile/edit-user-profile.component';
import { EditArtistProfileComponent } from './basic-component/edit-artist-profile/edit-artist-profile.component';
import { AccountDeletionConfirmationComponent } from './basic-component/edit-user-profile/account-deletion-confirmation/account-deletion-confirmation.component';
import { ArtistEventComponent } from './basic-component/artist-profile/artist-event/artist-event.component';
import { ArtistTrackComponent } from './basic-component/artist-profile/artist-track/artist-track.component';
import { ArtistAlbumComponent } from './basic-component/artist-profile/artist-album/artist-album.component';
import { ArtistCommentComponent } from './basic-component/artist-profile/artist-comment/artist-comment.component';
import { PlayerComponent } from './basic-component/player/player.component';
import { TracksQueueComponent } from './basic-component/player/tracks-queue/tracks-queue.component';
import { TracksQueueItemComponent } from './basic-component/player/tracks-queue/tracks-queue-item/tracks-queue-item.component';
import { TopTrackComponent } from './common-components/top-tracks/top-track/top-track.component';
import { CartComponent } from './basic-component/cart/cart.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StatisticsComponentComponent} from "./admin-page/statistics-component/statistics-component.component";
import {UsersComponentComponent} from "./admin-page/users-component/users-component.component";
import {FeaturedMusicComponentComponent} from "./admin-page/featured-music-component/featured-music-component.component";
import { ActivationComponent } from './basic-component/activation/activation.component';
import {ActivationRequestInterceptor} from "../services/activation-request-interceptor/activation-request-interceptor";
import {HttpRequestInterceptorService} from "../services/http-request-interceptor/http-request-interceptor.service";
import { GenreItemComponent } from './basic-component/genres/genre-item/genre-item.component';
import { GenrePageComponent } from './basic-component/genre-page/genre-page.component';
import { FileUploadProgressPanelComponent } from './basic-component/edit-user-profile/file-upload-progress-panel/file-upload-progress-panel.component';
import { FeaturedArtistsListComponent } from './common-components/featured-artists-list/featured-artists-list.component';
import { FeaturedAlbumsListComponent } from './common-components/featured-albums-list/featured-albums-list/featured-albums-list.component';
import { FeaturedArtistsListItemComponent } from './common-components/featured-artists-list/featured-artists-list-item/featured-artists-list-item.component';
import { FeaturedAlbumsListItemComponent } from './common-components/featured-albums-list/featured-albums-list/featured-albums-list-item/featured-albums-list-item.component';
import {AlbumTrackComponent} from "./basic-component/album-page/album-track/album-track.component";
import {AlbumPageComponent} from "./basic-component/album-page/album-page.component";
import { FeaturedArtistComponent } from './admin-page/featured-music-component/featured-artist/featured-artist.component';
import { FeaturedAlbumComponent } from './admin-page/featured-music-component/featured-album/featured-album.component';
import { AddArtistToFeaturedComponent } from './admin-page/featured-music-component/add-artist-to-featured/add-artist-to-featured.component';
import { AddAlbumToFeaturedComponent } from './admin-page/featured-music-component/add-album-to-featured/add-album-to-featured.component';
import { AlbumToBeAddedToFeaturedComponent } from './admin-page/featured-music-component/add-album-to-featured/album-to-be-added-to-featured/album-to-be-added-to-featured.component';
import { AlbumCommentComponent } from './basic-component/album-page/album-comment/album-comment.component';
import { TrackCommentComponent } from './basic-component/track-page/track-comment/track-comment.component';
import { UploadProgressPanelComponent } from './basic-component/upload-track/upload-progress-panel/upload-progress-panel.component';
import { FoundArtistComponent } from './basic-component/search/found-artist/found-artist.component';
import { FoundTrackComponent } from './basic-component/search/found-track/found-track.component';
import { FoundAlbumComponent } from './basic-component/search/found-album/found-album.component';
import { FreeTrackComponent } from './basic-component/free-music/free-track/free-track.component';
import { FreeAlbumComponent } from './basic-component/free-music/free-album/free-album.component';
import { GenreTrackComponent } from './basic-component/genre-page/genre-track/genre-track.component';
import { GenreAlbumComponent } from './basic-component/genre-page/genre-album/genre-album.component';
import { TopAlbumsCarouselComponent } from './common-components/top-albums-carousel/top-albums-carousel.component';
import { GenreArtistComponent } from './basic-component/artists/genre-artist/genre-artist.component';
import { CartTrackComponent } from './basic-component/cart/cart-track/cart-track.component';
import { CartAlbumComponent } from './basic-component/cart/cart-album/cart-album.component';
import { PurchasedTrackComponent } from './basic-component/purchased-music/purchased-track/purchased-track.component';
import { PaymentPanelComponent } from './basic-component/cart/payment-panel/payment-panel.component';
import { PurchasedAlbumTrackComponent } from './basic-component/purchased-music/purchased-album-track/purchased-album-track.component';
import { UploadableAlbumTrackComponent } from './basic-component/upload-album/uploadable-album-track/uploadable-album-track.component';
import {AdminPageGuardGuard} from "./guards/admin-page-guard.guard";
import { PreloaderBlockComponent } from './basic-component/registration/preloader-block/preloader-block.component';
import {UploadAlbumPageGuardGuard} from "./guards/upload-album-page-guard.guard";
import {UploadTrackPageGuardGuard} from "./guards/upload-track-page-guard.guard";
import {CartPageGuardGuard} from "./guards/cart-page-guard.guard";
import {PurchasedMusicPageGuardGuard} from "./guards/purchased-music-page-guard.guard";
import {EditUserPageGuardGuard} from "./guards/edit-user-page-guard.guard";
import {EditArtistPageGuardGuard} from "./guards/edit-artist-page-guard.guard";



const appRoutes: Routes = [

  {path:'miraculous', component:BasicComponentComponent, children: [
      {path:'discover', component: DiscoverComponent, children: [
          {path:'activate', component: ActivationComponent}
        ]},
      {path:'search', component:SearchComponent},
      {path:'albums', component: AlbumsComponent},
      {path:'performers', component: ArtistsComponent},
      {path:'genres',component: GenresComponent},
      {path:'genres/:id', component: GenrePageComponent},
      {path:'top-tracks', component: TopTracksComponent},
      {path:'free-music', component: FreeMusicComponent},
      {path:'purchased-music', component: PurchasedMusicComponent, canActivate: [PurchasedMusicPageGuardGuard]},
      {path:'tracks/:id', component: TrackPageComponent},
      {path:'albums/:id', component: AlbumPageComponent},
      {path:'cart', component: CartComponent, canActivate: [CartPageGuardGuard]},
      {path:'user/:id', component: UserProfileComponent},
      {path:'upload-album', component: UploadAlbumComponent, canActivate: [UploadAlbumPageGuardGuard]},
      {path:'upload-track', component: UploadTrackComponent, canActivate: [UploadTrackPageGuardGuard]},
      {path:'artists/:id', component: ArtistProfileComponent},
      {path:'user-profile/:id', component: UserProfileComponent},
      {path:'edit-user-profile/:id',component: EditUserProfileComponent, canActivate: [EditUserPageGuardGuard]},
      {path:'edit-artist-profile/:id', component: EditArtistProfileComponent, canActivate: [EditArtistPageGuardGuard]},
      {path:'search', component: SearchComponent}
    ]},

  {path:'admin', component: AdminPageComponent, canActivate: [AdminPageGuardGuard], children: [
      {path: 'users', component: UsersComponentComponent},
      {path: 'featured-music', component: FeaturedMusicComponentComponent},
      {path: 'statistics', component: StatisticsComponentComponent}
    ]},
  {path:'**', component: NotFoundComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    DiscoverComponent,
    AlbumsComponent,
    ArtistsComponent,
    GenresComponent,
    TopTracksComponent,
    FreeMusicComponent,
    BannerComponent,
    FeaturedAlbumsComponent,
    SearchComponent,
    DownloadAppLinkComponent,
    LoginComponent,
    UserProfileComponent,
    ArtistProfileComponent,
    FeaturedArtistsComponent,
    NotFoundComponent,
    TrackPageComponent,
    SimilarAlbumsComponent,
    SimilarTracksComponent,
    AdminPageComponent,
    BasicComponentComponent,
    PurchasedMusicComponent,
    RegistrationComponent,
    UploadAlbumComponent,
    UploadTrackComponent,
    InternalizationPanelComponent,
    TagComponent,
    AudiotrackWithDetailsComponent,
    EditUserProfileComponent,
    EditArtistProfileComponent,
    AccountDeletionConfirmationComponent,
    ArtistEventComponent,
    ArtistTrackComponent,
    ArtistAlbumComponent,
    ArtistCommentComponent,
    PlayerComponent,
    TracksQueueComponent,
    TracksQueueItemComponent,
    TopTrackComponent,
    CartComponent,
    StatisticsComponentComponent,
    UsersComponentComponent,
    FeaturedMusicComponentComponent,
    ActivationComponent,
    GenreItemComponent,
    GenrePageComponent,
    FileUploadProgressPanelComponent,
    FeaturedArtistsListComponent,
    FeaturedAlbumsListComponent,
    FeaturedArtistsListItemComponent,
    FeaturedAlbumsListItemComponent,
    AlbumTrackComponent,
    AlbumPageComponent,
    FeaturedArtistComponent,
    FeaturedAlbumComponent,
    AddArtistToFeaturedComponent,
    AddAlbumToFeaturedComponent,
    ArtistAlbumComponent,
    AlbumToBeAddedToFeaturedComponent,
    AlbumCommentComponent,
    TrackCommentComponent,
    UploadProgressPanelComponent,
    FoundArtistComponent,
    FoundTrackComponent,
    FoundAlbumComponent,
    FreeTrackComponent,
    FreeAlbumComponent,
    GenreTrackComponent,
    GenreAlbumComponent,
    TopAlbumsCarouselComponent,
    GenreArtistComponent,
    CartTrackComponent,
    CartAlbumComponent,
    PurchasedTrackComponent,
    PaymentPanelComponent,
    PurchasedAlbumTrackComponent,
    UploadableAlbumTrackComponent,
    PreloaderBlockComponent,

  ],
  entryComponents: [TagComponent, AudiotrackWithDetailsComponent, UploadableAlbumTrackComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    Ng2CarouselamosModule,
    TranslateModule.forRoot(),
    CommonModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ActivationRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


