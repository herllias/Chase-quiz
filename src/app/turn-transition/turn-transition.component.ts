import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-turn-transition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-transition.component.html',
  styleUrls: ['./turn-transition.component.scss']
})
export class TurnTransitionComponent implements OnInit {
  player1Name = '';
  player2Name = '';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.player1Name = this.quizService.player1Name;
    this.player2Name = this.quizService.player2Name;
  }

  startPlayer2Turn(): void {
    this.quizService.startPlayer2Turn();
    this.router.navigate(['/quiz']);
  }
}