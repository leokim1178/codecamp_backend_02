import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        'client',
      clientSecret: 'Secret',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      password: '1111',
      name: profile.displayName,
      age: 0,
    };
  }
}
