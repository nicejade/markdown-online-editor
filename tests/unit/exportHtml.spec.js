/** @format */

import { buildStandaloneHtml, escapeHtml, serializePreview } from '@helper/exportHtml'

describe('exportHtml', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.documentElement.removeAttribute('data-scheme')
  })

  it('escapes HTML in titles', () => {
    expect(escapeHtml('A <B> & "C"')).toBe('A &lt;B&gt; &amp; &quot;C&quot;')
  })

  it('builds a standalone document from the preview node', () => {
    document.body.innerHTML =
      '<div class="vditor-reset"><h1>Hello</h1><p>World &amp; friends</p></div>'

    const html = buildStandaloneHtml(document.querySelector('.vditor-reset'), 'My Doc')

    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<title>My Doc</title>')
    expect(html).toContain('<h1>Hello</h1>')
    expect(html).toContain('World &amp; friends')
    expect(html).toContain('article class="vditor-reset"')
    expect(html).toContain('charset="UTF-8"')
  })

  it('strips editor chrome and keeps article content', () => {
    document.body.innerHTML = `
      <div class="vditor-reset">
        <span class="vditor-copy">copy</span>
        <p>Keep me</p>
      </div>
    `

    const html = serializePreview(document.querySelector('.vditor-reset'))

    expect(html).toContain('Keep me')
    expect(html).not.toContain('vditor-copy')
    expect(html).not.toContain('copy')
  })

  it('replaces processed chart wrappers with images', () => {
    const root = document.createElement('div')
    root.className = 'vditor-reset'
    const wrapper = document.createElement('div')
    wrapper.setAttribute('data-processed', 'true')
    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    canvas.toDataURL = () => 'data:image/png;base64,AAA'
    wrapper.appendChild(canvas)
    root.appendChild(wrapper)
    document.body.appendChild(root)

    const html = serializePreview(root)
    expect(html).toContain('<img')
    expect(html).toContain('data:image/png;base64,AAA')
    expect(html).not.toContain('<canvas')
    expect(html).not.toContain('data-processed')
  })

  it('escapes a hostile document title in the generated markup', () => {
    document.body.innerHTML = '<div class="vditor-reset"><p>ok</p></div>'

    const html = buildStandaloneHtml(
      document.querySelector('.vditor-reset'),
      '</title><script>alert(1)</script>'
    )

    expect(html).toContain('<title>&lt;/title&gt;&lt;script&gt;alert(1)&lt;/script&gt;</title>')
    expect(html).not.toContain('</title><script>alert(1)</script>')
  })
})
