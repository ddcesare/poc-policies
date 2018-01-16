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

const DragHandle = SortableHandle(() => <div className="Policy-sortHandle"><i className="fas fa-sort" /></div>);

const SortableItem = SortableElement(({value, editPolicyConfig}) => {
  const edit = () => editPolicyConfig(value)
  return (
    <li className="Policy">
      <article onClick={edit} className="Policy-summary">
        <h3 title="Configure Policy" className="Policy-name">{value.name}</h3>
        <p>
          <span className="Policy-version">{value.version}</span>
          {' - '}
          <span className="Policy-description">{value.description}</span>
        </p>
      </article>
      <DragHandle/>
    </li>
  )
})

const SortableList = SortableContainer(({items, visible, editPolicyConfig}) => {
  return (
    <ul className={(visible ? 'list-group' : 'is-hidden list-group')}>
      {items.map((policy, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={policy}
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
    <div className="PolicyChain-addPolicy" onClick={openPolicyRegistry}><i className="fas fa-plus-square" /> Add Policy</div>
  )
}

const CloseRegistryButton = ({closePolicyRegistry}) => {
  return (
    <div className="PolicyChain-addPolicy--cancel" onClick={closePolicyRegistry}><i className="fas fa-times-circle"/> Cancel</div>
  )
}


const PolicyRegistryItem = ({value, addPolicy}) => {
  const addToChain = () => addPolicy(value)
  return (
    <li className="Policy">
      <article onClick={addToChain} className="Policy-summary">
        <h3 title="Add Policy" className="Policy-name Policy-name--add">{value.name}</h3>
        <p>
          <span className="Policy-version">{value.version}</span>
          {' - '}
          <span className="Policy-description">{value.description}</span>
        </p>
      </article>
    </li>
  )
}


const PolicyRegistryList = ({items, visible, addPolicy, closePolicyRegistry}) => {
  return (
    <section className={(visible ? 'PolicyRegistryList' : 'PolicyRegistryList is-hidden')}>
      <header className="PolicyRegistryList-header">
        <h2>Select a Policy</h2>
        <CloseRegistryButton closePolicyRegistry={closePolicyRegistry} />
      </header>
      <ul className="list-group">
        {items.map((policy, index) => (
          <PolicyRegistryItem key={`item-${index}`} index={index} value={policy} addPolicy={addPolicy} />
        ))}
      </ul>
    </section>
  )
}

const PolicyList = ({registry, chain, policyConfig, boundActionCreators}) => {
  const onSortEnd = ({oldIndex, newIndex}) => {
    boundActionCreators.sortPolicyChain(arrayMove(chain.policies, oldIndex, newIndex))
  }
    return (
      <div className="PoliciesWidget">
        <section className="PolicyChain">
          <header className="PolicyChain-header">
            <h2>Policy Chain</h2>
            <AddPolicyButton openPolicyRegistry={boundActionCreators.openPolicyRegistry} />
          </header>
          <SortableList
            items={chain.policies}
            visible={chain.visible}
            onSortEnd={onSortEnd}
            useDragHandle={true}
            editPolicyConfig={boundActionCreators.editPolicyConfig}
          />
        </section>
        <PolicyRegistryList
          items={registry.policies}
          visible={registry.visible}
          addPolicy={boundActionCreators.addPolicy}
          closePolicyRegistry={boundActionCreators.closePolicyRegistry}
        />
        <PolicyConfig visible={policyConfig.visible} policy={policyConfig.policy} actions={boundActionCreators} />
      </div>

    )
}

const PolicyChain = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyList)

export default PolicyChain
