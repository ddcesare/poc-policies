import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import { connect } from 'react-redux'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const mapStateToProps = state => {
  return {
    policies: state.chain.policies,
    error: state.chain.error,
    loading: state.chain.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    boundActionCreators: bindActionCreators(actions, dispatch)
  }
}

const SortableItem = SortableElement(({value}) =>
  <li className="list-group-item">
    <div className="">
      <h5 className="">{value.name}</h5>
      <a href="#"><i className="fas fa-edit"></i></a>
    </div>
    <p className="">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>version shit.</small>
  </li>
)

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="list-group">
      {items.map((policy, index) => (
        <SortableItem key={`item-${index}`} index={index} value={policy} />
      ))}
    </ul>
  )
})

const AddPolicyButton = ({showPolicyRegistry}) => {
  return (
    <button onClick={showPolicyRegistry}><i className="fas fa-plus-square"> Add Policy</i></button>
  )
}

function PolicyList({policies}) {
  const onSortEnd = ({oldIndex, newIndex}) => {
    actions.sortPolicyChain(arrayMove(policies, oldIndex, newIndex))
  }
    return (
      <div>
        <AddPolicyButton showPolicyRegistry={actions.showPolicyRegistry} />
        <SortableList items={policies} onSortEnd={onSortEnd} />
      </div>

    )
}

const PolicyChain = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyList)

export default PolicyChain
