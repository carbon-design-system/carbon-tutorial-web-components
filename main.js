import './style.css'
import carbonLogo from '/carbon.svg'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://carbondesignsystem.com" target="_blank">
      <img src="${carbonLogo}" class="logo carbon" alt="Carbon logo" />
    </a>
    <h1>Hello Carbon!</h1>
    <p class="read-the-docs">
      Well, not quite yet. This is the starting point for the
      <a href="https://carbondesignsystem.com/developing/web-components-tutorial/overview" target="_blank">
        Carbon Web components tutorial
      </a>.
    </p>
  </div>
`
