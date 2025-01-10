import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { endpoints } from './apis';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UploadTocService {
  http: HttpClient = inject(HttpClient);
  toastr : ToastrService = inject(ToastrService);
  sharedService : SharedService = inject(SharedService);
  tocContent:any = null;


  // View-Feedback-API
  uploadFile (file: File) : Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const loadingToast = this.toastr.info('Uploading File...', 'Please wait', {
      disableTimeOut: true,
      closeButton: false,
      positionClass: 'toast-top-center'
    });

    return this.http.post<any>(endpoints.UPLOAD_DOC_API, formData).pipe(
      tap((data) => {
        this.tocContent = data?.data?.toc;
      }),

      catchError(error => {
        if (loadingToast) {
          this.toastr.clear();
        }
        this.toastr.error('Failed to Upload File', 'Error');

        console.log(error);
        return throwError(() => error);
      }),
      finalize(() => {
        if (loadingToast) {
          this.toastr.clear();
        }
      })
    );
  }


  storeEmbeddings(data : any) {
    const loadingToast = this.toastr.info('Storing Embeddings...', 'Please wait', {
      disableTimeOut: true,
      closeButton: false,
      positionClass: 'toast-top-right'
    });
    return this.http.post(endpoints.STORE_EMBEDDINGS_API,data).pipe(
      catchError(error => {
        if (loadingToast) {
          this.toastr.clear();
        }
        this.toastr.error('Failed to Upload File', 'Error');

        console.log(error);
        return throwError(() => error);
      }),

      tap((data) => {
        console.log("FROM TAP",data);

      }),
      finalize(() => {
        if (loadingToast) {
          this.toastr.clear();
        }
      })
    )
  }

}
