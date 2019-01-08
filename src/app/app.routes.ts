import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { UsersComponent } from './users/users.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { HomeLayoutComponent } from './_layouts/home-layout/home-layout.component';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './_layouts/user-layout/user-layout.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const appRoutes: Routes = [

    //Website routes goes here 
    { 
        path: '', 
        component: HomeLayoutComponent,
        children: [
            { path : '', redirectTo:'/login', pathMatch : 'full'},
            { path : '*', redirectTo:'/login', pathMatch : 'full'},
            { path: 'login', component: LoginComponent},
            { path: 'reactive', component: ReactiveComponent},
        ]
    },
    

    // Admin routes goes here here..
    { 
        path: '',
        component: AdminLayoutComponent, 
        children: [
            //{ path: 'users', component: UsersComponent, canActivate:[AuthGuard]},
            { 
                path: 'users', 
                component: UsersComponent, 
                canActivate: [RoleGuard], 
                data: { 
                  expectedRole: 'Admin'
                } 
              },
        ]
    },
    
    // Admin routes goes here here..
    { 
        path: '',
        component: UserLayoutComponent, 
        children: [
            { path: 'userdetails', component: UserdetailsComponent, canActivate:[AuthGuard]},
        ]
    },

     //no layout routes here
    //{ path: 'anypage', component: AnyPageComponent},
]
export const routing = RouterModule.forRoot(appRoutes);