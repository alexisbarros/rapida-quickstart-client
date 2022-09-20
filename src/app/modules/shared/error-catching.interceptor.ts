import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { MyErrorHandler } from 'src/app/utils/error-handler';
import { RefreshTokenService } from './services/refresh-token.service';
import { SnackBarService } from './services/snackbar.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private _refreshToken: RefreshTokenService, private _snackBarService: SnackBarService, private _errorHandler: MyErrorHandler, private _router: Router) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((res: any) => res),
      catchError(async (error: any) => {
        if (error.logMessage === 'jwt expired') {
          await this._refreshToken.refreshToken();
        } else {
          const message = this._errorHandler.apiErrorMessage(error.message);
          this._snackBarService.openSnackBar(message);
          sessionStorage.clear();
          this._router.navigate(['/']);
        }
        return error;
      })
    );
  }
}
