import { Component } from '@angular/core';

interface Question {
  text: string;
  answer: string;
  generating: boolean;
  subsection: string|null;
  showAnswerBox:boolean
}

interface Section {
  name: string;
  subsections: string[];
  questions: Question[];
}

interface Subsections {
  [key: string]: string[];
}

@Component({
  selector: 'app-response',
  standalone: false,
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  showAnswerBox:boolean = false;

  // Mock data for sections and subsections
  // sections: Section[] = [
  //   {
  //     name: 'General',
  //     subsections: [],
  //     questions: [
  //       { text: 'What is general information?', answer: '', generating: false, subsection: null, showAnswerBox: false },
  //     ],
  //   },
  //   {
  //     name: 'Risk Factors',
  //     subsections: ['Financial Risks', 'Operational Risks'],
  //     questions: [
  //       { subsection: 'Financial Risks', text: 'What are financial risks?', answer: '', generating: false, showAnswerBox: false },
  //       { subsection: 'Operational Risks', text: 'What are operational risks?', answer: '', generating: false, showAnswerBox: false },
  //       { subsection: 'Operational Risks', text: 'What are operational risks?', answer: '', generating: false, showAnswerBox: false },
  //       { subsection: 'Operational Risks', text: 'What are operational risks?', answer: '', generating: false, showAnswerBox: false },
  //     ],
  //   },
  // ];

  // selectedSection: string | null = null;
  // selectedSubsection: string | null = null;
  // filteredQuestions: Question[] = [];

  // getSubsections(sectionName: string): string[] | undefined {
  //   const section = this.sections.find((s) => s.name === sectionName);
  //   return section?.subsections || [];
  // }

  // onSectionChange(event: Event) {
  //   const target = event.target as HTMLSelectElement;
  //   this.selectedSection = target.value || null;
  //   this.selectedSubsection = null;
  //   const section = this.sections.find((s) => s.name === this.selectedSection);

  //   if (section) {
  //     this.filteredQuestions = section.subsections.length
  //       ? []
  //       : section.questions.filter((q) => !q.subsection);
  //   }
  // }

  // onSubsectionChange(event: Event) {
  //   const target = event.target as HTMLSelectElement;
  //   this.selectedSubsection = target.value || null;
  //   const section = this.sections.find((s) => s.name === this.selectedSection);

  //   if (section) {
  //     this.filteredQuestions = section.questions.filter((q) => q.subsection === this.selectedSubsection);
  //   }
  // }

  // generateAnswer(question: Question) {
  //   question.generating = true;
  //   this.showAnswerBox=true;
  //   setTimeout(() => {
  //     question.answer = `Generated answer for: ${question.text}`;
  //     question.generating = false;
  //   }, 2000);
  // }

  // regenerateAnswer(question: Question) {
  //   this.generateAnswer(question);
  // }

  // approveAnswer(){
  //   alert("Approved !");
  // }


  isStarted = false;
  filteredQuestions: any[] = [];
  currentQuestionIndex = 0;

  startApp() {
    this.isStarted = true;
    this.loadQuestions();
  }

  loadQuestions() {
    // Mock data for questions, this would typically be an API call
    this.filteredQuestions = [
      { text: 'What is Angular?', answer: '', generating: false },
      { text: 'Explain Dependency Injection in Angular', answer: '', generating: false },
      { text: 'What is TypeScript?', answer: '', generating: false },
      // More questions here...
    ];
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.filteredQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  generateAnswer(question) {
    question.generating = true;
    setTimeout(() => {
      question.answer = 'Generated answer for: ' + question.text; // Simulated answer
      question.generating = false;
    }, 2000); // Simulate delay
  }

  regenerateAnswer(question) {
    question.answer = ''; // Clear previous answer
    this.generateAnswer(question); // Regenerate answer
  }

  approveAnswer() {
    // Handle answer approval logic
    alert('Answer approved!');
  }

  getPaginationNumbers() {
    return Array.from({ length: this.filteredQuestions.length }, (_, i) => i);
  }


}
