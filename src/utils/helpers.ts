import fs from 'fs';
import path from 'path';

/* 
 Work in progress, check how to make it work on CommonJS
*/

var normalizedPath = path.join(__dirname, '.');

export const FileLoader = async () => {
  const files = fs.readdirSync(normalizedPath);

  const required: any = [];

  for (const item of files) {
    console.log(item);
    if (item.includes('routes.ts')) {
      const itemName = item.split('.');
      const { default: itemRoute } = await import(`./${item}`);

      required.push({
        name: `/${itemName[0]}`,
        route: itemRoute,
      });
    }
  }

  return required;
};
