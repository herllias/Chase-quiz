import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  text: string;
  isCorrect: boolean;
}

export type GameState = 'setup' | 'player1_question_input' | 'player2_question_input' | 'player1_turn' | 'transition' | 'player2_turn' | 'results';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public questionTimeLimit: number = 10; // Time limit for each question in seconds

  // Default questions (can be empty or pre-defined if needed)
  public player1Questions: Question[] = [];
  public player2Questions: Question[] = [];

  // Custom questions entered by players
  public player1CustomQuestions: Question[] = [];
  public player2CustomQuestions: Question[] = [];

  public gameState = new BehaviorSubject<GameState>('setup');
  gameState$ = this.gameState.asObservable();

  public player1Name = '';
  public player2Name = '';
  public player1Score = 0;
  public player2Score = 0;
  public player1CurrentQuestionIndex = 0;
  public player2CurrentQuestionIndex = 0;

  setPlayerNames(name1: string, name2: string): void {
    this.player1Name = name1;
    this.player2Name = name2;
    this.gameState.next('player1_question_input'); // Start with player 1 question input
  }

  getQuestions(): Question[] {
    if (this.gameState.value === 'player1_turn') {
      return this.player1CustomQuestions.length > 0 ? this.player1CustomQuestions : this.player1Questions;
    } else {
      return this.player2CustomQuestions.length > 0 ? this.player2CustomQuestions : this.player2Questions;
    }
  }

  getCurrentPlayerName(): string {
    return this.gameState.value === 'player1_turn' ? this.player1Name : this.player2Name;
  }

  submitAnswer(isCorrect: boolean): void {
    if (this.gameState.value === 'player1_turn') {
      if (isCorrect) this.player1Score++;
      this.player1CurrentQuestionIndex++;
      if (this.player1CurrentQuestionIndex >= this.player1Questions.length) {
        this.gameState.next('transition');
      }
    } else if (this.gameState.value === 'player2_turn') {
      if (isCorrect) this.player2Score++;
      this.player2CurrentQuestionIndex++;
      if (this.player2CurrentQuestionIndex >= this.player2Questions.length) {
        this.gameState.next('results');
      }
    }
  }

  startPlayer2Turn(): void {
    this.gameState.next('player2_turn');
  }

  resetGame(): void {
    this.player1Name = '';
    this.player2Name = '';
    this.player1Score = 0;
    this.player2Score = 0;
    this.player1CurrentQuestionIndex = 0;
    this.player2CurrentQuestionIndex = 0;
    this.player1CustomQuestions = []; // Clear custom questions
    this.player2CustomQuestions = []; // Clear custom questions
    this.gameState.next('setup');
  }

  addPlayer1Question(question: Question): void {
    this.player1CustomQuestions.push(question);
  }

  addPlayer2Question(question: Question): void {
    this.player2CustomQuestions.push(question);
  }
}
