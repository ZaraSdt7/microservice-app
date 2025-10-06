import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';


dotenv.config();


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
private readonly logger = new Logger(JwtStrategy.name);
constructor() {
super({
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
ignoreExpiration: false,
secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
});
}


async validate(payload: any) {
this.logger.debug(`jwt validate payload sub=${payload.sub}`);
return { id: payload.sub, email: payload.email, role: payload.role };
}
}