import { AuthGuard } from './auth/auth.guard';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import {RouterModule, Routes} from '@angular/router'
import {ProductListComponent} from './products/product-list/product-list.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user/user.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { CandidatesComponent } from './candidates/candidates/candidates.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';
import { ViewCandidateComponent } from './candidates/view-candidate/view-candidate.component';

const routes:Routes=[
    {path:'register', component:RegisterComponent},
    {path:'login',  component:LoginComponent },
    { path:'', component:CandidatesComponent, canActivate: [AuthGuard] },
    { path:'add-vehicle', component:AddProductComponent, canActivate: [AuthGuard]},
    { path:'edit-vehicle', component:EditProductComponent, canActivate: [AuthGuard] },
    { path:'add-candidate', component:AddCandidateComponent, canActivate: [AuthGuard] },
    { path:'edit-candidate', component:EditCandidateComponent, canActivate: [AuthGuard] },
    { path:'view-candidate', component:ViewCandidateComponent, canActivate: [AuthGuard] },
    { path:'user', component:UserComponent , canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export const routing=RouterModule.forRoot(routes)