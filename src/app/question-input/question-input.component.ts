import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuizService, Question, Option } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {
  questionForm!: FormGroup;
  currentPlayerName: string = '';
  isPlayer1: boolean = true;
  questionCount: number = 0;
  maxQuestions: number = 3;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizService.gameState$.subscribe(state => {
      if (state === 'player1_question_input') {
        this.isPlayer1 = true;
        this.currentPlayerName = this.quizService.player1Name;
      } else if (state === 'player2_question_input') {
        this.isPlayer1 = false;
        this.currentPlayerName = this.quizService.player2Name;
      } else {
        // Redirect if not in question input state
        this.router.navigate(['/']);
      }
    });

    this.initForm();
  }

  initForm(): void {
    this.questionForm = this.fb.group({
      questions: this.fb.array([])
    });
    this.addQuestion(); // Start with one question
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([this.newOption(), this.newOption()]), // Start with 2 options
      correctOptionIndex: [null, Validators.required] // Index of the correct option
    });
  }

  addQuestion(): void {
    if (this.questionCount < this.maxQuestions) {
      this.questions.push(this.newQuestion());
      this.questionCount++;
    }
  }

  removeQuestion(i: number): void {
    this.questions.removeAt(i);
    this.questionCount--;
  }

  questionOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  newOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addOption(questionIndex: number): void {
    this.questionOptions(questionIndex).push(this.newOption());
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.questionOptions(questionIndex).removeAt(optionIndex);
  }

  setCorrectOption(questionIndex: number, optionIndex: number): void {
    const options = this.questionOptions(questionIndex);
    options.controls.forEach((control, i) => {
      control.get('isCorrect')?.setValue(i === optionIndex);
    });
    this.questions.at(questionIndex).get('correctOptionIndex')?.setValue(optionIndex);
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const customQuestions: Question[] = this.questions.value.map((q: any, qIndex: number) => {
        const optionsWithCorrectness = q.options.map((o: any, oIndex: number) => ({
          text: o.text,
          isCorrect: oIndex === q.correctOptionIndex
        }));
        return {
          id: qIndex + 1,
          text: q.text,
          options: optionsWithCorrectness
        };
      });

      if (this.isPlayer1) {
        customQuestions.forEach(q => this.quizService.addPlayer1Question(q));
        this.quizService.gameState.next('player2_question_input'); // Move to player 2 input
      } else {
        customQuestions.forEach(q => this.quizService.addPlayer2Question(q));
        this.quizService.gameState.next('player1_turn'); // Start the quiz
      }
      this.router.navigate(['/quiz']); // Navigate to quiz or next input
    } else {
      alert('Veuillez remplir toutes les questions et sélectionner une bonne réponse pour chaque question.');
    }
  }
}