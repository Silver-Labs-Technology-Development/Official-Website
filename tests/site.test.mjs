import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { projects } from '../projects.mjs'

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8')
const html = await read('index.html')
const css = await read('styles.css')
const infoCss = await read('info.css')
const workflow = await read('.github/workflows/pages.yml')
const pages = ['about', 'contact', 'faq', 'listing', 'privacy', 'terms']
const projectSlugs = ['silver-pool', 'silver-scan', 'silverpay', 'silverforge', 'silvex', 'silvex-dex', 'silvex-dex-node', 'btcs-l2', 'pow-s', 'silver-labs-platform', 'soarin-media']
const infoPages = await Promise.all(pages.map(async slug => ({slug,html:await read(slug + '.html')})))

test('all primary anchors resolve, including Silver Scan research', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]))
  for (const name of ['home','ecosystem','architecture','research','roadmap','developers','about']) {
    assert.ok(ids.has(name), 'missing section ' + name)
  }
  for (const [,target] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(target), 'unresolved anchor #' + target)
  }
})

test('product directory uses current Silver Labs names and real repository paths', () => {
  const names = projects.map(p => p.name)
  assert.equal(new Set(names).size, names.length)
  for (const name of ['Silver Pool','Silver Scan','SilverPay','SilverForge Studio / BSNA','SilvEx','SilvEx DEX & DEX Node','BTCS L2','POW-S','Silver Labs Platform']) {
    assert.ok(names.includes(name), 'missing ' + name)
  }
  const source = 'https://github.com/Silver-Labs-Technology-Development/'
  for (const p of projects) {
    assert.ok(['Prototype','Development','Planned','Research'].includes(p.status))
    assert.ok(p.repo.startsWith(source), 'incorrect repository owner: ' + p.name)
    assert.ok(p.summary.length > 70 && p.next.length > 40, 'unhelpful status description')
  }
  assert.equal(projects.find(p => p.name === 'Silver Pool').repo, source + 'Silver-Pool')
  assert.equal(projects.find(p => p.name === 'Silver Scan').repo, source + 'Silver-Scan')
  assert.equal(projects.find(p => p.name === 'SilvEx').repo, source + 'SilvEx')
})

test('pool, explorer and exchange statuses do not claim unverified production launch', () => {
  const pool = projects.find(p => p.name === 'Silver Pool')
  const scan = projects.find(p => p.name === 'Silver Scan')
  const exchange = projects.find(p => p.name === 'SilvEx')
  assert.match(pool.summary, /locally/i)
  assert.match(pool.summary, /payouts/i)
  assert.match(scan.summary, /BTCS L1/)
  assert.match(scan.summary, /Coin Watch/)
  assert.match(exchange.summary, /not verified/i)
  assert.match(html, /href="projects\/silver-scan\.html"/)
  assert.match(html, /href="growth\.html"/)
  assert.match(html, /payouts disabled/i)
  assert.match(html, /NO LIVE TRADING/)
  assert.doesNotMatch(html, /no explorer and pool service|no separate pool service exists/i)
})

test('information pages exist, link home, and are accessible', () => {
  for (const {slug,html:page} of infoPages) {
    assert.match(page, /<html lang="en">/)
    assert.match(page, /name="viewport"/)
    assert.match(page, /class="skip" href="#content"/)
    assert.match(page, /<main id="content">/)
    assert.match(page, /<h1>/)
    assert.match(page, /href="index\.html"/)
    assert.match(html, new RegExp('href="' + slug + '\\.html"'))
  }
  assert.match(infoCss, /:focus-visible/)
  assert.match(infoCss, /@media\(max-width:640px\)/)
})

test('listing information is inactive, not a payable offer', () => {
  const listing = infoPages.find(p => p.slug === 'listing').html
  assert.match(listing, /US\$4,000/)
  assert.match(listing, /Applications are not currently open/)
  assert.match(listing, /not an active price/i)
  assert.match(listing, /network, contract or mint address/)
})

test('site policies and FAQ distinguish products and providers', () => {
  const faq = infoPages.find(p => p.slug === 'faq').html
  const terms = infoPages.find(p => p.slug === 'terms').html
  const privacy = infoPages.find(p => p.slug === 'privacy').html
  assert.match(faq, /Silver Labs operates its own products and developer repositories/i)
  assert.match(faq, /Silver Scan/)
  assert.match(terms, /Third-party market/)
  assert.match(privacy, /Hosting providers/)
})

test('all outbound index and information-page links use safe rel and known host', () => {
  for (const page of [html,...infoPages.map(x => x.html)]) {
    for (const [,link] of page.matchAll(/\bhref="(https:\/\/[^"]+)"/g)) {
      const url = new URL(link)
      assert.equal(url.hostname,'github.com', 'unexpected outbound host ' + link)
      assert.ok(url.pathname.startsWith('/Silver-Labs-Technology-Development'))
    }
    for (const [tag] of page.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.match(tag, /rel="noopener noreferrer"/)
    }
  }
})

