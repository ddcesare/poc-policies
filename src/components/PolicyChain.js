import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import PolicyConfig from './PolicyConfig'
import { connect } from 'react-redux'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc'

const mapStateToProps = state => {
  return {
    registry: state.registry,
    chain: state.chain,
    policyConfig: state.policyConfig
  }
}

const mapDispatchToProps = dispatch => {
  return {
    boundActionCreators: bindActionCreators(actions, dispatch)
  }
}

const DragHandle = SortableHandle(() => <span><i className="fas fa-bars"></i></span>);

const SortableItem = SortableElement(({value, removePolicyFromChain, editPolicyConfig}) => {
  const remove = () => removePolicyFromChain(value)
  const edit = () => editPolicyConfig(value)
  return (
    <li className="list-group-item">
      <div className="">
        <DragHandle/>
        <h5 className="">{value.name}</h5>
        <EditPolicyButton editPolicyConfig={edit} />
        <button onClick={remove}><i className="fas fa-times"></i></button>
      </div>
      <small>version shit.</small>
    </li>
  )
})

const SortableList = SortableContainer(({items, visible, removePolicyFromChain, editPolicyConfig}) => {

  return (
    <ul className={(visible ? 'list-group' : 'hidden list-group')}>
      {items.map((policy, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={policy}
          removePolicyFromChain={removePolicyFromChain}
          editPolicyConfig={editPolicyConfig}
        />
      ))}
    </ul>
  )
})

const EditPolicyButton = ({editPolicyConfig}) => {
  return (
    <button onClick={editPolicyConfig}><i className="fas fa-edit"></i></button>
  )
}

const AddPolicyButton = ({openPolicyRegistry}) => {
  return (
    <button onClick={openPolicyRegistry}><i className="fas fa-plus-square"> Add Policy</i></button>
  )
}

const CloseRegistryButton = ({hidePolicyRegistry}) => {
  return (
    <button onClick={hidePolicyRegistry}><i className="fas fa-times-circle"> Close</i></button>
  )
}


const PolicyRegistryItem = ({value, addPolicy}) => {
  const addToChain = () => addPolicy(value)
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


const PolicyRegistryList = ({items, visible, addPolicy, hidePolicyRegistry}) => {
  return (
    <div className={(visible ? '' : 'hidden')}>
      <CloseRegistryButton hidePolicyRegistry={hidePolicyRegistry} />
      <ul>
        {items.map((policy, index) => (
          <PolicyRegistryItem key={`item-${index}`} index={index} value={policy} addPolicy={addPolicy} />
        ))}
      </ul>
    </div>
  )
}

const PolicyList = ({registry, chain, policyConfig, boundActionCreators}) => {
  const onSortEnd = ({oldIndex, newIndex}) => {
    boundActionCreators.sortPolicyChain(arrayMove(chain.policies, oldIndex, newIndex))
  }
    return (
      <div>
        <PolicyConfig visible={policyConfig.visible} policy={policyConfig.policy} actions={boundActionCreators} />
        <AddPolicyButton openPolicyRegistry={boundActionCreators.openPolicyRegistry} />
        <SortableList
          items={chain.policies}
          visible={chain.visible}
          onSortEnd={onSortEnd}
          useDragHandle={true}
          removePolicyFromChain={boundActionCreators.removePolicyFromChain}
          editPolicyConfig={boundActionCreators.editPolicyConfig}
        />
        <PolicyRegistryList
          items={registry.policies}
          visible={registry.visible}
          addPolicy={boundActionCreators.addPolicy}
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
