window.renderApp = () => {
    document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
  };