/**
 * @flow
 */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import jetpack from 'fs-jetpack';
import ejs from 'ejs';

/**
 * Write content to file
 * @param content
 * @param dest
 */
const writeFile = (content, dest) => {
  mkdirp.sync(path.dirname(dest));
  fs.writeFileSync(dest, content);
};

const copyFile = (src, dest) => {
  mkdirp.sync(path.dirname(dest));

  let readStream = fs.createReadStream(src);

  readStream.once('error', (err) => {
    console.log(err);
  });

  readStream.pipe(fs.createWriteStream(dest));
};

/**
 * @flow
 */
async function generateHTMLDemo(fontName, data, dest) {
  const demoLigaTemplatePath = path.join(__dirname, '../template/demo-files/liga.js.template');
  const ligaTemplateContent = jetpack.read(demoLigaTemplatePath);
  const ligaContent = ejs.render(ligaTemplateContent, {
      fontName: fontName,
      items: data,
  });

  const demoLigaPath = path.join(dest, 'demo-files/liga.js');
  writeFile(ligaContent, demoLigaPath);

  const demoCssTemplatePath = path.join(__dirname, '../template/demo-files/demo.css.template');
  const cssTemplateContent = jetpack.read(demoCssTemplatePath);
  const cssContent = ejs.render(cssTemplateContent, {
      fontName: fontName,
      items: data,
  });

  const demoCssPath = path.join(dest, 'demo-files/demo.css');
  writeFile(cssContent, demoCssPath);

  const demoJsTemplatePath = path.join(__dirname, '../template/demo-files/demo.js.template');
  await copyFile(demoJsTemplatePath, path.join(dest, 'demo-files/demo.js'));

  const demoHTMLTemplatePath = path.join(__dirname, '../template/demo.html.template');
  const htmlTemplateContent = jetpack.read(demoHTMLTemplatePath);
  const htmlContent = ejs.render(htmlTemplateContent, {
      fontName: fontName,
      items: data,
  });

  const demoHTMLPath = path.join(dest, 'demo.html');
  writeFile(htmlContent, demoHTMLPath);

  console.log('HTML demo files generated');
}

export default generateHTMLDemo;
