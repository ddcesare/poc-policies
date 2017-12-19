import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import { connect } from 'react-redux'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const mapStateToProps = state => {
  return {
    registry: state.policies.registry,
    chain: state.policies.chain
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

const CloseRegistryButton = ({hidePolicyRegistry}) => {
  return (
    <button onClick={hidePolicyRegistry}><i className="fas fa-times-circle"> Close</i></button>
  )
}


const PolicyRegistryItem = ({value, addPolicyToChain}) => {
  const addToChain = () => addPolicyToChain(value)
  return (
    <li className="list-group-item">
      <div className="">
        <h5 className="">{value.name}</h5>
        <a href="#" onClick={addToChain}><i className="fas fa-plus-square"></i></a>
      </div>
      <p className="">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
      <small>version shit.</small>
    </li>
  )
}


const PolicyRegistryList = ({items, visible, addPolicyToChain, hidePolicyRegistry}) => {
  return (
    <div className={(visible ? '' : 'hidden')}>
      <CloseRegistryButton hidePolicyRegistry={hidePolicyRegistry} />
      <ul>
        {items.map((policy, index) => (
          <PolicyRegistryItem key={`item-${index}`} index={index} value={policy} addPolicyToChain={addPolicyToChain} />
        ))}
      </ul>
    </div>
  )
}

const PolicyList = ({registry, chain, boundActionCreators}) => {
  const onSortEnd = ({oldIndex, newIndex}) => {
    boundActionCreators.sortPolicyChain(arrayMove(chain.policies, oldIndex, newIndex))
  }
    return (
      <div>
        <AddPolicyButton showPolicyRegistry={boundActionCreators.showPolicyRegistry} />
        <SortableList items={chain.policies} onSortEnd={onSortEnd} />
        <PolicyRegistryList
          items={registry.policies}
          visible={registry.visible}
          addPolicyToChain={boundActionCreators.addPolicyToChain}
          hidePolicyRegistry={boundActionCreators.hidePolicyRegistry}
        />
      </div>

    )
}

const PolicyChain = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyList)

export default PolicyChain
