import {
  Config, adjectives, colors, animals,
} from "unique-names-generator";

// eslint-disable-next-line import/prefer-default-export
export const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: "",
  length: 2,
};

// const randomName: string = uniqueNamesGenerator({
//   dictionaries: [adjectives, colors, animals],
// }); // big_red_donkey

// const shortName: string = uniqueNamesGenerator(customConfig);
