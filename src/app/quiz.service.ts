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

export type GameState = 'setup' | 'player1_turn' | 'transition' | 'player2_turn' | 'results';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public player1Questions: Question[] = [
    {
      id: 1,
      text: 'Quelles sont mes couleurs préfréré ?',
      options: [
        { text: 'bordeau-bleue', isCorrect: true },
        { text: 'mauve-rose', isCorrect: false },
        { text: 'violet-rouge', isCorrect: false }
      ]
    },
    {
      id: 2,
      text: 'Quel est mon style de coiffure ?',
      options: [
        { text: 'mèche', isCorrect: false },
        { text: 'afro-naturel', isCorrect: true },
        { text: 'meche', isCorrect: false }
      ]
    },
    {
      id: 3,
      text: 'Quelle est ma date de naissance ?',
      options: [
        { text: '22/12/2003', isCorrect: true },
        { text: '23/12/2003', isCorrect: false },
        { text: '22/10/2003', isCorrect: false }
      ]
    },
    {
      id: 4,
      text: "Entre les baskets et les sandales, qu'est-ce que je préfère?",
      options: [
        { text: 'les sandales', isCorrect: false },
        { text: 'les baskets', isCorrect: false },
        { text: 'les deux', isCorrect: true }
      ]
    },
    {
      id: 5,
      text: 'Quel est mon style vestimentaire ?',
      options: [
        { text: 'style court-sexy', isCorrect: false },
        { text: 'tendance-classe', isCorrect: true },
        { text: 'ordinaire', isCorrect: false }
      ]
    },
    {
      id: 6,
      text: "qu'est-ce qui te plait chez moi ?",
      options: [
        { text: 'mes formes', isCorrect: false },
        { text: 'mon comportement', isCorrect: false },
        { text: 'les deux', isCorrect: true }
      ]
    },
    {
      id: 7,
      text: 'Quels sont mes passe-temps ?',
      options: [
        { text: 'voyage-dormir', isCorrect: false },
        { text: 'télé-manger', isCorrect: false },
        { text: 'shooping-balade-chant-manger', isCorrect: true }
      ]
    }
  ];

  public player2Questions: Question[] = [
    {
      id: 1,
      text: 'Quelle est ma couleur préfèré ?',
      options: [
        { text: 'Blanc', isCorrect: false },
        { text: 'Gris', isCorrect: true },
        { text: 'Marron', isCorrect: false }
      ]
    },
    {
      id: 2,
      text: 'Quelle est ma chemise préfèré?',
      options: [
        { text: 'Model jeans bleu', isCorrect: false },
        { text: 'Polo Gris', isCorrect: true },
        { text: 'Polo Noir', isCorrect: false }
      ]
    },
    {
      id: 3,
      text: 'Quelle est mon sport visuel préfèré ?',
      options: [
        { text: 'Tennis', isCorrect: false },
        { text: 'Basketball', isCorrect: true },
        { text: 'Football', isCorrect: false }
      ]
    },
    {
      id: 4,
      text: 'Quelle sont mes objectifs dans la vie ?',
      options: [
        { text: 'Visiter le monde', isCorrect: false },
        { text: 'Devenir Doctorant', isCorrect: false },
        { text: 'Faire beaucoup d\'argent', isCorrect: true }
      ]
    },
    {
      id: 5,
      text: "Pourquoi je t'aime ?",
      options: [
        { text: 'Mon attention', isCorrect: true },
        { text: 'Mon comportement', isCorrect: false },
        { text: 'Ma beauté', isCorrect: false }
      ]
    },
    {
      id: 6,
      text: 'Quel est mon plat préfèré ?',
      options: [
        { text: 'Tchiep-viande-choux-patate', isCorrect: true },
        { text: 'Saka-Saka', isCorrect: false },
        { text: 'Babine à la sauce', isCorrect: false }
      ]
    },
    {
      id: 7,
      text: "Qu'est ce que tu apprécie de moi ?",
      options: [
        { text: 'Mon calme', isCorrect: false },
        { text: 'Ma beauté', isCorrect: false },
        { text: 'Ma façon de te parler', isCorrect: true }
      ]
    }
  ];

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
    this.gameState.next('player1_turn');
  }

  getQuestions(): Question[] {
    return this.gameState.value === 'player1_turn' ? this.player1Questions : this.player2Questions;
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
    this.gameState.next('setup');
  }
}