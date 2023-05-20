import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OidcSecurityService,
  ConfigurationService,
} from 'angular-auth-oidc-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isCollapsed = false;
  title = 'ng-16';

  constructor(
    private readonly oidcSecurityService: OidcSecurityService,
    private readonly configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.configurationService.getOpenIDConfigurations();

    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken }) => {
        console.log('app authenticated', isAuthenticated);
        console.log(`Current access token is '${accessToken}'`);
        console.log(`User data`, userData);
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }
}
