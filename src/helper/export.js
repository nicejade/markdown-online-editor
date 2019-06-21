/** @format */

import html2canvas from 'html2canvas'
import canvg from 'canvg'

let TARGET_WIDTH = 960
let TARGET_HEIGHT = 800

const MARGIN_WIDTH = 50
const MARGIN_HEIGHT = 80
const RADIUS = 6

const SHADOW_X = 0
const SHADOW_Y = 40
const SHADOW_BLUR = 50
const SHADOW_COLOR = 'rgba(0, 0, 0, 0.21)'

function drawRoundedRec(origCanvas, scale) {
  const roundCanvas = document.createElement('canvas')
  roundCanvas.width = TARGET_WIDTH * scale
  roundCanvas.height = TARGET_HEIGHT * scale

  const roundCtx = roundCanvas.getContext('2d')
  const roundRadius = RADIUS * scale
  const x1 = roundRadius
  const y1 = 0
  const x2 = x1 + roundCanvas.width - 2 * roundRadius
  const y2 = y1
  const x3 = x2 + roundRadius
  const y3 = roundRadius
  const x4 = x3
  const y4 = y3 + roundCanvas.height - 2 * roundRadius
  const x5 = x2
  const y5 = y4 + roundRadius
  const x6 = x1
  const y6 = y5
  const x7 = x6 - roundRadius
  const y7 = y4
  const x8 = x7
  const y8 = y3
  roundCtx.beginPath()
  roundCtx.moveTo(x1, y1)
  roundCtx.lineTo(x2, y2)
  roundCtx.quadraticCurveTo(x3, y2, x3, y3)
  roundCtx.lineTo(x4, y4)
  roundCtx.quadraticCurveTo(x4, y5, x5, y5)
  roundCtx.lineTo(x6, y6)
  roundCtx.quadraticCurveTo(x7, y6, x7, y7)
  roundCtx.lineTo(x8, y8)
  roundCtx.quadraticCurveTo(x8, y1, x1, y1)
  roundCtx.clip()
  roundCtx.drawImage(origCanvas, 0, 0)
  return roundCanvas
}

function drawShadow(origCanvas) {
  const bgdCanvas = document.createElement('canvas')
  bgdCanvas.width = origCanvas.width + MARGIN_WIDTH
  bgdCanvas.height = origCanvas.height + MARGIN_HEIGHT
  const ctx = bgdCanvas.getContext('2d')

  ctx.shadowOffsetX = SHADOW_X
  ctx.shadowOffsetY = SHADOW_Y
  ctx.shadowBlur = SHADOW_BLUR
  ctx.shadowColor = SHADOW_COLOR
  ctx.drawImage(origCanvas, MARGIN_WIDTH / 2, 0)
  return bgdCanvas
}

/**
 * @desc 兼容使用 html2canvas 库不能完整捕获 SVG 问题；
 * @param {Dom} targetElem - 所要导出目标 DOM
 */
const handleCaptureSvg = targetElem => {
  const nodesToRecover = []
  const nodesToRemove = []
  const svgElem = targetElem.querySelectorAll('svg')
  for (let key = 0, len = svgElem.length; key < len; key++) {
    const node = svgElem[key]
    const parentNode = node.parentNode
    const svg = parentNode.innerHTML
    const canvas = document.createElement('canvas')
    canvg(canvas, svg)
    nodesToRecover.push({
      parent: parentNode,
      child: node
    })
    parentNode.removeChild(node)

    nodesToRemove.push({
      parent: parentNode,
      child: canvas
    })
    parentNode.appendChild(canvas)
  }
}

export const generateScreenshot = async targetDom => {
  handleCaptureSvg(targetDom)
  const domStyleObj = getComputedStyle(targetDom)
  TARGET_WIDTH = +domStyleObj.width.replace(`px`, '')
  TARGET_HEIGHT = +domStyleObj.height.replace(`px`, '')

  const scale = window.devicePixelRatio
  const options = {
    scale,
    allowTaint: true,
    backgroundColor: '#fefefe'
  }
  const origCanvas = await html2canvas(targetDom, options)
  const roundCanvas = drawRoundedRec(origCanvas, scale)
  return drawShadow(roundCanvas)
}
