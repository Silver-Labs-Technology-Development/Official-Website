import { projects } from './projects.mjs'

const projectGrid = document.querySelector('#project-grid')

if (projectGrid) {
  projectGrid.innerHTML = projects.map((project, index) => {
    const repository = project.repo
      ? `<a class="project-repo" href="${project.repo}" target="_blank" rel="noopener noreferrer">${project.repoLabel} <span aria-hidden="true">↗</span></a>`
      : `<span class="project-repo project-repo-muted">${project.repoLabel}</span>`
    return `
      <article class="project-card">
        <div class="project-card-top">
          <span class="project-index">${String(index + 1).padStart(2, '0')}</span>
          <span class="status-pill status-${project.statusClass}">${project.status}</span>
        </div>
        <p class="project-category">${project.category}</p>
        <h3><a class="project-title-link" href="projects/${project.slug}.html">${project.name}</a></h3>
        <p class="project-summary">${project.summary}</p>
        <p class="project-next"><strong>Next:</strong> ${project.next}</p>
        <a class="project-detail-link" href="projects/${project.slug}.html">Explore ${project.name} <span aria-hidden="true">→</span></a>
        ${repository}
      </article>
    `
  }).join('')
}

const year = document.querySelector('#current-year')
if (year) year.textContent = String(new Date().getFullYear())