test('homepage and information styling remain responsive', () => {
  assert.match(html, /name="viewport"/)
  assert.match(html, /class="skip-link" href="#main"/)
  assert.match(html, /aria-label="Primary navigation"/)
  assert.match(css, /@media \(max-width: 640px\)/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(css, /--navy:\s*#14263d/i)
  assert.match(css, /--accent:\s*#1677d2/i)
})

test('Pages workflow tests PRs, deploys development branch, packages each page', () => {
  assert.match(workflow, /pull_request:\s*\n\s*branches:\s*\n\s*- main/)
  assert.match(workflow, /branches:\s*\n\s*- website-development/)
  assert.match(workflow, /node --test tests\/\*\.test\.mjs/)
  assert.match(workflow, /path: _site/)
  assert.match(workflow, /if:\s*github\.event_name != 'pull_request'/)
  for (const page of [...pages.map(x => x+'.html'),'info.css','project.css','shell.css','shell.mjs','architecture.html','roadmap.html','developers.html','growth.html','index.html','styles.css','projects.mjs','site.mjs']) {
    assert.ok(workflow.includes(page), 'not packaged: ' + page)
  }
})

test('all eleven products have substantial dedicated pages with honest launch gates', async () => {
  const directory = await read('projects/index.html')
  const growth = await read('growth.html')
  for (const slug of projectSlugs) {
    const page = await read('projects/' + slug + '.html')
    assert.match(directory, new RegExp('href="' + slug + '\\.html"'))
    assert.match(page, /What has already been built/)
    assert.match(page, /How to use or preview/)
    assert.match(page, /How to get involved/)
    assert.match(page, /When will it be live/)
    assert.match(page, /release-readiness|launch dates|launch date|launch milestones|Launch dates/i)
    assert.match(page, /href="\.\.\/index\.html"/)
    assert.ok(page.length > 4000, 'Project page has insufficient depth: ' + slug)
  }
  for (const project of projects) {
    assert.ok(project.slug, 'Missing project page slug: ' + project.name)
    assert.ok(projectSlugs.includes(project.slug), 'Missing file for project: ' + project.slug)
  }
  assert.match(growth, /YOUR PROJECT/)
  assert.match(growth, /Silver Scan/)
  assert.match(growth, /SPONSORED PROJECT BILLBOARD/)
  assert.match(growth, /Applications, paid billboard inventory and listing payments are not currently open/)
})

test('Pages artifact includes the full project directory and growth pages', () => {
  assert.match(workflow, /cp -R projects _site\//)
  assert.match(workflow, /project\.css/)
  assert.match(workflow, /growth\.html/)
})


const allSitePaths = [
  'index.html', ...pages.map(p=>p+'.html'),
  'architecture.html','roadmap.html','developers.html','growth.html',
  'projects/index.html',...projectSlugs.map(slug=>'projects/'+slug+'.html')
]

test('every page shares one Silver Pool-inspired static navigation and footer', async()=>{
  const css = await read('shell.css')
  const js = await read('shell.mjs')
  assert.match(css,/--charcoal:#101315/)
  assert.match(css,/--gold-light:#e4c778/)
  assert.match(css,/\.primary-navigation/)
  assert.match(css,/@media\(max-width:900px\)/)
  assert.match(js,/aria-expanded/)
  for(const path of allSitePaths){
    const html=await read(path)
    const prefix=path.startsWith('projects/')?'../':''
    assert.match(html,new RegExp('href="'+prefix+'shell\\.css"'),path)
    assert.match(html,new RegExp('src="'+prefix+'shell\\.mjs"'),path)
    assert.equal((html.match(/class="site-header"/g)||[]).length,1,path+' must have one header')
    assert.equal((html.match(/class="shell-footer"/g)||[]).length,1,path+' must have one footer')
    const nav=html.match(/<nav\b[^>]*data-site-nav[^>]*>([\s\S]*?)<\/nav>/)
    assert.ok(nav,'Missing site-wide navigation: '+path)
    const targets=[...nav[1].matchAll(/\bhref="([^"]+)"/g)].map(x=>x[1])
    assert.deepEqual(targets,[
      'index.html','projects/index.html','architecture.html','roadmap.html',
      'developers.html','growth.html','about.html','contact.html'
    ].map(p=>prefix+p),'Wrong nav structure: '+path)
    assert.ok(targets.every(h=>!h.includes('#')),path+' still has scrolling tabs')
  }
})

test('all internal links point to real HTML pages or explicit skip targets', async()=>{
  for(const path of allSitePaths){
    const html=await read(path)
    const absolute=new URL('../'+path,import.meta.url)
    const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]))
    for(const [,href] of html.matchAll(/\bhref="([^"]+)"/g)){
      if(href.startsWith('#')){
        assert.ok(ids.has(href.slice(1)),'Broken local anchor '+href+' on '+path)
        continue
      }
      if(/^(https?:|mailto:|data:)/.test(href))continue
      const resolved=new URL(href,absolute)
      assert.ok(resolved.pathname.endsWith('.html'),'Non-page local link '+href+' on '+path)
      try{await access(fileURLToPath(resolved))}
      catch{assert.fail('Broken link '+href+' on '+path)}
    }
  }
})

test('homepage CTAs and diagrams lead to full pages, not scrolling sections',()=>{
  assert.match(html,/href="projects\/index\.html"/)
  assert.match(html,/class="arch-node[^"]*arch-link" href="projects\/silver-scan\.html"/)
  assert.match(html,/href="architecture\.html"/)
  assert.match(html,/href="roadmap\.html"/)
  assert.match(html,/href="developers\.html"/)
  assert.doesNotMatch(html,/href="#(?:ecosystem|architecture|research|roadmap|developers|about|home)"/)
})

test('dedicated technology, roadmap and developer tabs contain substantive content',async()=>{
  for(const slug of ['architecture','roadmap','developers']){
    const page=await read(slug+'.html')
    assert.ok(page.length>3000,slug+' topic page has insufficient depth')
    assert.match(page,/class="topic-hero"/)
    assert.match(page,/class="topic-card"/)
    assert.match(page,/href="projects\/index\.html"/)
  }
})
