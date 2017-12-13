import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import { connect } from 'react-redux'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const log = (type) => console.log.bind(console, type);

const mapStateToProps = state => {
  return {
    chain: state.chain
  }
}

const mapDispatchToProps = dispatch => {
  return {
    boundActionCreators: bindActionCreators(actions, dispatch)
  }
}

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
)

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  )
})

function SortableComponent({chain}) {
  const state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  const onSortEnd = ({oldIndex, newIndex}) => {
    log({
      items: arrayMove(state.items, oldIndex, newIndex),
    })
  }
    return <SortableList items={state.items} onSortEnd={onSortEnd} />
}

const PolicyList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortableComponent)

export default PolicyList
