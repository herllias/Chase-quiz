import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question, Option } from '../quiz.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() timeLimit: number = 10; // Default time limit in seconds
  @Output() answer = new EventEmitter<boolean>();

  selectedOption: Option | null = null;
  timer: number = 0;
  isTimeUp: boolean = false;
  private intervalId: any;

  ngOnInit(): void {
    this.resetTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && !changes['question'].firstChange) {
      this.resetTimer();
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.timer = this.timeLimit;
    this.isTimeUp = false;
    this.startTimer();
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.stopTimer();
        this.isTimeUp = true;
        this.answer.emit(false); // Time's up, consider it incorrect
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  selectOption(option: Option): void {
    if (this.isTimeUp) return; // Prevent selecting if time is up

    this.stopTimer(); // Stop timer when an option is selected
    this.selectedOption = option;
    setTimeout(() => {
      this.answer.emit(option.isCorrect);
      this.selectedOption = null;
    }, 500);
  }

  nextQuestion(): void {
    this.answer.emit(false); // Consider it incorrect if time ran out and next is clicked
  }
}
