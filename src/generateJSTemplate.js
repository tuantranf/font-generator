const isAndroid = (name) => name.indexOf('android') > -1;

const lowercaseFirstLetter = text => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;

const snakeToCamel = text => text.replace(/(\-\w)/g, (m) => m[1].toUpperCase());

const withoutPlatform = (name) => lowercaseFirstLetter(name.replace('ios', '').replace('android', ''));

/**
 * @flow
 */
const getJsTemplateData = (codepoints) => {
  // ios and android
  const ios = Object.keys(codepoints)
    .filter((name) => name.indexOf('ios') > -1)
    .map((name) => ({
      name: snakeToCamel(withoutPlatform(name)),
      value: codepoints[name].toString(16),
  }));

  const android = Object.keys(codepoints)
    .filter((name) => name.indexOf('android') > -1)
    .map((name) => ({
      name: snakeToCamel(withoutPlatform(name)),
      value: codepoints[name].toString(16),
    }));

  return {
    ios,
    android,
  };
}

export default getJsTemplateData;
