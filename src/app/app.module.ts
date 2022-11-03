import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAdADbPvFCuFM0Dwaugqwhvwnkc1ozUhlM",
      authDomain: "signupflow-9beee.firebaseapp.com",
      projectId: "signupflow-9beee",
      storageBucket: "signupflow-9beee.appspot.com",
      messagingSenderId: "800837207333",
      appId: "1:800837207333:web:b3d3d72664ff07ab7506cc"
    }),
    ReactiveFormsModule,
    IonicStorageModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
