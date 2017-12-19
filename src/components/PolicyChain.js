import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import { connect } from 'react-redux'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc'

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

const DragHandle = SortableHandle(() => <span><i className="fas fa-bars"></i></span>);

const SortableItem = SortableElement(({value, removePolicyFromChain}) => {
  const remove = () => removePolicyFromChain(value)
  return (
    <li className="list-group-item">
      <div className="">
        <DragHandle/>
        <h5 className="">{value.name}</h5>
        <button><i className="fas fa-edit"></i></button>
        <button onClick={remove}><i className="fas fa-times"></i></button>
      </div>
      <small>version shit.</small>
    </li>
  )
})

const SortableList = SortableContainer(({items, removePolicyFromChain}) => {
  return (
    <ul className="list-group">
      {items.map((policy, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={policy}
          removePolicyFromChain={removePolicyFromChain}
        />
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
        <button onClick={addToChain}><i className="fas fa-plus-square"></i></button>
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
        <SortableList
          items={chain.policies}
          onSortEnd={onSortEnd}
          useDragHandle={true}
          removePolicyFromChain={boundActionCreators.removePolicyFromChain}
        />
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
