// Shared Silver Labs navigation across all static pages.
// The markup is present without JavaScript; only mobile toggling uses JS.
const toggle=document.querySelector('[data-site-menu]')
const nav=document.querySelector('[data-site-nav]')
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')==='true'
    toggle.setAttribute('aria-expanded',String(!open))
    nav.classList.toggle('is-open',!open)
  })
  nav.addEventListener('click',event=>{
    if(event.target instanceof HTMLAnchorElement){
      toggle.setAttribute('aria-expanded','false')
      nav.classList.remove('is-open')
    }
  })
  window.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&nav.classList.contains('is-open')){
      toggle.setAttribute('aria-expanded','false')
      nav.classList.remove('is-open')
      toggle.focus()
    }
  })
}
