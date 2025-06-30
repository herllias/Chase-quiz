import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  player1Name = '';
  player2Name = '';

  constructor(private quizService: QuizService, private router: Router) {}

  startGame(): void {
    if (this.player1Name && this.player2Name) {
      this.quizService.setPlayerNames(this.player1Name, this.player2Name);
      this.router.navigate(['/quiz']);
    }
  }
}