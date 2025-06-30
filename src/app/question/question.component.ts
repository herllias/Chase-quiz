import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question, Option } from '../quiz.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question!: Question;
  @Output() answer = new EventEmitter<boolean>();

  selectedOption: Option | null = null;

  selectOption(option: Option): void {
    this.selectedOption = option;
    setTimeout(() => {
      this.answer.emit(option.isCorrect);
      this.selectedOption = null;
    }, 500);
  }
}
