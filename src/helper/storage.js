/** @format
 * Document storage management for multi-file support.
 * All data is persisted in localStorage under keys: arya_documents, arya_doc_{id}, arya_active_doc.
 */

const KEY_DOCUMENTS = 'arya_documents'
const KEY_ACTIVE_DOC = 'arya_active_doc'
const LEGACY_KEY = 'vditorvditor'
const CONTENT_PREFIX = 'arya_doc_'

/**
 * Generate a unique document id.
 * @returns {string}
 */
export function generateId() {
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Get all document meta list, sorted by updatedAt descending.
 * @returns {Array<{ id: string, title: string, createdAt: number, updatedAt: number }>}
 */
export function getDocuments() {
  try {
    const raw = localStorage.getItem(KEY_DOCUMENTS)
    const list = raw ? JSON.parse(raw) : []
    return list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
  } catch {
    return []
  }
}

/**
 * Persist document list to localStorage.
 * @param {Array} list
 */
function setDocuments(list) {
  localStorage.setItem(KEY_DOCUMENTS, JSON.stringify(list))
}

/**
 * Get current active document id.
 * @returns {string|null}
 */
export function getActiveDocId() {
  return localStorage.getItem(KEY_ACTIVE_DOC)
}

/**
 * Set current active document id.
 * @param {string} id
 */
export function setActiveDocId(id) {
  if (id) {
    localStorage.setItem(KEY_ACTIVE_DOC, id)
  } else {
    localStorage.removeItem(KEY_ACTIVE_DOC)
  }
}

/**
 * Get markdown content for a document.
 * @param {string} id
 * @returns {string}
 */
export function getDocContent(id) {
  if (!id) return ''
  try {
    return localStorage.getItem(CONTENT_PREFIX + id) || ''
  } catch {
    return ''
  }
}

/**
 * Save document content and update document's updatedAt.
 * @param {string} id
 * @param {string} content
 */
export function saveDocContent(id, content) {
  if (!id) return
  const key = CONTENT_PREFIX + id
  localStorage.setItem(key, content == null ? '' : String(content))
  const list = getDocuments()
  const doc = list.find((d) => d.id === id)
  if (doc) {
    doc.updatedAt = Date.now()
    setDocuments(list)
  }
}

/**
 * Create a new document.
 * @param {string} [title='未命名文档']
 * @returns {{ id: string, title: string, createdAt: number, updatedAt: number }}
 */
export function createDocument(title = '未命名文档') {
  const now = Date.now()
  const doc = {
    id: generateId(),
    title: String(title || '未命名文档').trim() || '未命名文档',
    createdAt: now,
    updatedAt: now,
  }
  const list = getDocuments()
  list.unshift(doc)
  setDocuments(list)
  localStorage.setItem(CONTENT_PREFIX + doc.id, '')
  return doc
}

/**
 * Rename a document.
 * @param {string} id
 * @param {string} newTitle
 * @returns {boolean}
 */
export function renameDocument(id, newTitle) {
  const list = getDocuments()
  const doc = list.find((d) => d.id === id)
  if (!doc) return false
  doc.title = String(newTitle || '').trim() || '未命名文档'
  doc.updatedAt = Date.now()
  setDocuments(list)
  return true
}

/**
 * Delete a document and its content.
 * @param {string} id
 */
export function deleteDocument(id) {
  if (!id) return
  const list = getDocuments().filter((d) => d.id !== id)
  setDocuments(list)
  localStorage.removeItem(CONTENT_PREFIX + id)
  const active = getActiveDocId()
  if (active === id) {
    const next = list[0]
    setActiveDocId(next ? next.id : null)
  }
}

/**
 * Migrate legacy single-document data (vditorvditor) into the new multi-doc structure.
 * Call once on app init. Idempotent: only migrates if arya_documents is empty and legacy key exists.
 * @param {string} defaultContent - Default markdown when creating first doc from empty legacy
 */
export function migrateFromLegacy(defaultContent = '') {
  const list = getDocuments()
  if (list.length > 0) return

  const legacyContent = localStorage.getItem(LEGACY_KEY)
  const content = legacyContent != null ? legacyContent : defaultContent
  const doc = createDocument('未命名文档')
  saveDocContent(doc.id, content)
  setActiveDocId(doc.id)
  localStorage.removeItem(LEGACY_KEY)
}
