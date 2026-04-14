import Print from "./app/mixin/Print.js";

async function run() {
  const html = `
    <html>
      <body>
        <h1 style="color: blue;">Relatório</h1>
        <p>Gerado com Puppeteer</p>
      </body>
    </html>
  `;

  await Print.create()
    .stringHtml(html)
    .print("meu-pdf.pdf");
}

run();