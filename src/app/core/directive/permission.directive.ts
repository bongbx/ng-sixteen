import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PermissionService {

  getGrantedPolicy(key: string) {
    const policies = this.getSnapshot();
    return this.isPolicyGranted(key, policies);
  }

  protected isPolicyGranted(key: string, grantedPolicies: Record<string, boolean>) {
    if (!key) return true;

    const orRegexp = /\|\|/g;
    const andRegexp = /&&/g;

    // TODO: Allow combination of ANDs & ORs
    if (orRegexp.test(key)) {
      const keys = key.split('||').filter(Boolean);

      if (keys.length < 2) return false;

      return keys.some(k => this.getPolicy(k.trim(), grantedPolicies));
    } else if (andRegexp.test(key)) {
      const keys = key.split('&&').filter(Boolean);

      if (keys.length < 2) return false;

      return keys.every(k => this.getPolicy(k.trim(), grantedPolicies));
    }

    return this.getPolicy(key, grantedPolicies);
  }

  protected getSnapshot() {
    return this.mapToPolicies(this.configState.getAll());
  }

  protected mapToPolicies(applicationConfiguration: ApplicationConfigurationDto) {
    return applicationConfiguration?.auth?.grantedPolicies || {};
  }

  protected getPolicy(key: string, grantedPolicies: Record<string, boolean>) {
    return grantedPolicies[key] || false;
  }
}
