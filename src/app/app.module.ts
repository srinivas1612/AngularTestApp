import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard'
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ReactiveComponent } from './reactive/reactive.component';
import { HomeLayoutComponent } from './_layouts/home-layout/home-layout.component';
import { HomeHeaderComponent } from './_layouts/home-header/home-header.component';
import { HomeFooterComponent } from './_layouts/home-footer/home-footer.component';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './_layouts/admin-header/admin-header.component'; 
import { routing } from './app.routes';
import { UserHeaderComponent } from './_layouts/user-header/user-header.component';
import { UserLayoutComponent } from './_layouts/user-layout/user-layout.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { FilterPipe } from './pipes/filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ReactiveComponent,
    HomeLayoutComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    UserLayoutComponent,
    UserdetailsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
  ],
  providers: [UserService, AuthService, AuthGuard, RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
