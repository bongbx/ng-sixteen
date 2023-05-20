import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://smartlog-auth-be-dev.smartlogvn.com',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'STX_App',
        scope: 'openid profile email address phone role Auth offline_access',
        responseType: 'code',
        silentRenew: true,
        authWellknownEndpointUrl: 'https://smartlog-auth-be-dev.smartlogvn.com/.well-known/openid-configuration',
        useRefreshToken: true,
        // triggerRefreshWhenIdTokenExpired: false,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}