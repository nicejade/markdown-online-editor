/** @format */

import { shouldPersistDocContent } from '@helper/storage'

describe('shouldPersistDocContent', () => {
  it('does not persist while the editor is still initializing', () => {
    expect(shouldPersistDocContent('# hello', '# hello', false)).toBe(false)
    expect(shouldPersistDocContent('', '# hello', false)).toBe(false)
  })

  it('does not overwrite stored markdown with an empty editor value', () => {
    expect(shouldPersistDocContent('', '# kept content', true)).toBe(false)
    expect(shouldPersistDocContent(null, '已有文档', true)).toBe(false)
    expect(shouldPersistDocContent('\n', '# kept content', true)).toBe(false)
    expect(shouldPersistDocContent('   \n\n  ', '已有文档', true)).toBe(false)
  })

  it('persists real edits after the editor is ready', () => {
    expect(shouldPersistDocContent('# hello', '# hello', true)).toBe(true)
    expect(shouldPersistDocContent('# edited', '# hello', true)).toBe(true)
    expect(shouldPersistDocContent('', '', true)).toBe(true)
  })
})
