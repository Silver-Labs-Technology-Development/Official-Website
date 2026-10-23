import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

import { projects } from '../projects.mjs'

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8')
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
  for (const name of ['SilverPay', 'SilverForge / BSNA', 'SilvEx', 'Silver Scan', 'BTCS L2', 'BTCS mining pool', 'POW-S']) {
    assert.ok(names.includes(name), `missing project ${name}`)
  }
  assert.ok(projects.every((project) => ['Prototype', 'Development', 'Planned', 'Research'].includes(project.status)))
  assert.ok(projects.every((project) => project.repo === null || project.repo.startsWith('https://github.com/Silver-Labs-Technology-Development/')))
  assert.ok(projects.every((project) => typeof project.next === 'string' && project.next.length > 0))
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
