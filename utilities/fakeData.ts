import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";

export class FakeUser {
  firstName: string;
  lastName: string;
  email: string;
  invalidEmail: string;
  telephone: string;
  password: string;
  passwordConfirm: string;
  newsletterSubscribe: boolean;
  

  constructor(page: Page) {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.invalidEmail = faker.internet.displayName();
    this.telephone = faker.phone.number();
    this.password = faker.internet.password();
    this.passwordConfirm = this.password;
    this.newsletterSubscribe = faker.datatype.boolean();
    
  }
}
