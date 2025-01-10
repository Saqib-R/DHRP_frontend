import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatbot_helper';
  ngOnInit(): void {
    window.addEventListener('beforeunload', (event) => {
      localStorage.removeItem('pdfData');
    });
  }

}
