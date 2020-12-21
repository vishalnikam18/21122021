import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { HeaderComponent } from './header/header.component';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OurteamComponent } from './ourteam/ourteam.component';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { AboutUsComponent } from './about-us/about-us.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AddQuestionsComponent } from './components/add-questions/add-questions.component';
import { CategoryComponent } from './components/category/category.component';
import { DisplayQuizComponent } from './components/display-quiz/display-quiz.component';
import { NumberGuessComponent } from './components/games/number-guess/number-guess.component';
import { SpsComponent } from './components/games/sps/sps.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { SearchQuizComponent } from './search-quiz/search-quiz.component';
import { SearchPipe } from './search.pipe';
// import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { PlanetComponent } from './planet/planet.component';
import { McqComponent,FormatTimePipe } from './components/mcq/mcq.component';
import { FavListComponent } from './components/fav-list/fav-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    UpdatePasswordComponent,
    HeaderComponent,
    ContactUsComponent,
    OurteamComponent,
    FooterComponent,
    AboutUsComponent,
      ChartComponent,
      AddQuizComponent,
      AddQuestionsComponent,
      CategoryComponent,
      DisplayQuizComponent,
      NumberGuessComponent,
      SpsComponent,
      IntermediateComponent,
      SearchQuizComponent,
      
      SearchPipe,
      FormatTimePipe,
      
      PlanetComponent,
      
      McqComponent,
      
      FavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    // NgMatSearchBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
