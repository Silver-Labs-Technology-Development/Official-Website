import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

import { projects } from '../projects.mjs'

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8')
const pagesWorkflow = await readFile(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8')
const expectedSections = ['home', 'ecosystem', 'architecture', 'roadmap', 'developers', 'about']

test('all primary navigation sections exist and navigation links resolve', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
  for (const section of expectedSections) assert.ok(ids.has(section), `missing #${section}`)
  for (const [, href] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(href), `unresolved in-page link #${href}`)
  }
})

test('project status data covers requested systems without implying availability', () => {
  const names = projects.map((project) => project.name)
  for (const name of [
    'SilverPay',
    'SilverForge / BSNA',
    'SilvEx CEX',
    'SilvEx DEX',
    'SilvEx DEX Node',
    'Silver Scan',
    'BTCS L2',
    'BTCS mining pool',
    'POW-S',
  ]) {
    assert.ok(names.includes(name), `missing project ${name}`)
  }
  assert.ok(projects.every((project) => ['Prototype', 'Development', 'Planned', 'Research'].includes(project.status)))
  assert.ok(projects.every((project) => project.repo === null || project.repo.startsWith('https://github.com/Silver-Labs-Technology-Development/')))
  assert.ok(projects.every((project) => typeof project.next === 'string' && project.next.length > 0))

  const exchangeProjects = projects.filter((project) => project.name.startsWith('SilvEx '))
  assert.equal(exchangeProjects.length, 3)
  assert.ok(exchangeProjects.every((project) => project.status === 'Planned' && project.repo === null))
  assert.match(projects.find((project) => project.name === 'SilvEx CEX').summary, /not been adopted/)
  assert.match(projects.find((project) => project.name === 'SilverForge / BSNA').summary, /local prototypes/)
  assert.match(projects.find((project) => project.name === 'SilverForge / BSNA').summary, /identity-gated BTCS L2 local-node profile/)
  assert.match(projects.find((project) => project.name === 'BTCS mining pool').summary, /not been runtime-tested/)
  assert.match(projects.find((project) => project.name === 'BTCS mining pool').next, /GPL-3\.0/)
  assert.match(projects.find((project) => project.name === 'Silver Scan').summary, /bounded local view/)
})

test('project details explain each distinct SilvEx workstream and development boundary', () => {
  for (const heading of ['SilvEx CEX', 'SilvEx DEX', 'SilvEx DEX Node', 'BTCS mining pool', 'POW-S']) {
    assert.ok(html.includes(`<h3>${heading}</h3>`), `missing details for ${heading}`)
  }
  assert.match(html, /No cross-network transfer or trustless L2 settlement is claimed/)
  assert.match(html, /no real-value trading is available/)
  assert.match(html, /SilverForge previews are not available as public downloads/)
  assert.match(html, /experimental BTCS L2 profile restricted to an identity-checked local development node/)
})

test('external links use the verified Silver Labs organization and documented paths', () => {
  const hrefs = [...html.matchAll(/\bhref="(https:\/\/[^"]+)"/g)].map((match) => match[1])
  assert.ok(hrefs.length > 0)
  for (const href of hrefs) {
    const url = new URL(href)
    assert.equal(url.hostname, 'github.com', `unexpected external host in ${href}`)
    assert.ok(
      url.pathname === '/Silver-Labs-Technology-Development' ||
        url.pathname.startsWith('/Silver-Labs-Technology-Development/'),
      `unexpected GitHub owner in ${href}`,
    )
  }
  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    const tag = match[0]
    assert.match(tag, /\brel="noopener noreferrer"/)
  }
})

test('responsive and accessibility foundations are present', () => {
  assert.match(html, /<html lang="en">/)
  assert.match(html, /name="viewport"/)
  assert.match(html, /class="skip-link" href="#main"/)
  assert.match(html, /aria-label="Primary navigation"/)
  assert.match(html, /aria-expanded="false"/)
  assert.match(css, /@media \(max-width: 640px\)/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(css, /:focus-visible/)
})

test('Silver Labs visual identity uses navy structure and bright blue accents', () => {
  assert.match(css, /--navy:\s*#14263d/i)
  assert.match(css, /--accent:\s*#1677d2/i)
  assert.match(css, /--blue:\s*#8dc8ff/i)
  assert.match(css, /\.button-light\s*\{[^}]*background:\s*var\(--accent\)/s)
})

test('Pages workflow validates pull requests and deploys only the development branch', () => {
  assert.match(pagesWorkflow, /push:\s*\n\s+branches:\s*\n\s+- website-development/)
  assert.match(pagesWorkflow, /pull_request:\s*\n\s+branches:\s*\n\s+- main/)
  assert.match(pagesWorkflow, /if:\s+github\.event_name != 'pull_request'/)
  assert.match(pagesWorkflow, /path: _site/)
  assert.match(pagesWorkflow, /pages:\s+write/)
  assert.match(pagesWorkflow, /id-token:\s+write/)
  assert.match(pagesWorkflow, /node --test tests\/\*\.test\.mjs/)
})
