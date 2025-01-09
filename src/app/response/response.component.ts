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
  sections: Section[] = [
    {
      name: 'General',
      subsections: [],
      questions: [
        { text: 'What is general information?', answer: '', generating: false, subsection: null, showAnswerBox: false },
      ],
    },
    {
      name: 'Risk Factors',
      subsections: ['Financial Risks', 'Operational Risks'],
      questions: [
        { subsection: 'Financial Risks', text: 'What are financial risks?', answer: '', generating: false, showAnswerBox: false },
        { subsection: 'Operational Risks', text: 'What are operational risks?', answer: '', generating: false, showAnswerBox: false },
        { subsection: 'Operational Risks', text: 'What are operational risks?', answer: '', generating: false, showAnswerBox: false },
        { subsection: 'Operational Risks', text: 'What are operational risks?', answer: '', generating: false, showAnswerBox: false },
      ],
    },
  ];
 
  selectedSection: string | null = null;
  selectedSubsection: string | null = null;
  filteredQuestions: Question[] = [];
 
  getSubsections(sectionName: string): string[] | undefined {
    const section = this.sections.find((s) => s.name === sectionName);
    return section?.subsections || [];
  }
 
  onSectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSection = target.value || null;
    this.selectedSubsection = null;
    const section = this.sections.find((s) => s.name === this.selectedSection);
 
    if (section) {
      this.filteredQuestions = section.subsections.length
        ? []
        : section.questions.filter((q) => !q.subsection);
    }
  }
 
  onSubsectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSubsection = target.value || null;
    const section = this.sections.find((s) => s.name === this.selectedSection);
 
    if (section) {
      this.filteredQuestions = section.questions.filter((q) => q.subsection === this.selectedSubsection);
    }
  }
 
  generateAnswer(question: Question) {
    question.generating = true;
    setTimeout(() => {
      question.answer = `Generated answer for: ${question.text}`;
      this.showAnswerBox=true;
      question.generating = false;
    }, 2000);
  }
 
  regenerateAnswer(question: Question) {
    this.generateAnswer(question);
  }

  approveAnswer(){
    alert("Approved !");
  }
}
