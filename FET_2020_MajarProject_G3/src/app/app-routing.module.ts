import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AuthServiceService } from './auth-service.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OurteamComponent } from './ourteam/ourteam.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ChartComponent } from './chart/chart.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { DisplayQuizComponent } from './components/display-quiz/display-quiz.component';
import { CategoryComponent } from './components/category/category.component';
import { AddQuestionsComponent } from './components/add-questions/add-questions.component';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { SpsComponent } from './components/games/sps/sps.component';
import { NumberFormatStyle } from '@angular/common';
import { NumberGuessComponent } from './components/games/number-guess/number-guess.component';
import { SearchQuizComponent } from './search-quiz/search-quiz.component';
import { PlanetComponent } from './planet/planet.component';
import { McqComponent } from './components/mcq/mcq.component';
import { FavListComponent } from './components/fav-list/fav-list.component';

const routes: Routes = [{path:'home',component : HomeComponent},
{path:'signUp',component : RegistrationComponent},
{path:'aboutUs',component: AboutUsComponent},
{path:'login',component: LoginComponent},
{path:'contact',component : ContactUsComponent},
{ path:'abc/:id',component:AppComponent},
{path:"planet",component: PlanetComponent ,canActivate: [AuthServiceService]},
{path:'dashboard',component : DashboardComponent,canActivate: [AuthServiceService],
children:[
  {path:"categories",component: CategoryComponent},
  { path:'bt/:id',component:DisplayQuizComponent},
  { path: 'add', component: AddQuizComponent },
  { path:'question/:quizname',component:AddQuestionsComponent},
  { path:'search',component:SearchQuizComponent},
  {path:"games",component: IntermediateComponent},
  {path:"sps",component: SpsComponent},
  
  {path:"mcqPage/:id",component: McqComponent},
  {path:"favList",component: FavListComponent},
  
]},
{path:'forgetpwd',component : UpdatePasswordComponent},
{path:'chart',component : ChartComponent},
{path:'',component : HomeComponent},
{path:'**',component : HomeComponent},

// { path:"",component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
