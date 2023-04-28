import { EmailAddress } from './email-address.interface';

export interface EmailServer {
  emailAddresses: Array<EmailAddress>;
  mailSmtpAuth: boolean;
  mailUserId: string;
  mailUserPassword: string;
  smtpHostId: string;
  smtpHostPort: any;
}
