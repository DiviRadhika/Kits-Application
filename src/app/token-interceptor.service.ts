import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  tokenizedReq: any;
  public role: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router
    ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    this.role = sessionStorage.getItem('role');
    if (this.role === null) {
      sessionStorage.setItem('enablebtn', 'valid');
      const tokenizedReq = req.clone({
        // setHeaders : {
        // Authorization : 'Bearer '
        // }`
      });
      return next.handle(tokenizedReq)
        .pipe(
          tap((res) => {
            if (res instanceof HttpResponse && res.status === 200) {
            }
          }),
          catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 500 || err.status === 504 || err.status === 404) {
              } else if (err.status === 401) {
            //     if(this.router.url === '/' || this.router.url === ''){

            //     }
            //     else{
               
            //     this.internalAppService.updateUserLoginDuration(sessionStorage.getItem('contactId')).subscribe((res: any) => {
             
            //       setTimeout(() => {
            //         sessionStorage.clear();
            //         this.router.navigate(['/']);
            //       }, 300);

            //     });
            //   }
              } else if (err.status === 200) {
              } else if (err.status === 0) {
              }
            }

            return throwError(err);
          }),
          finalize(() => {
          }),
        );
    }
    else {
     


      this.tokenizedReq = req.clone({

        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
      });

      return next.handle(this.tokenizedReq)
        .pipe(
          tap((res) => {
            if (res instanceof HttpResponse && res.status === 200) {
            }
          }),
          catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 500 || err.status === 504) {

              } else if (err.status === 404) {
                // this.router.navigate(['/pagenotfound']);
              } else if (err.status === 401) {

                // if (sessionStorage.getItem('expireLink') === 'DMAAS') {

                //   let headers: HttpHeaders = new HttpHeaders();
                //   headers = headers.append('isRefreshToken', 'true');
                //   this.internalAppService.refreshtoken({ headers }).subscribe((res: any) => {
                //     this.newToken = res.token;
                //     sessionStorage.setItem('jwtToken', this.newToken);
                //   });
                // }
                // else {
               
                //   if(this.router.url === '/' || this.router.url === ''){

                //   }
                //   else{
                //   this.internalAppService.updateUserLoginDuration(sessionStorage.getItem('contactId')).subscribe((res: any) => {

                //     setTimeout(() => {
                //       // sessionStorage.clear();
                //       this.router.navigate(['/']);
                //     }, 300);
                //     this.router.navigate(['/']);
                //   });
                //   this.router.navigate(['/']);
                // }
                // }
                // sessionStorage.clear();
                // this.router.navigate(['/']);
              }
              else if (err.status === 200) {
             
              } else if (err.status === 0) {
               
              }
            }
         
            return of(err);
          }),
          finalize(() => {
          }),
        );

    }


  }

}