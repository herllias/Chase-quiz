import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService, Question } from '../quiz.service';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  currentPlayerName = '';
  questionTimeLimit: number; // Add this property

  constructor(private quizService: QuizService, private router: Router) {
    this.questionTimeLimit = this.quizService.questionTimeLimit; // Initialize it here
  }

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
    this.currentPlayerName = this.quizService.getCurrentPlayerName();

    // Set the current question index based on the current player
    if (this.quizService.gameState.value === 'player1_turn') {
      this.currentQuestionIndex = this.quizService.player1CurrentQuestionIndex;
    } else if (this.quizService.gameState.value === 'player2_turn') {
      this.currentQuestionIndex = this.quizService.player2CurrentQuestionIndex;
    }

    this.quizService.gameState$.subscribe(state => {
      if (state === 'transition') {
        this.router.navigate(['/next-turn']);
      } else if (state === 'results') {
        this.router.navigate(['/results']);
      }
    });
  }

  handleAnswer(isCorrect: boolean): void {
    this.quizService.submitAnswer(isCorrect);
    if (this.quizService.gameState.value === 'player1_turn') {
      this.currentQuestionIndex = this.quizService.player1CurrentQuestionIndex;
    } else if (this.quizService.gameState.value === 'player2_turn') {
      this.currentQuestionIndex = this.quizService.player2CurrentQuestionIndex;
    }
  }
}
