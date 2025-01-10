import { Component, inject } from '@angular/core';
import { UploadTocService } from '../../services/upload-toc.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toc',
  standalone: false,

  templateUrl: './toc.component.html',
  styleUrl: './toc.component.css'
})
export class TocComponent {
  uploadService: UploadTocService = inject(UploadTocService);
  pdfFile: File | null = null;
  pdfData: any[] | null = null;
  displayedData: any[] | null = null;
  searchTerm: string = '';
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);
  tocContent: any = null;
  path: string | null = null;
  selectedSection: any = null;
  selectedSubsection: any = null;

constructor() {}

ngOnInit(): void {
    const storedToc = JSON.parse(localStorage.getItem("pdfData"));
    console.log(storedToc);

    if (storedToc) {
        this.path = storedToc.filepath;
        this.tocContent = storedToc.toc;
    } else {
        this.tocContent = this.uploadService.tocContent;
    }

    const storedPdfData = localStorage.getItem('pdfData');
    if (storedPdfData) {
        this.pdfData = JSON.parse(storedPdfData);
        this.displayedData = this.pdfData;
    }
}

onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        this.pdfFile = target.files[0];
        console.log(this.pdfFile);
    }
}



resetFile() {
    this.pdfFile = null;
    this.pdfData = null;
    this.displayedData = null;
    const fileInput = document.getElementById('formFile') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
    localStorage.removeItem('pdfData');
    localStorage.removeItem('toc');
}

onSubmit() {
  if (this.pdfFile) {
      this.uploadService.uploadFile(this.pdfFile).subscribe({
          next: (res) => {

              this.pdfData = res?.data;
              this.tocContent = res?.data?.toc;
              this.path = res?.data?.filepath
              console.log(this.tocContent);

              setTimeout(() => {
                  this.toastr.success('File Uploaded', 'Success...👍', {
                      timeOut: 5000,
                  });
              }, 10);
              const fileInput = document.getElementById('formFile') as HTMLInputElement;
              if (fileInput) {
                  fileInput.value = ''; // Clear the input
              }
              this.displayedData = this.pdfData;
              localStorage.setItem('pdfData', JSON.stringify(this.pdfData));
          },
          error: (err) => {
              console.error(err);
              setTimeout(() => {
                  this.toastr.error('Failed to upload file', 'Error...👎', {
                      timeOut: 5000,
                  });
              }, 10);
          },
      });
  }
}


showData() {
    this.displayedData = this.pdfData;
    localStorage.setItem('pdfData', JSON.stringify(this.displayedData));
}

onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    console.log("DATA\n", this.pdfData, "\nTERM\n", term);

    if (this.pdfData) {
        this.displayedData = this.pdfData.filter(document =>
            document.title?.toLowerCase().includes(term) ||
            document.author?.toLowerCase().includes(term) ||
            document.description?.toLowerCase().includes(term)
        );

        // If the search term is empty, reset displayedData to the full pdfData
        if (term === '') {
            this.displayedData = this.pdfData;
        }
    }
    console.log(this.displayedData);
}

goBack() {
    window.history.back(); // Navigates back to the previous page
}

extract(): void {
  if (this.selectedSection ) {
    let data = {
      "filepath" : this.path,
    }

    console.log("DATA", data);

    this.uploadService.storeEmbeddings(data).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("Embeddings Stored Successfully.")
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
}
