import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  player1Name = '';
  player2Name = '';
  player1Score = 0;
  player2Score = 0;
  winner = '';
  funMessage = '';

  constructor(public quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.player1Name = this.quizService.player1Name;
    this.player2Name = this.quizService.player2Name;
    this.player1Score = this.quizService.player1Score;
    this.player2Score = this.quizService.player2Score;

    let loserName = '';
    if (this.player1Score > this.player2Score) {
      this.winner = this.player1Name;
      loserName = this.player2Name;
      this.funMessage = `🥳 ${this.winner} t'aime plus que ${loserName} ! ❤️`;
    } else if (this.player2Score > this.player1Score) {
      this.winner = this.player2Name;
      loserName = this.player1Name;
      this.funMessage = `🥳 ${this.winner} t'aime plus que ${loserName} ! ❤️`;
    } else {
      this.winner = 'Personne. C\'est une égalité !';
      this.funMessage = '🤝 C\'est une égalité ! L\'amour est partagé ! 🥰';
    }
  }

  restartGame(): void {
    this.quizService.resetGame();
    this.router.navigate(['/']);
  }
}