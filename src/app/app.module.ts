import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import {
  AuthModule,
  OpenIdConfiguration,
  StsConfigHttpLoader,
  StsConfigLoader,
} from 'angular-auth-oidc-client';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TranslateModule } from '@ngx-translate/core';
import { getCurrentLang } from './core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthConfigModule } from './auth-config.module';
import { ButtonComponent } from './shared/button/button.component';

registerLocaleData(en);

export const createTranslateLoader = (httpBackend: HttpBackend) =>
  new TranslateHttpLoader(
    new HttpClient(httpBackend),
    `${window.location.origin}/assets/i18n/`,
    '.json'
  );

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    AuthConfigModule,
    ButtonComponent,
    TranslateModule.forRoot({
      defaultLanguage: getCurrentLang(),
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
