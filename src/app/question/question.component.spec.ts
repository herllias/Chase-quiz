import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { QuestionComponent } from './question.component';
import { Question } from '../quiz.service';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  const mockQuestion: Question = {
    id: 1,
    text: 'Test Question',
    options: [
      { text: 'Option A', isCorrect: false },
      { text: 'Option B', isCorrect: true },
      { text: 'Option C', isCorrect: false },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    component.timeLimit = 5; // Set a short time limit for testing
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the timer with the given timeLimit and isTimeUp to false', fakeAsync(() => {
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    expect(component.timer).toBe(5);
    expect(component.isTimeUp).toBeFalse();
  }));

  it('should decrease the timer every second', fakeAsync(() => {
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    expect(component.timer).toBe(5);
    tick(1000);
    fixture.detectChanges();
    expect(component.timer).toBe(4);
    tick(2000);
    fixture.detectChanges();
    expect(component.timer).toBe(2);
  }));

  it('should emit false when the timer runs out and set isTimeUp to true', fakeAsync(() => {
    spyOn(component.answer, 'emit');
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    tick(component.timeLimit * 1000);
    fixture.detectChanges();
    expect(component.answer.emit).toHaveBeenCalledWith(false);
    expect(component.isTimeUp).toBeTrue();
    let buttons = fixture.nativeElement.querySelectorAll('.option-button');
    buttons.forEach((button: HTMLButtonElement) => {
      expect(button.disabled).toBeTrue();
    });
    expect(fixture.nativeElement.querySelector('.next-question-button')).toBeTruthy();
  }));

  it('should stop the timer when an option is selected and isTimeUp should remain false', fakeAsync(() => {
    spyOn(component, 'stopTimer');
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    component.selectOption(mockQuestion.options[0]);
    expect(component.stopTimer).toHaveBeenCalled();
    expect(component.isTimeUp).toBeFalse(); // Should not be time up if option selected
    tick(500); // Allow setTimeout to complete
  }));

  it('should clear the interval on component destruction', fakeAsync(() => {
    spyOn(window, 'clearInterval');
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalled();
  }));

  it('should emit true for a correct answer', fakeAsync(() => {
    spyOn(component.answer, 'emit');
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    component.selectOption(mockQuestion.options[1]); // Correct option
    tick(500);
    expect(component.answer.emit).toHaveBeenCalledWith(true);
  }));

  it('should emit false for an incorrect answer', fakeAsync(() => {
    spyOn(component.answer, 'emit');
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    component.selectOption(mockQuestion.options[0]); // Incorrect option
    tick(500);
    expect(component.answer.emit).toHaveBeenCalledWith(false);
  }));

  it('should disable buttons when an option is selected or time is up, and show next question button when time is up', fakeAsync(() => {
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    // Initially, buttons should be enabled
    let buttons = fixture.nativeElement.querySelectorAll('.option-button');
    buttons.forEach((button: HTMLButtonElement) => {
      expect(button.disabled).toBeFalse();
    });
    expect(fixture.nativeElement.querySelector('.next-question-button')).toBeFalsy();

    // Select an option, buttons should be disabled
    component.selectOption(mockQuestion.options[0]);
    fixture.detectChanges();
    buttons = fixture.nativeElement.querySelectorAll('.option-button');
    buttons.forEach((button: HTMLButtonElement) => {
      expect(button.disabled).toBeTrue();
    });
    expect(fixture.nativeElement.querySelector('.next-question-button')).toBeFalsy();


    // Reset component and let timer run out, buttons should be disabled and next question button should appear
    // We need a fresh component instance for this scenario, so we re-create it.
    // This is an exception to the general rule of using beforeEach setup.
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    component.timeLimit = 1; // Short time limit
    fixture.detectChanges(); // Trigger ngOnInit and timer start for the new component instance
    tick(1000); // Let timer run out
    fixture.detectChanges();
    buttons = fixture.nativeElement.querySelectorAll('.option-button');
    buttons.forEach((button: HTMLButtonElement) => {
      expect(button.disabled).toBeTrue();
    });
    expect(component.isTimeUp).toBeTrue();
    expect(fixture.nativeElement.querySelector('.next-question-button')).toBeTruthy();
  }));

  it('should emit false when nextQuestion button is clicked after time is up', fakeAsync(() => {
    spyOn(component.answer, 'emit');
    fixture.detectChanges(); // Trigger ngOnInit and timer start
    tick(component.timeLimit * 1000); // Let time run out
    fixture.detectChanges(); // Update view to show next question button

    const nextButton = fixture.nativeElement.querySelector('.next-question-button');
    expect(nextButton).toBeTruthy();
    nextButton.click();
    expect(component.answer.emit).toHaveBeenCalledWith(false);
  }));
});
