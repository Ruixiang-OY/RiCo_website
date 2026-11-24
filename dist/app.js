const benchmarks = {
  a: [
    ['0.054 / 5.64', '0.115 / 11.84', '0.196 / 18.83'],
    ['0.049 / 5.06', '0.103 / 10.90', '0.177 / 18.32'],
    ['0.031 / 2.86', '0.067 / 6.49', '0.115 / 11.40'],
  ],
  b: [
    ['0.047 / 4.91', '0.101 / 10.35', '0.176 / 17.91'],
    ['0.050 / 3.97', '0.095 / 8.51', '0.161 / 15.33'],
    ['0.032 / 2.59', '0.065 / 5.45', '0.111 / 9.54'],
  ],
  sphere: [
    ['0.034 / 4.05', '0.073 / 8.21', '0.124 / 13.68'],
    ['0.026 / 3.00', '0.057 / 6.48', '0.099 / 11.19'],
    ['0.026 / 2.65', '0.058 / 5.59', '0.100 / 9.69'],
  ],
};

const select = document.querySelector('#benchmark');
const caption = document.querySelector('#results-caption');
const rows = document.querySelector('#result-rows');

function updateResults() {
  const benchmarkName = select.selectedOptions[0].textContent;
  caption.textContent = `${benchmarkName} · Position RMSE (m) / orientation RMSE (°)`;
  benchmarks[select.value].forEach((values, rowIndex) => {
    values.forEach((value, columnIndex) => {
      rows.rows[rowIndex].cells[columnIndex + 1].textContent = value;
    });
  });
}

select.addEventListener('change', updateResults);
updateResults();

const copyButton = document.querySelector('#copy-bibtex');
const bibtex = document.querySelector('#bibtex');
const status = document.querySelector('#copy-status');

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(bibtex.textContent.trim());
    status.textContent = 'BibTeX copied.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(bibtex);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'BibTeX selected. Use your device’s copy command.';
  }
});
