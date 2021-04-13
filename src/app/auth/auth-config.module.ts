import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
import { LoginComponent } from './login/login.component';

export function configureAuth(oidcConfigService: OidcConfigService): () => Promise<any> {
    return () =>
        oidcConfigService.withConfig({
            stsServer: 'https://login.microsoftonline.com/5a35dd12-2027-4c00-b63a-cc5076fec4b9/v2.0',
            authWellknownEndpoint: 'https://login.microsoftonline.com/common/v2.0',
            redirectUrl: window.location.origin,
            clientId: '28c6103a-caba-485e-ac2c-0888c9e992f8',
            scope: 'openid profile offline_access', // 'openid profile offline_access ' + your scopes
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            maxIdTokenIatOffsetAllowedInSeconds: 600,
            issValidationOff: true,
            autoUserinfo: false,
            customParams: {
              prompt: 'select_account', // login, consent
            },
    });
}

@NgModule({
    imports: [AuthModule.forRoot(), CommonModule],
    exports: [AuthModule, LoginComponent],
    providers: [
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configureAuth,
            deps: [OidcConfigService],
            multi: true,
        },
    ],
    declarations: [LoginComponent],
})
export class AuthConfigModule {}
