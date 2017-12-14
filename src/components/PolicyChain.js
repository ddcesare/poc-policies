import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import { connect } from 'react-redux'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

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
  <li className="list-group-item">{value}</li>
)

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="list-group">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  )
})

function PolicyList({chain, boundActionCreators}) {
  const onSortEnd = ({oldIndex, newIndex}) => {
    boundActionCreators.sortChain(arrayMove(chain, oldIndex, newIndex))
  }
    return <SortableList items={chain} onSortEnd={onSortEnd} />
}

const PolicyChain = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyList)

export default PolicyChain
