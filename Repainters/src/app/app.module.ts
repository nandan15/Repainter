import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EnquiryModule } from './modules/enquiry/enquiry.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotationBuilderModule } from './modules/quotation-builder/quotation-builder.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Shared/common/AuthGuard';
import { APInterceptor } from './Shared/Provider/APInterceptor';
import { LoginModule } from './modules/login/login.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { CustomerModalComponent } from './modules/customer/customer-modal/customer-modal.component';
import { NavigationErrorHandler } from './Shared/Service/navigation-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EnquiryModule,
    HttpClientModule,
    LoginModule,
    MatIconModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    })
  ],
  providers: [AuthGuard, NavigationErrorHandler,{provide:HTTP_INTERCEPTORS,useClass:APInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
