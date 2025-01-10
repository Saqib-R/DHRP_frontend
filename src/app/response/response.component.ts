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
  showAnswerBox: boolean = false;
  isStarted: boolean = false;
  filteredQuestions: any[] = [];
  currentQuestionIndex: number = 0;
  isCollapsed = true;
  selectedDocument: number = 1;
  selectedSection: number = 1;
  isFilterCollapsed = true;


  // Mock data for documents and sections
  documents = [
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
    { id: 3, name: 'Document 3' }
  ];

  sections = [
    { id: 1, name: 'Section 1' },
    { id: 2, name: 'Section 2' },
    { id: 3, name: 'Section 3' }
  ];



  // Mock data for questions (documentId and sectionId are used for filtering)
  questions = [
    { text: 'What is Angular?', answer: '', generating: false, documentId: 1, sectionId: 1 },
    { text: 'Explain Dependency Injection in Angular', answer: '', generating: false, documentId: 1, sectionId: 2 },
    { text: 'What is TypeScript?', answer: '', generating: false, documentId: 2, sectionId: 1 },
    { text: 'How does Angular handle routing?', answer: '', generating: false, documentId: 3, sectionId: 3 },
    // More questions here...
  ];

  ngOnInit() {
    // Initially load questions after selecting default document and section
    this.loadQuestions();
  }

  startApp() {
    this.isStarted = true;
    this.loadQuestions();
  }

  loadQuestions() {
    // Filter questions based on the selected document and section
    this.filteredQuestions = this.questions.filter(
      (question) => question.documentId
    );
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
    console.log(Array.from({ length: this.filteredQuestions.length }, (_, i) => i));

    return Array.from({ length: this.filteredQuestions.length }, (_, i) => i);
  }


  toggleFilterCollapse() {
    this.isFilterCollapsed = !this.isFilterCollapsed;
    console.log((this.isFilterCollapsed));

  }

  filterQuestionsByDocument() {
    console.log(this.selectedDocument);
  }

  filterQuestionsBySection() {
    console.log(this.selectedSection);
  }

  saveFilter() {
    console.log('Saving filter options: ', this.selectedDocument, this.selectedSection);
    // Implement save logic here, such as saving to a database or localStorage
  }


}
