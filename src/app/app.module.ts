import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyB4W6IHYY9UYncaZyh3zPRtWWLXwBv2idY",
  authDomain: "pepper-a241a.firebaseapp.com",
  databaseURL: "https://pepper-a241a.firebaseio.com",
  storageBucket: "pepper-a241a.appspot.com",
  messagingSenderId: "95483207455"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
