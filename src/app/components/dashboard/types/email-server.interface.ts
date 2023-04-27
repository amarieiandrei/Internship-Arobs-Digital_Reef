export interface EmailServer {
  //   emailAddresses: Array<string>;
  mailSmtpAuth: boolean;
  mailUserId: string;
  mailUserPassword: string;
  smtpHostId: string;
  smtpHostPort: any;
}
