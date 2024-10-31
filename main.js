import './style.scss';
import '@carbon/web-components/es/components/button/button.js';
import '@carbon/web-components/es/components/ui-shell/index';
import '@carbon/web-components/es/components/checkbox/index';
import '@carbon/web-components/es/components/content-switcher/index';
import '@carbon/web-components/es/components/skip-to-content/index.js';
import '@carbon/web-components/es/components/breadcrumb/index';
import '@carbon/web-components/es/components/tabs/index';
import '@carbon/web-components/es/components/link/index';
import '@carbon/web-components/es/components/pagination/index';
import { Octokit } from '@octokit/core';

const octokitClient = new Octokit({});
const bodyEl = document.querySelector('body');

const handleGlobalActionClick = (ev) => {
  const targetPanelId = ev.currentTarget.getAttribute('panel-id');
  const panels = document.querySelectorAll('cds-header-panel');
  // check to see if other panels are open and close them
  panels.forEach((panel) => {
    if (panel.id !== targetPanelId) {
      panel.expanded = false;
    }
  });
};
const globalActions = document.querySelectorAll('cds-header-global-action');
[...globalActions].forEach((action) =>
  action.addEventListener('click', handleGlobalActionClick),
);

const handleSwitch = (ev) => {
  // Applies new theme or defers to system preferences by removing theme
  switch (ev.detail.item.value) {
    case 'light':
      bodyEl.classList.remove('g100');
      bodyEl.classList.add('g10');
      break;
    case 'dark':
      bodyEl.classList.remove('g10');
      bodyEl.classList.add('g100');
      break;
    default:
      bodyEl.classList.remove('g10');
      bodyEl.classList.remove('g100');
  }
};
document
  .querySelector('.theme-selector')
  .addEventListener('cds-content-switcher-selected', handleSwitch);

const handleHeaderCompliment = (ev) => {
  document
    .querySelector('cds-header')
    .classList.toggle('compliment', ev.target.checked);
};
document
  .querySelector('.theme-header__compliment')
  .addEventListener('cds-checkbox-changed', handleHeaderCompliment);

let data = [];
let pageSize = 10;
let firstRowIndex = 0;

const updateTable = () => {
  const tableRowTemplate = document.querySelector(
    'template#template--table-row',
  );
  const tableBody = document.querySelector('cds-table-body');
  if (tableBody && tableRowTemplate) {
    tableBody.innerHTML = '';
    // iterate over data and render rows
    data
      .filter((v, i) => i >= firstRowIndex && i < firstRowIndex + pageSize)
      .forEach((row) => {
        let newRow = tableRowTemplate.content.cloneNode(true);
        const keys = Object.keys(row);
        keys.forEach((key) => {
          const keyEl = newRow.querySelector(`[key="${key}"]`);
          if (key === 'links') {
            keyEl.innerHTML = `<ul class="link-list">
  <li>
    <cds-link href="${row[key].url}">Github</cds-link>
  </li>
  <li>
    <cds-link href="${row[key].homepage}">Homepage</cds-link>
  </li>
</ul>`;
          } else {
            keyEl.innerHTML = row[key];
          }
        });
        tableBody.appendChild(newRow);
      });
  }
};

const replaceSkeleton = () => {
  const tableSkeleton = document.querySelector('cds-table-skeleton');
  const tableTemplate = document.querySelector('template#template--table');

  if (tableSkeleton && tableTemplate) {
    tableSkeleton.replaceWith(tableTemplate.content.cloneNode(true));
    // update table rows
    updateTable();

    // update pagination
    updatePagination();
  }
};

const fetchData = async () => {
  const res = await octokitClient.request('GET /orgs/{org}/repos', {
    org: 'carbon-design-system',
    per_page: 75,
    sort: 'updated',
    direction: 'desc',
  });

  if (res.status === 200) {
    data = res.data.map((row) => ({
      name: row.name,
      created: new Date(row.created_at).toLocaleDateString(),
      updated: new Date(row.updated_at).toLocaleDateString(),
      openIssues: row.open_issues_count,
      stars: row.stargazers_count,
      links: { url: row.html_url, homepage: row.homepage },
      expansion: row.description,
    }));

    // replace table here
    replaceSkeleton();
  } else {
    console.log('Error obtaining repository data');
  }
};
fetchData();

const handlePageChangeCurrent = ({ detail }) => {
  firstRowIndex = (detail.page - 1) * detail.pageSize;
  // Unfortunately not working - seems to lose the expanding row
  // https://github.com/carbon-design-system/carbon/issues/#17894

  updateTable();
};

const handlePageSizeChange = ({ detail }) => {
  // Unfortunately not working
  // https://github.com/carbon-design-system/carbon/issues/17713

  pageSize = detail.pageSize;
  updateTable();
};

const updatePagination = () => {
  // update pagination to match data fetched
  const paginationEl = document.querySelector('cds-pagination');
  paginationEl.setAttribute('total-items', data.length);

  setTimeout(() => {
    // defer until after the dom is updated
    paginationEl.addEventListener(
      'cds-pagination-changed-current',
      handlePageChangeCurrent,
    );
    paginationEl.addEventListener(
      'cds-pagination-changed-page-size',
      handlePageSizeChange,
    );
  }, 10);
};

const infoCardDetails = [
  {
    strongMsg: 'Open',
    bodyMsg: `It's a distributed effort, guided by the principles of the open-source movement. Carbon's users are also it's makers, and everyone is encouraged to contribute.`,
    pictogramName: 'advocate',
  },
  {
    strongMsg: 'Modular',
    bodyMsg: `Carbon's modularity ensures maximum flexibility in execution. It's components are designed to work seamlessly with each other, in whichever combination suits the needs of the user.`,
    pictogramName: 'accelerating-transformation',
  },
  {
    strongMsg: 'Consistent',
    bodyMsg: `Based on the comprehensive IBM Design Language, every element and component of Carbon was designed from the ground up to work elegantly together to ensure consistent, cohesive user experiences.`,
    pictogramName: 'globe',
  },
];

const updateInfoCard = (here, { strongMsg, bodyMsg, pictogramName }) => {
  const infoCardTemplate = document.querySelector(
    'template#template--info-card',
  );

  if (here && infoCardTemplate) {
    const newInfoCard = infoCardTemplate.content.cloneNode(true);

    const strongEl = newInfoCard.querySelector('.info-card__heading--strong');
    strongEl.innerHTML = strongMsg;

    const infoBodyEl = newInfoCard.querySelector('.info-card__body');
    infoBodyEl.innerHTML = bodyMsg;

    const pictogramEl = newInfoCard.querySelector('.info-card__pictogram');
    pictogramEl.classList.add(`info-card__pictogram--${pictogramName}`);

    here.innerHTML = '';
    here.replaceWith(newInfoCard);
  }
};

const infoCards = document.querySelectorAll('.info-card');
[...infoCards].forEach((infoCard, index) => {
  updateInfoCard(infoCard, infoCardDetails[index]);
});
