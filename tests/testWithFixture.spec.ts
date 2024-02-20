
import {test} from '../test-option'
import { faker } from "@faker-js/faker";


test.only("Parametrized methods", async ({ pageManager}) => {
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    100
  )}@test.com`;

  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Option 1"
    );
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false
    );
});
