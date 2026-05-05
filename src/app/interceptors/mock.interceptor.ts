import { HttpContext, HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, filter, Observable, switchMap, take, throwError } from "rxjs";
import { HomeService } from "../components/home/home.service";
import { R3SelectorScopeMode, Token } from "@angular/compiler";




