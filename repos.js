import '@carbon/web-components/es/components/data-table/index.js';

let data = [
  {
    name: 'Repo A',
    created: 'Date',
    updated: 'Date',
    openIssues: 123,
    stars: 456,
    links: 'Links',
    expansion: 'Row description',
  },
  {
    name: 'Repo B',
    created: 'Date',
    updated: 'Date',
    openIssues: 123,
    stars: 456,
    links: 'Links',
    expansion: 'Row description',
  },
  {
    name: 'Repo D',
    created: 'Date',
    updated: 'Date',
    openIssues: 123,
    stars: 456,
    links: 'Links',
    expansion: 'Row description',
  },
];

const updateTable = () => {
  const tableRowTemplate = document.querySelector(
    'template#template--table-row',
  );
  const tableBody = document.querySelector('cds-table-body');
  if (tableBody && tableRowTemplate) {
    tableBody.innerHTML = '';
    data.forEach((row) => {
      let newRow = tableRowTemplate.content.cloneNode(true);
      const keys = Object.keys(row);
      keys.forEach((key) => {
        const keyEl = newRow.querySelector(`[key="${key}"]`);
        keyEl.innerHTML = row[key];
      });
      tableBody.appendChild(newRow);
    });
  }
};

updateTable();
