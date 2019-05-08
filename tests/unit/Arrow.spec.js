/** @format */

import { shallowMount } from '@vue/test-utils'
import Arrow from '@/components/icons/Arrow.vue'

describe('Arrow.vue', () => {
  // ------------------------Test [props.direction]------------------------Start
  it('renders props.direction when passed', () => {
    const parpDirection = 'right'
    const wrapper = shallowMount(Arrow, {
      propsData: { direction: parpDirection }
    })
    expect(wrapper.classes()).toContain(parpDirection)
  })

  it('renders props.direction when NOT passed', () => {
    // direction default Value is [left]
    const parpDirection = '~~left'
    const defaultDirection = 'left'
    const wrapper = shallowMount(Arrow, {
      propsData: { direction: parpDirection }
    })
    expect(wrapper.classes()).toContain(defaultDirection)
    /* const compClassListStr = wrapper
      .find('.arrow-component')
      .element.classList.toString()
    expect(compClassListStr).toBe(`arrow-component left`) */
  })

  // ------------------------Test [props.color]------------------------Start
  it('renders props.color when passed', () => {
    // color default Vaule is [#479537]
    const propColor = '#666666'
    const wrapper = shallowMount(Arrow, {
      propsData: { color: propColor }
    })
    const compBorderColor = wrapper.find('.arrow-component').element.style
      .borderColor
    expect(compBorderColor).toBe(propColor)
  })

  it('renders props.color when Not passed', () => {
    // color default Vaule is [#479537]
    const propColor = '#666 666#'
    const defaultColor = '#479537'
    const wrapper = shallowMount(Arrow, {
      propsData: { color: propColor }
    })
    const compBorderColor = wrapper.find('.arrow-component').element.style
      .borderColor
    expect(compBorderColor).toBe(defaultColor)
  })
})
