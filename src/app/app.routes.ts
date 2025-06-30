import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { TurnTransitionComponent } from './turn-transition/turn-transition.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'next-turn', component: TurnTransitionComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect to home for any other route
];
