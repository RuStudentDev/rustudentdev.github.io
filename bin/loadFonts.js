import { mkdirSync, readFileSync, rmdirSync, rmSync, writeFile, writeFileSync } from "fs";
import { get } from "https";
import { basename, join, parse } from "path";
import { cwd } from "process";

const [, , stylePath] = process.argv;

if (!stylePath)
  throw 'No find style path!';

const fullPath = join(cwd(), stylePath);
const fontsFolder = 'data';
const {
  dir: basePath,
  base: fileName,
  ext
} = parse(fullPath);

const fileData = readFileSync(stylePath, 'utf-8');
const urlsSet = [''].slice(1);

const preFileData = fileData.replace(/url\(([^\)]+)\)/g, (find, url) => {
  let index = urlsSet.indexOf(url);

  if (index === -1) {
    index = urlsSet.length;
    urlsSet.push(url);
  }

  return `%${index}%`;
});

rmSync(join(basePath, fontsFolder), { recursive: true });
mkdirSync(join(basePath, fontsFolder), { recursive: true });

Promise.all(
  urlsSet.map(url => {
    return new Promise((r, e) => {
      const exportFileName = join(fontsFolder, basename(url));

      let buff = Buffer.from('');
      get(url, (res) => {
        res.on('data', (c) => buff = Buffer.concat([buff, c]));
        res.on('end', () => {
          writeFile(join(basePath, exportFileName), buff, (err) => {
            if (err) e(err);
            else r(exportFileName);
          });
        });
      }).end();
    });
  })
).then(urls => {
  writeFileSync(
    join(basePath, basename(fileName, ext) + '.scss'),
    preFileData.replace(/\%(\d+)\%/g, (_, index) => {
      return `url(${urls[+index]})`;
    })
  );
});
