import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailServerNotificationsService {
  constructor() {}

  public verifSmtpHost = (value: string): boolean => {
    const regexIP =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    const regexHostname =
      /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;

    if (!regexIP.test(value) && !regexHostname.test(value) && value !== '') {
      return true;
    } else {
      return false;
    }
  };

  public verifSaveBtnLogic = (
    hostValue: string,
    isHostFormatAlert: boolean,
    hostPortValue: string
  ): boolean => {
    if (
      (hostValue.localeCompare('localhost') !== 0 &&
        hostValue !== '' &&
        isHostFormatAlert !== true) ||
      (hostPortValue.localeCompare('25') !== 0 && hostPortValue !== '')
    ) {
      return false;
    }
    return true;
  };

  public testEmail = (email: string): boolean => {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexEmail.test(email);
  };
}
